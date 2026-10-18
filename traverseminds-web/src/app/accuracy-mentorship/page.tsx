import type { Metadata } from "next";
import { SectionBar } from "@/components/magazine/SectionBar";
import { PageHeader } from "@/components/magazine/PageHeader";
import { ModulesShowcase } from "@/components/accuracy-mentorship/ModulesShowcase";
import { RegistrationSections } from "@/components/accuracy-mentorship/RegistrationSections";
import { SponsorCTA } from "@/components/accuracy-mentorship/SponsorCTA";
import { SectionHeader } from "@/components/magazine/primitives";

const REASONS = [
  {
    title: "Young people with meaning",
    text: "76% of Uganda's population is under 30. Too many are moving through their most formative years without ever being asked serious questions about who they want to be or what they're building. Meaning isn't discovered; it's constructed, deliberately.",
  },
  {
    title: "Reducing entitlement",
    text: "Among 18–30-year-olds, 41% are neither in employment, education, nor training. But it's not just jobs, it's readiness. Entitlement grows where effort, consequence and ownership are never installed. This programme corrects that by design.",
  },
  {
    title: "Self-sustainable futures",
    text: "Government programmes reach only a fraction of those who need them. This programme builds internal infrastructure (habits, judgment, financial literacy, resilience) that makes a young person capable of generating their own stability.",
  },
];

const OUTCOMES = [
  "Articulate a personal identity and set of values independent of external validation",
  "Apply structured thinking and problem-solving to real situations",
  "Make decisions with understanding of consequence, risk, and long-term cost",
  "Demonstrate financial literacy: budgeting, saving, investing, entrepreneurship",
  "Build personal habits and systems that hold up without external supervision",
  "Navigate family relationships with maturity and healthy boundaries",
  "Exercise positive influence among peers, online and offline",
  "Reflect honestly on mortality and legacy to produce urgency and gratitude",
];

const DELIVERY = [
  { term: "Cohorts", text: "10–12 week cycles, 15–20 participants per cohort. Tier 1 (14–18) and Tier 2 (19–25) run separately." },
  { term: "Sessions", text: "20–30 minute mentor input, guided discussion, practical exercises. Low-lecture, high-practice." },
  { term: "The Accuracy Journal", text: "A private, ongoing self-audit completed between sessions, where the core discipline of doing the work when no one is watching is actually practised." },
  { term: "Mentorship", text: "Each participant is paired with a trained mentor, ideally carried through both tiers. Guides, not lecturers." },
];

const GRADUATION = [
  { term: "Not exam-based", text: "Graduation is earned through demonstrated consistency over time, not a single test or presentation." },
  { term: "Module completion", text: "All 10 modules must be attended and engaged with at the appropriate depth for your tier." },
  { term: "Journal consistency", text: "A minimum of 80% of journal entries completed across the term, reviewed for consistency of practice." },
  { term: "Capstone project", text: "Level 1: a small, real commitment kept over 4+ weeks. Level 2: a real, executed commitment (business, financial plan, community initiative)." },
];

export const metadata: Metadata = {
  title: "Accuracy Mentorship Program",
  description:
    "Prepare young people to live with vigour, meaning, and self-sufficiency. A Traverse Minds Africa initiative for ages 14–25.",
};

export default function AccuracyMentorshipPage() {
  return (
    <>
      <SectionBar />
      <PageHeader
        crumbs={[{ name: "Home", href: "/" }, { name: "Accuracy Mentorship", href: "/accuracy-mentorship" }]}
        kicker="Accuracy Mentorship Program"
        title="The quiet discipline of getting it right"
        dek="Preparing young people to live with vigour, meaning and self-sufficiency in a world that increasingly rewards appearance over substance."
      />

      {/* Why this programme exists */}
      <section className="relative overflow-hidden bg-bg-dark text-white">
        <div className="tech-grid-dark absolute inset-0" aria-hidden />
        <div className="container-max relative py-14 lg:py-20">
          <SectionHeader title="Why this programme exists" dark />
          <h2 className="max-w-3xl font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1]">Building a self-sufficient generation.</h2>
          <ol className="mt-10 grid gap-px border-t-2 border-white/80 bg-white/15 md:grid-cols-3">
            {REASONS.map((r, i) => (
              <li key={r.title} className="bg-bg-dark px-1 py-7 md:px-7">
                <span className="font-mono text-[32px] font-semibold leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-serif text-[22px] font-semibold">{r.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">{r.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Programme outcomes */}
      <section className="bg-white">
        <div className="container-max py-14 lg:py-20">
          <SectionHeader title="What you'll gain" />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.8fr] lg:gap-16">
            <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] text-black">Programme outcomes.</h2>
            <ol className="grid border-t-2 border-black sm:grid-cols-2">
              {OUTCOMES.map((o, i) => (
                <li key={o} className="grid grid-cols-[36px_1fr] border-b border-black/15 py-4 sm:pr-6 sm:odd:border-r sm:even:pl-6">
                  <span className="font-mono text-[13px] font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-[15px] leading-relaxed text-gn-200">{o}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Modules */}
      <ModulesShowcase />

      {/* How it works */}
      <section className="bg-white">
        <div className="container-max py-14 lg:py-20">
          <SectionHeader title="How it works" />
          <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] text-black">Delivery and graduation.</h2>
          <div className="mt-10 grid gap-12 md:grid-cols-2">
            {[
              { heading: "How we deliver", items: DELIVERY },
              { heading: "Graduation criteria", items: GRADUATION },
            ].map((col) => (
              <div key={col.heading}>
                <h3 className="font-serif text-[24px] font-semibold text-black">{col.heading}</h3>
                <dl className="mt-4 border-t-2 border-black">
                  {col.items.map((item) => (
                    <div key={item.term} className="border-b border-black/15 py-4">
                      <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">{item.term}</dt>
                      <dd className="mt-1.5 text-[15px] leading-relaxed text-gn-300">{item.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsor CTA */}
      <SponsorCTA />

      {/* Registration */}
      <div id="apply">
        <RegistrationSections />
      </div>

      {/* Closing */}
      <section className="relative overflow-hidden bg-bg-dark text-white">
        <div className="tech-grid-dark absolute inset-0" aria-hidden />
        <div className="container-max relative py-14 lg:py-20">
          <SectionHeader title="Get started" dark />
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <h2 className="font-serif text-[clamp(30px,4vw,48px)] font-semibold leading-[1.1]">Ready to begin?</h2>
            <div>
              <p className="text-[17px] leading-relaxed text-white/70">
                Whether you&apos;re ready to commit to your own formation, support your school&apos;s students, or invest in this work,
                there&apos;s a role for you.
              </p>
              <p className="mt-4 border-l-[3px] border-accent pl-4 font-serif text-[18px] text-white/85">
                Accuracy is the quiet discipline of getting it right when no one&apos;s watching.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
