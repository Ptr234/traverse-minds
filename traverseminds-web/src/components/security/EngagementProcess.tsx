import { SectionHeader } from "@/components/magazine/primitives";

const steps = [
  { title: "Discovery", description: "We learn your systems, regulatory obligations, and risk appetite through a structured briefing session." },
  { title: "Assessment", description: "Our team conducts the agreed testing or audit: penetration tests, compliance reviews, or threat assessments." },
  { title: "Report", description: "You receive a detailed report with findings, risk ratings, evidence, and actionable remediation steps." },
  { title: "Remediation", description: "We support your team through fixing identified issues and verify each remediation has been implemented correctly." },
];

/** How an engagement runs, as a four-step timeline. */
export function EngagementProcess() {
  return (
    <section className="bg-bg-light">
      <div className="container-max py-14 lg:py-20">
        <SectionHeader title="How we work" />
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] text-black">
            Our four-step engagement process.
          </h2>
          <p className="text-[17px] leading-relaxed text-gn-400">A clear, structured approach: no surprises, no ambiguity.</p>
        </div>

        <ol className="mt-12 grid gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative border-t-2 border-black pt-6 md:pr-8">
              <span className="absolute -top-[7px] left-0 h-3 w-3 bg-accent" aria-hidden />
              <span className="font-mono text-[40px] font-semibold leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-serif text-[23px] font-semibold text-black">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-gn-400">{s.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
