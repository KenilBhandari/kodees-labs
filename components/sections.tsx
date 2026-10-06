import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";

export function PageHero({
  eyebrow,
  title,
  sub,
  primaryHref = "/contact",
  primaryLabel = "Get started",
  secondaryHref,
  secondaryLabel,
}: {
  eyebrow: string;
  title: ReactNode;
  sub: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="hero-flat border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16">
        <Reveal>
          <Badge tone="primary">{eyebrow}</Badge>
          <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-text sm:text-5xl sm:leading-[1.08]">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-text-muted sm:text-base">
            {sub}
          </p>
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <Link
              href={primaryHref}
              className="btn-nudge press inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-primary-hover"
            >
              {primaryLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            {secondaryHref && (
              <Link
                href={secondaryHref}
                className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-5 py-3 text-[15px] font-medium text-text transition-colors hover:border-primary hover:text-primary"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <Reveal className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
        {title}
      </h2>
      {sub && <p className="mt-2 text-[15px] leading-7 text-text-muted">{sub}</p>}
    </Reveal>
  );
}

export function FinalCta({
  title = "Run your sites from one calm dashboard.",
  sub = "Tell us about your sites and we'll set up Orange ERP for your team.",
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
      <Reveal>
        <div className="rounded-2xl border border-border bg-surface px-6 py-10 sm:px-12 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Get started</p>
          <h2 className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-7 text-text-muted">{sub}</p>
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <Link
              href="/contact"
              className="btn-nudge press inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-5 py-3 text-[15px] font-medium text-white hover:bg-primary-hover"
            >
              Get started <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-md border border-border px-5 py-3 text-[15px] font-medium text-text hover:border-primary hover:text-primary"
            >
              Compare plans
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
