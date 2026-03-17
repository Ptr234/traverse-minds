"use client";

import { motion } from "framer-motion";
import { Search, ClipboardCheck, FileText, Wrench } from "lucide-react";

const steps = [
  { icon: Search, step: "01", title: "Discovery", description: "We learn your systems, regulatory obligations, and risk appetite through a structured briefing session." },
  { icon: ClipboardCheck, step: "02", title: "Assessment", description: "Our team conducts the agreed testing or audit — penetration tests, compliance reviews, or threat assessments." },
  { icon: FileText, step: "03", title: "Report", description: "You receive a detailed report with findings, risk ratings, evidence, and actionable remediation steps." },
  { icon: Wrench, step: "04", title: "Remediation", description: "We support your team through fixing identified issues and verify each remediation has been implemented correctly." },
];

export function EngagementProcess() {
  return (
    <section className="bg-light-surface px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber">How We Work</span>
          <h2 className="mt-3 font-display text-2xl text-brand-green md:text-4xl">
            Our Four-Step Engagement Process
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-brand-medium">
            A clear, structured approach — no surprises, no ambiguity.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-hover group rounded-xl border border-light-border bg-light-card p-6 transition-all duration-300 hover:border-brand-teal/30"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-teal/10">
                  <item.icon className="h-6 w-6 text-brand-teal" />
                </div>
                <div>
                  <span className="font-display text-2xl text-brand-amber">{item.step}</span>
                  <h3 className="mt-1 text-lg font-semibold text-brand-charcoal">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-medium">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
