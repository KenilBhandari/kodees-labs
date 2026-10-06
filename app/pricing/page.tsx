"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageHero, SectionHead, FinalCta } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Starter",
    monthly: 499,
    blurb: "One site, tight control.",
    cta: "Start with Starter",
    features: ["1 active site", "Daily muster + wages", "Project budget vs actual", "Email support"],
  },
  {
    name: "Pro",
    monthly: 1499,
    blurb: "Up to 7 sites. Most teams land here.",
    cta: "Start with Pro",
    popular: true,
    features: [
      "Up to 7 active sites",
      "Everything in Starter",
      "Client payments + pending tracking",
      "Material low-stock alerts",
      "Margin estimates",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    monthly: -1,
    blurb: "Many sites, custom needs.",
    cta: "Talk to us",
    features: [
      "Unlimited sites",
      "Everything in Pro",
      "Roles + multi-office setup",
      "Onboarding + training",
      "GST invoice + SLA",
    ],
  },
];

const ROWS: Array<[string, string, string, string]> = [
  ["Active sites", "1", "Up to 7", "Unlimited"],
  ["Daily muster + wages", "Yes", "Yes", "Yes"],
  ["Budget vs actual", "Yes", "Yes", "Yes"],
  ["Client payments", "—", "Yes", "Yes"],
  ["Low-stock alerts", "—", "Yes", "Yes"],
  ["Margin estimates", "—", "Yes", "Yes"],
  ["Onboarding help", "—", "Priority", "Dedicated"],
];

export default function PricingPage() {
  const [yearly, setYearly] = useState(true);

  const price = (m: number) => {
    if (m < 0) return "Custom";
    if (!yearly) return `₹${m.toLocaleString("en-IN")}`;
    return `₹${Math.round((m * 10) / 12).toLocaleString("en-IN")}`;
  };

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={<>Plans you can compare in thirty seconds.</>}
        sub="Per-site pricing in rupees with GST invoice. Start small, upgrade when you add sites."
        primaryHref="/contact?plan=pro"
        primaryLabel="Get started"
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <SectionHead eyebrow="Plans" title="Pick your size" sub="Yearly billing saves two months. Switch or cancel anytime." />
          <div className="flex items-center rounded-full border border-border bg-surface p-1 text-sm font-medium">
            {(["Monthly", "Yearly"] as const).map((t) => {
              const active = (t === "Yearly") === yearly;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setYearly(t === "Yearly")}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full px-4 py-1.5 transition-colors",
                    active ? "bg-primary text-white" : "text-text-muted hover:text-text"
                  )}
                >
                  {t}
                  {t === "Yearly" && <span className="ml-1 text-xs opacity-80">−17%</span>}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-3 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 90}>
              <Card
                className={cn(
                  "card-hover relative flex h-full flex-col p-6 sm:p-8",
                  p.popular && "border-primary shadow-[0_18px_50px_-24px_rgba(234,88,12,0.5)]"
                )}
              >
                {p.popular && (
                  <Badge tone="primary" className="absolute -top-3 left-6">
                    Most popular
                  </Badge>
                )}
                <h3 className="text-lg font-semibold text-text">{p.name}</h3>
                <p className="mt-1 text-sm text-text-muted">{p.blurb}</p>
                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold tracking-tight text-text tnum">
                    {price(p.monthly)}
                  </span>
                  {p.monthly > 0 && (
                    <span className="text-sm text-text-muted">/ site / mo{yearly ? ", billed yearly" : ""}</span>
                  )}
                </p>
                <ul className="mt-6 flex flex-col gap-2.5 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-text">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/contact?plan=${p.name.toLowerCase()}`}
                  className={cn(
                    "mt-6 inline-flex items-center justify-center gap-1.5 rounded-md px-5 py-3 text-[15px] font-medium transition-colors",
                    p.popular
                      ? "bg-primary text-white hover:bg-primary-hover"
                      : "border border-border text-text hover:border-primary hover:text-primary"
                  )}
                >
                  {p.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <h3 className="text-lg font-semibold text-text">Compare everything</h3>
          <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-surface">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-text-muted">
                  <th className="px-4 py-3 font-medium">Feature</th>
                  <th className="px-4 py-3 font-medium">Starter</th>
                  <th className="px-4 py-3 font-medium">Pro</th>
                  <th className="px-4 py-3 font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r[0]} className="border-b border-border last:border-0">
                    {r.map((c, j) => (
                      <td key={j} className={cn("px-4 py-3", j === 0 ? "font-medium text-text" : "text-text-muted tnum")}>
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      <FinalCta title="Not sure which plan fits?" sub="Tell us your site count on the contact page. We'll tell you straight, even if the answer is Starter." />
    </>
  );
}
