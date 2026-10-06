"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Phone, Clock, CheckCircle2, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/sections";
import { Reveal } from "@/components/reveal";

function ContactForm() {
  const params = useSearchParams();
  const plan = params.get("plan");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", company: "", sites: "", message: plan ? `Interested in the ${plan} plan. ` : "" });
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim() || !form.message.trim()) {
      setError("Please fill your name, phone/email and a short message.");
      return;
    }
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          plan: plan ?? undefined,
          website: new FormData(e.currentTarget as HTMLFormElement).get("website") ?? "",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "We could not send that just now. Try again?");
        return;
      }
      setSent(true);
    } catch {
      setError("We could not send that just now. Check your connection and try again?");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <Card className="p-6 text-center sm:p-10">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" aria-hidden="true" />
        <h2 className="mt-4 text-xl font-semibold text-text">Message received, {form.name.split(" ")[0]}.</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-text-muted">
          Thanks for writing about {form.company || "your sites"}. We reply within one
          working day at <span className="font-medium text-text">hello@orange-erp.in</span>.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-5 text-sm font-medium text-primary hover:underline"
        >
          Send another message
        </button>
      </Card>
    );
  }

  return (
    <Card className="p-5 sm:p-8">
      {plan && (
        <p className="mb-4 rounded-md bg-background px-3 py-2 text-sm text-text-muted">
          Plan selected: <span className="font-semibold capitalize text-text">{plan}</span>. Mention your site count below.
        </p>
      )}
      <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-text">Your name *</span>
            <input value={form.name} onChange={set("name")} placeholder="e.g. Kenil Patel" className="rounded-md border border-border bg-background px-3 py-2.5 text-text placeholder:text-text-muted focus:border-primary focus:outline-none" />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-text">Phone or email *</span>
            <input value={form.contact} onChange={set("contact")} placeholder="+91 … or you@company.in" className="rounded-md border border-border bg-background px-3 py-2.5 text-text placeholder:text-text-muted focus:border-primary focus:outline-none" />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-text">Company / firm</span>
            <input value={form.company} onChange={set("company")} placeholder="e.g. Patel Construction" className="rounded-md border border-border bg-background px-3 py-2.5 text-text placeholder:text-text-muted focus:border-primary focus:outline-none" />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-text">Active sites</span>
            <select value={form.sites} onChange={set("sites")} className="rounded-md border border-border bg-background px-3 py-2.5 text-text focus:border-primary focus:outline-none">
              <option value="">Select…</option>
              <option>1 site</option>
              <option>2–4 sites</option>
              <option>5–10 sites</option>
              <option>10+ sites</option>
            </select>
          </label>
        </div>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-text">How can we help? *</span>
          <textarea value={form.message} onChange={set("message")} rows={5} placeholder="Tell us about your sites, workers, and what hurts most today…" className="resize-y rounded-md border border-border bg-background px-3 py-2.5 text-text placeholder:text-text-muted focus:border-primary focus:outline-none" />
        </label>
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        {/* Honeypot: invisible to humans, catches bots. */}
        <input type="text" name="website" autoComplete="off" tabIndex={-1} aria-hidden="true" className="hidden" />
        <button type="submit" disabled={sending} className="btn-nudge press inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-60">
          {sending ? "Sending…" : "Send message"} <Send className="h-4 w-4" aria-hidden="true" />
        </button>
        <p className="text-xs leading-5 text-text-muted">Goes straight to our team. We reply within one working day, and your details stay with us.</p>
      </form>
    </Card>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Talk to a human about your sites.</>}
        sub="One working-day reply. Tell us your site count and we'll recommend the right plan honestly."
        primaryHref="mailto:hello@orange-erp.in"
        primaryLabel="Email us directly"
      />
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <Suspense fallback={<Card className="p-8 text-sm text-text-muted">Loading form…</Card>}>
              <ContactForm />
            </Suspense>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-2">
            <div className="flex flex-col gap-3">
              {[
                { icon: Mail, t: "Email", v: "hello@orange-erp.in", href: "mailto:hello@orange-erp.in" },
                { icon: Phone, t: "Phone", v: "+91 98765 43210 (Mon–Sat)", href: "tel:+919876543210" },
                { icon: Clock, t: "Response time", v: "Within one working day", href: undefined },
              ].map((c) => (
                <Card key={c.t} className="p-5">
                  <p className="flex items-center gap-2 text-sm font-semibold text-text">
                    <c.icon className="h-4 w-4 text-primary" aria-hidden="true" /> {c.t}
                  </p>
                  {c.href ? (
                    <a href={c.href} className="mt-1 block text-sm text-text-muted hover:text-primary">{c.v}</a>
                  ) : (
                    <p className="mt-1 text-sm text-text-muted">{c.v}</p>
                  )}
                </Card>
              ))}
              <Card className="p-5">
                <p className="text-sm font-semibold text-text">Prefer WhatsApp-style brevity?</p>
                <p className="mt-1 text-sm leading-6 text-text-muted">“Hi, we run 3 sites in Ahmedabad, ~40 workers. Need muster + payments.” That one line is enough to start.</p>
              </Card>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
