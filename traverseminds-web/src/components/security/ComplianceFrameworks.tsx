import { SectionHeader } from "@/components/magazine/primitives";

const frameworks = [
  { name: "ISO 27001", scope: "International", description: "The international standard for information security management systems." },
  { name: "Bank of Uganda guidelines", scope: "Uganda", description: "Cybersecurity requirements for financial institutions supervised by the Bank of Uganda." },
  { name: "NIST CSF", scope: "International", description: "The US National Institute of Standards and Technology Cybersecurity Framework." },
  { name: "Data Protection and Privacy Act, 2019", scope: "Uganda", description: "Uganda's data protection law, overseen by the Personal Data Protection Office." },
  { name: "PCI DSS", scope: "Payments", description: "The Payment Card Industry Data Security Standard for anyone who stores, processes or transmits card data." },
  { name: "COBIT", scope: "Governance", description: "A framework for the governance and management of enterprise IT." },
];

/** Standards we assess against, as a ruled index (no stock imagery). */
export function ComplianceFrameworks() {
  return (
    <section className="bg-white">
      <div className="container-max py-14 lg:py-20">
        <SectionHeader title="Compliance" />
        <div className="grid gap-10 lg:grid-cols-[1fr_1.8fr] lg:gap-16">
          <div>
            <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] text-black">Frameworks we support.</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-gn-400">
              We assess and audit against the standards that matter most to African institutions.
            </p>
          </div>
          <ul className="grid border-t-2 border-black sm:grid-cols-2">
            {frameworks.map((f) => (
              <li key={f.name} className="border-b border-black/15 py-6 sm:pr-8 sm:odd:border-r sm:even:pl-8">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">{f.scope}</p>
                <h3 className="mt-1.5 font-serif text-[21px] font-semibold leading-snug text-black">{f.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-gn-400">{f.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
