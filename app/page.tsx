import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  ClipboardCheck,
  Wallet,
  Boxes,
  Users,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProductPreview } from "@/components/product-preview";
import { Reveal } from "@/components/reveal";
import { FinalCta } from "@/components/sections";

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "Mark muster in seconds",
    text: "Site engineers tick present, half, or absent per site. No registers, no end-of-day phone calls.",
  },
  {
    icon: Wallet,
    title: "Track money honestly",
    text: "Contract value against recorded labour and material cost, plus what clients have paid and what's pending.",
  },
  {
    icon: Boxes,
    title: "Never run out mid-work",
    text: "Low-stock alerts for cement, steel, paint and more, flagged before the mason has to stop work.",
  },
];

const PROOF = [
  { value: "2 min", label: "to finish daily muster per site" },
  { value: "7 sites", label: "managed from one dashboard" },
  { value: "86%", label: "payments tracked in this workspace" },
  { value: "3 alerts", label: "low-stock items caught early" },
];

const FAQS = [
  {
    q: "Is this my data?",
    a: "No. This page shows a sample workspace so you can feel the product before signing up. Yours starts empty and fills with your own sites.",
  },
  {
    q: "Do my mistris need smartphones?",
    a: "No. Only the site engineer or munshi needs a phone. Workers are just names with daily rates in the muster.",
  },
  {
    q: "How do we get started?",
    a: "Send us your site list on the Contact page. We create your workspace, add your workers once, and your first muster takes two minutes.",
  },
  {
    q: "Does it work with low network on site?",
    a: "Yes. The muster screen is built to be light and forgiving. Save fast, sync when the network returns.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero-flat border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <Badge tone="primary">Built for construction teams</Badge>
              <h1 className="mt-4 text-4xl font-semibold leading-[1.06] tracking-tight text-text sm:text-[3.4rem]">
                Labour, projects and payments, finally in one place.
              </h1>
              <p className="mt-4 max-w-lg text-[15px] leading-7 text-text-muted sm:text-base">
                Paper muster registers and scattered spreadsheets, replaced
                with one calm dashboard. Your site engineers will actually
                open it every morning.
              </p>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <Link
                  href="/contact"
                  className="btn-nudge press inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-primary-hover"
                >
                  Get started <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-5 py-3 text-[15px] font-medium text-text transition-colors hover:border-primary hover:text-primary"
                >
                  View pricing
                </Link>
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-xs text-text-muted">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                Made for Indian site workflows · Ahmedabad · Gandhinagar · Sanand
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Live preview
                </span>
                <span>Sample workspace</span>
              </div>
              <div className="mt-3">
                <ProductPreview />
              </div>
            </Reveal>
          </div>
        </div>
        {/* marquee */}
        <div className="marquee overflow-hidden border-t border-border bg-surface py-3">
          <div className="marquee-track flex w-max gap-8 whitespace-nowrap px-4 text-[13px] font-medium text-text-muted">
            {[0, 1].map((k) => (
              <div key={k} className="flex gap-8" aria-hidden={k === 1}>
                {["Daily muster", "Project margins", "Client payments", "Low-stock alerts", "Site-wise labour", "Budget vs actual"].map(
                  (t) => (
                    <span key={t} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {t}
                    </span>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT STORY */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            01 · How it works
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            Muster in the morning. Money sorted by evening.
          </h2>
          <p className="mt-2 text-[15px] leading-7 text-text-muted">
            Three small habits. Repeated daily, they take the chaos out of
            running multiple sites.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <Card className="card-hover h-full p-5 sm:p-6">
                <div className="flex items-start justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-background text-primary">
                    <s.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-3xl font-semibold tracking-tight text-border tnum" aria-hidden="true">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-[17px] font-semibold text-text">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-text-muted">{s.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROOF */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <Reveal className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                02 · Proof
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
                What a tidy site office feels like.
              </h2>
            </div>
            <p className="max-w-sm text-[13px] leading-6 text-text-muted">
              Figures below come from the sample workspace above.
              They show the workflow, not a customer account.
            </p>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {PROOF.map((p, i) => (
              <Reveal key={p.label} delay={i * 80}>
                <Card className="p-4 sm:p-5">
                  <p className="text-2xl font-semibold tracking-tight text-text sm:text-3xl tnum">
                    {p.value}
                  </p>
                  <p className="mt-1 text-[13px] leading-5 text-text-muted">{p.label}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <Reveal delay={100}>
              <Card className="h-full p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-sm font-semibold text-text">
                    PK
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-text">Site engineer</p>
                    <p className="text-xs text-text-muted">Residential sites · Ahmedabad</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-text-muted">
                  “Muster used to eat 30 minutes and a phone call. Now I tick
                  names while tea arrives and the office sees it instantly.”
                </p>
              </Card>
            </Reveal>
            <Reveal delay={180}>
              <Card className="h-full p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-sm font-semibold text-text">
                    <Users className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-text">Contractor office</p>
                    <p className="text-xs text-text-muted">3–7 concurrent sites</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-text-muted">
                  “Pending payments stopped being a surprise. Received vs pending
                  is one glance every Friday. That alone pays for the tool.”
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">03 · FAQ</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
              Honest answers.
            </h2>
            <p className="mt-2 text-[15px] leading-7 text-text-muted">
              Still unsure? <Link href="/contact" className="font-medium text-primary hover:underline">Ask us directly</Link>. A human replies.
            </p>
          </Reveal>
          <div className="lg:col-span-3">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="group border-b border-border py-4 first:border-t">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[15px] font-medium text-text transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown className="h-4 w-4 shrink-0 text-text-muted transition-transform duration-300 ease-out group-open:rotate-180 group-open:text-primary" aria-hidden="true" />
                  </summary>
                  <p className="mt-2 text-sm leading-6 text-text-muted">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
