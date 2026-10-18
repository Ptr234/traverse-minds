"use client";

import { useState } from "react";
import { RecordsHeader, LatestRecords, TopicIndex } from "@/components/public-record/RecordsFront";
import { SectionBar } from "@/components/magazine/SectionBar";
import { Features } from "@/components/public-record/Features";
import { Coverage, type PreviewCounts } from "@/components/public-record/Coverage";
import { WaitlistForm } from "@/components/public-record/WaitlistForm";
import { SearchInterface } from "@/components/public-record/SearchInterface";
import { Button } from "@/components/ui/Button";
import { PageTransition } from "@/components/ui/PageTransition";
import { SectionHeader } from "@/components/magazine/primitives";
import { PricingModal } from "@/components/public-record/PricingModal";
import { OpenDataLandscape } from "@/components/public-record/OpenDataLandscape";
import type { OpenDataLandscapeData } from "@/lib/hdx";
import { CitedStats } from "@/components/ui/CitedStats";
import type { CitedStatistic } from "@/lib/statistics";
import { PRICING_PLANS, type PricingPlan } from "@/lib/plans";
import { Faq, type FaqItem } from "@/components/seo/Faq";

// Answers describe what exists today; update as jurisdictions and features launch.
const FAQ: FaqItem[] = [
  {
    question: "What is Public Record Africa?",
    answer:
      "An AI search, summary and monitoring layer over public records from African governments: legislation, court judgments, gazettes and regulatory notices. Every record links back to its official source.",
  },
  {
    question: "Can I use it today?",
    answer:
      "Public Record is in preview. You can search a sample of real Ugandan laws and court judgments on this page now. Full search, summaries and alerts open to the waitlist first.",
  },
  {
    question: "Which countries are covered?",
    answer:
      "The preview covers Uganda. Kenya, Tanzania, Rwanda, Burundi, Nigeria and South Africa are on the roadmap, and we add jurisdictions in order of waitlist demand, so tell us which ones you need when you join.",
  },
  {
    question: "Where does the data come from?",
    answer:
      "Only publicly accessible sources: government registries, court systems and regulators. The preview uses Ugandan legislation and judgments from the Laws.Africa platform, with full texts on ULII (the Uganda Legal Information Institute).",
  },
  {
    question: "Do you charge for public information?",
    answer:
      "No. We never sell or restrict access to public data that is already freely available. Paid plans pay for the search, summarisation and monitoring we build on top of it.",
  },
  {
    question: "Will I get alerts when new records match my interests?",
    answer:
      "Yes, monitoring is part of full access: save keywords, organisations or topics and get notified when new matching records are added. Join the waitlist to be among the first to use it.",
  },
  {
    question: "How do you handle my personal data?",
    answer:
      "We use your waitlist details only to contact you about Public Record access, in line with our Privacy Policy and Uganda's Data Protection and Privacy Act, 2019.",
  },
];

const audiences = [
  { title: "Law firms", desc: "Search court records, regulatory filings and legal precedents in seconds, starting with Uganda." },
  { title: "Investigative journalists", desc: "Access public documents and government records to power evidence-based reporting." },
  { title: "Researchers", desc: "Build datasets from public records for academic research, policy analysis and impact assessments." },
  { title: "Government bodies", desc: "Monitor regulatory changes, cross-reference public filings and share information between agencies." },
];


export function PublicRecordPageClient({
  openData,
  stats,
  previewCounts,
}: {
  openData: OpenDataLandscapeData | null;
  stats: CitedStatistic[];
  previewCounts: PreviewCounts;
}) {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [activePlan, setActivePlan] = useState<PricingPlan | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchJurisdiction, setSearchJurisdiction] = useState("Uganda");

  const plans = PRICING_PLANS[billing];

  const handleSearch = (query: string, jurisdiction: string) => {
    setSearchQuery(query);
    setSearchJurisdiction(jurisdiction);
    setIsSearching(true);
  };

  return (
    <div className="flex flex-col">
      <PageTransition>
      <SectionBar />
      <RecordsHeader onSearch={(q) => handleSearch(q, "Uganda")} />
      <LatestRecords onSearchAll={() => handleSearch("", "Uganda")} />
      <TopicIndex onSelect={(topic) => handleSearch(topic, "Uganda")} />
      <Features />
      <Coverage counts={previewCounts} />
      {openData && <OpenDataLandscape data={openData} />}
      <CitedStats stats={stats} eyebrow="Records In Uganda" title="The scale of the public record" background="#ffffff" />

      {/* Search Interface Modal-like Overlay */}
      {isSearching && (
        <SearchInterface 
          query={searchQuery} 
          initialJurisdiction={searchJurisdiction} 
          onClose={() => setIsSearching(false)} 
        />
      )}

      {/* Who it's for */}
      <section className="bg-white">
        <div className="container-max py-14 lg:py-20">
          <SectionHeader title="Audience" />
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] text-black">Who it&apos;s for.</h2>
            <p className="text-[17px] leading-relaxed text-gn-400">
              Professionals who need fast, reliable access to African public documents.
            </p>
          </div>
          <ol className="mt-10 grid gap-px border-t-2 border-black bg-black/15 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a, i) => (
              <li key={a.title} className="bg-white px-1 py-7 sm:px-6">
                <span className="font-mono text-[28px] font-semibold leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-serif text-[21px] font-semibold text-black">{a.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-gn-400">{a.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Ethics and data governance */}
      <section className="relative overflow-hidden bg-bg-dark text-white">
        <div className="tech-grid-dark absolute inset-0" aria-hidden />
        <div className="container-max relative py-14 lg:py-20">
          <SectionHeader title="Ethics" dark />
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1]">
              We provide the intelligence layer. We never sell or restrict access to public data.
            </h2>
            <p className="text-[17px] leading-relaxed text-white/65">
              All data indexed by Public Record Africa is sourced from publicly accessible government registries, court systems and
              regulatory bodies. We add value through search, summarisation and monitoring, not through data restriction.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white">
        <div className="container-max py-14 lg:py-20">
          <SectionHeader title="Pricing" />
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] text-black">Simple, transparent pricing.</h2>
              <p className="mt-3 text-[17px] text-gn-400">Choose the plan that fits your research needs.</p>
            </div>
            <div role="group" aria-label="Billing period" className="flex border border-black/15">
              {(["monthly", "annual"] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBilling(b)}
                  aria-pressed={billing === b}
                  className={`min-h-11 px-5 font-mono text-[12px] uppercase tracking-wider ${billing === b ? "bg-black text-white" : "text-gn-300 hover:bg-bg-light"}`}
                >
                  {b === "monthly" ? "Monthly" : "Annual · 2 months free"}
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-10 grid gap-px border-t-2 border-black bg-black/15 md:grid-cols-3">
            {plans.map((plan) => (
              <li key={plan.name} className={`flex flex-col px-1 py-8 sm:px-7 ${plan.featured ? "bg-bg-light" : "bg-white"}`}>
                <p className="flex items-center justify-between gap-3">
                  <span className="font-serif text-[22px] font-semibold text-black">{plan.name}</span>
                  {plan.featured && (
                    <span className="border border-accent px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">Recommended</span>
                  )}
                </p>
                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className="font-mono text-[34px] font-semibold leading-none text-black">{plan.price}</span>
                  <span className="text-[14px] text-gn-500">{plan.period}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-2.5 border-t border-black/10 pt-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[15px] text-gn-300">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button variant={plan.featured ? "primary" : "outline"} className="w-full" onClick={() => setActivePlan(plan)}>
                    {plan.name === "Enterprise" ? "Contact sales" : "Get started"}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Faq items={FAQ} eyebrow="Questions" title="Public Record, explained" />
      <WaitlistForm />

      <PricingModal
        key={activePlan ? `${activePlan.name}-${billing}` : "closed"}
        plan={activePlan}
        billing={billing}
        onClose={() => setActivePlan(null)}
      />
      </PageTransition>
    </div>
  );
}
