import {
  ClipboardCheck,
  FolderKanban,
  Wallet,
  Boxes,
  TrendingUp,
  ShieldCheck,
  Bell,
  Smartphone,
} from "lucide-react";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageHero, SectionHead, FinalCta } from "@/components/sections";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Features" };

const GRID = [
  { icon: ClipboardCheck, title: "Site-wise muster", text: "Present / Half / Absent per worker, per site, per day. Bulk actions for full teams." },
  { icon: FolderKanban, title: "Project overview", text: "Budget vs actual on every project with status, progress and spend in one row." },
  { icon: Wallet, title: "Client payments", text: "Received vs pending with per-client history, so follow-ups happen on time." },
  { icon: Boxes, title: "Material stock", text: "Minimum-level alerts for cement, steel, paint and anything you track." },
  { icon: TrendingUp, title: "Margin estimates", text: "Contract value minus recorded labour and material. Your live project margin, while you can still fix it." },
  { icon: Bell, title: "Daily summaries", text: "Who worked where, what it cost, and what's running low. Ready every evening." },
  { icon: ShieldCheck, title: "Roles & workspace", text: "Owners, engineers and office staff see exactly what they need. Data stays in your workspace." },
  { icon: Smartphone, title: "Built for low network", text: "Light screens that save fast on site and sync when the network returns." },
];

const DEEP = [
  { tag: "Attendance", title: "Muster your whole site before the tea cools.", text: "Twelve assigned workers, one screen. Tick states, hit save, done. Half-day and overtime logic stays consistent so weekly wages never need re-explaining." },
  { tag: "Money", title: "Know your margin while there's still time to fix it.", text: "Every day of labour and every bag of cement flows into project cost. Compare against the contract and catch the jobs that are quietly losing money." },
  { tag: "Materials", title: "Stock-outs stop being emergencies.", text: "Set a minimum per item. When cement drops below 50 bags or steel below 500 kg, the card turns amber and the office can order the same day." },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title={<>Everything a site office does, without the paper.</>}
        sub="Eight tightly-scoped tools that match how Indian construction sites actually run. Fast to learn, hard to outgrow."
        secondaryHref="/pricing"
        secondaryLabel="See pricing"
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionHead eyebrow="Scan it" title="What the product does" sub="Skim the grid. If a card matches your daily headache, that's the feature working." />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {GRID.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 70}>
              <Card className="card-hover h-full p-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-background text-primary">
                  <f.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-[15px] font-semibold text-text">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-text-muted">{f.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionHead eyebrow="Deep dive" title="Three workflows, done properly" />
          <div className="mt-8 flex flex-col gap-3">
            {DEEP.map((d, i) => (
              <Reveal key={d.tag} delay={i * 80}>
                <Card className="grid gap-4 p-5 sm:p-8 md:grid-cols-4 md:items-center">
                  <div>
                    <Badge tone="primary">{d.tag}</Badge>
                    <h3 className="mt-3 text-lg font-semibold tracking-tight text-text sm:text-xl">
                      {d.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-7 text-text-muted md:col-span-3">{d.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta title="See it on your own sites." sub="Tell us how many sites you run and we'll show you the matching workflow." />
    </>
  );
}
