import { NextResponse } from "next/server";

type Enquiry = {
  name: string;
  contact: string;
  company?: string;
  sites?: string;
  message: string;
  plan?: string;
};

function pick(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "That request was unreadable. Try again." }, { status: 400 });
  }

  const b = (body ?? {}) as Record<string, unknown>;

  // Honeypot: bots fill it, humans never see it.
  if (typeof b.website === "string" && b.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const enquiry: Enquiry = {
    name: pick(b.name, 80),
    contact: pick(b.contact, 120),
    company: pick(b.company, 120) || undefined,
    sites: pick(b.sites, 40) || undefined,
    message: pick(b.message, 2000),
    plan: pick(b.plan, 20) || undefined,
  };

  if (!enquiry.name || !enquiry.contact || !enquiry.message) {
    return NextResponse.json(
      { error: "Please fill your name, phone/email and a short message." },
      { status: 400 }
    );
  }
  if (enquiry.contact.length < 5) {
    return NextResponse.json(
      { error: "That phone/email looks too short. Double-check it?" },
      { status: 400 }
    );
  }

  // Real inbox path: set RESEND_API_KEY + CONTACT_TO_EMAIL and every
  // enquiry lands in your inbox. Without them it logs server-side.
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Orange ERP <hello@orange-erp.in>";

  if (resendKey && to) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: `New enquiry: ${enquiry.name}${enquiry.company ? ` (${enquiry.company})` : ""}`,
        text: [
          `Name: ${enquiry.name}`,
          `Contact: ${enquiry.contact}`,
          enquiry.company ? `Company: ${enquiry.company}` : null,
          enquiry.sites ? `Sites: ${enquiry.sites}` : null,
          enquiry.plan ? `Plan: ${enquiry.plan}` : null,
          "",
          enquiry.message,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    });
    if (!res.ok) {
      console.error("[contact] inbox forward failed", await res.text());
      return NextResponse.json(
        { error: "We could not send that just now. Email hello@orange-erp.in directly?" },
        { status: 502 }
      );
    }
  } else {
    console.log("[contact enquiry]", enquiry);
  }

  return NextResponse.json({ ok: true });
}
