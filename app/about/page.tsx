import { Metadata } from "next";
import { HardHat, BookOpenCheck, HeartHandshake } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHero, SectionHead, FinalCta } from "@/components/sections";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "About" };

const VALUES = [
  { icon: BookOpenCheck, title: "Paper first, software second", text: "We studied muster registers and payment diaries before writing code. If the site engineer can't learn it in one morning, we cut it." },
  { icon: HardHat, title: "Built on site, not in office", text: "Attendance, dust, low network, mixed literacy. The constraints of real plots in Ahmedabad, Gandhinagar and Sanand shaped every screen." },
  { icon: HeartHandshake, title: "Your data stays yours", text: "One workspace per company. No ads, no data sale, no lock-in exports held hostage. Leave anytime with everything." },
];

const TIMELINE = [
  { year: "The problem", text: "A contractor friend showed us three registers, two diaries and a WhatsApp thread. All disagreeing about who worked Tuesday." },
  { year: "The prototype", text: "One muster screen, tested by a single munshi on a single plot. It saved 25 minutes on day one, so we kept going." },
  { year: "Orange ERP", text: "Muster, projects, payments and stock in one calm dashboard. Now opening to more construction teams." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>Made by people who have stood on your slab.</>}
        sub="Running construction sites on paper registers quietly costs lakhs. Lost wages, forgotten payments, stalled work."
        secondaryHref="/contact"
        secondaryLabel="Talk to us"
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionHead eyebrow="Why" title="Why this product exists" sub="Three beliefs we won't compromise on." />
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 90}>
              <Card className="card-hover h-full p-5 sm:p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-background text-primary">
                  <v.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-[17px] font-semibold text-text">{v.title}</h3>
                <p className="mt-2 text-sm leading-6 text-text-muted">{v.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionHead eyebrow="Story" title="How we got here" />
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 90}>
                <Card className="h-full p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">{t.year}</p>
                  <p className="mt-2 text-sm leading-6 text-text">{t.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <Card className="mt-3 p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex -space-x-2">
                  {["KL", "AR", "SP"].map((n) => (
                    <span key={n} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-surface bg-background text-xs font-semibold text-text">
                      {n}
                    </span>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">Kodees Labs · the team behind Orange ERP</p>
                  <p className="mt-0.5 text-sm leading-6 text-text-muted">
                    A small product team designing and shipping this site end to end. No fake faces or inflated headcounts. Just builders who answer support themselves.
                  </p>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      <FinalCta title="Come see if we're a fit." sub="One honest conversation about your sites. No pushy demo, no 40-slide deck." />
    </>
  );
}
