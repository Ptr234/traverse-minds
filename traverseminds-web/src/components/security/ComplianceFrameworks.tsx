"use client";

import { motion } from "framer-motion";

const frameworks = [
  { name: "ISO 27001", description: "International information security management standard" },
  { name: "Bank of Uganda Guidelines", description: "Cybersecurity requirements for supervised financial institutions" },
  { name: "NIST CSF", description: "US National Institute of Standards and Technology Cybersecurity Framework" },
  { name: "Uganda PDPA 2019", description: "Personal Data Protection Act — Uganda's data privacy law" },
  { name: "PCI DSS", description: "Payment Card Industry Data Security Standard for card processing" },
  { name: "COBIT", description: "IT governance and management framework for enterprise systems" },
];

export function ComplianceFrameworks() {
  return (
    <section className="bg-light-bg px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber">Compliance</span>
          <h2 className="mt-3 font-display text-2xl text-brand-green md:text-4xl">Frameworks We Support</h2>
          <p className="mx-auto mt-4 max-w-2xl text-brand-medium">
            We assess and audit against the standards that matter most to East African institutions.
          </p>
        </div>

        <motion.div
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {frameworks.map((fw) => (
            <motion.div
              key={fw.name}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
              className="card-hover flex items-start gap-4 rounded-xl border border-light-border bg-light-card p-5 transition-all duration-300 hover:border-brand-teal/20"
            >
              <div className="mt-0.5 h-3 w-3 shrink-0 rounded-full bg-brand-amber" />
              <div>
                <h3 className="font-semibold text-brand-charcoal">{fw.name}</h3>
                <p className="mt-1 text-sm text-brand-muted">{fw.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
