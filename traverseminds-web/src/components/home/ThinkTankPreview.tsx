"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, FileDown, Clock, Brain } from "lucide-react";

const reports = [
  {
    title: "Data Protection in Uganda: 2025 Status Report",
    excerpt: "A comprehensive review of PDPA enforcement, institutional readiness, and compliance gaps across key sectors.",
    tag: "Policy",
    tagColor: "bg-accent/15 text-accent",
    number: "01",
  },
  {
    title: "AI Governance Framework for East African Regulators",
    excerpt: "Proposed regulatory pathways for AI deployment in public services, finance, and healthcare across the EAC.",
    tag: "AI & Governance",
    tagColor: "bg-emerald/15 text-emerald",
    number: "02",
  },
  {
    title: "Digital Rights in the EAC: Annual Review",
    excerpt: "Tracking internet freedom, data sovereignty, and digital inclusion metrics across five member states.",
    tag: "Digital Rights",
    tagColor: "bg-blue-500/15 text-blue-500",
    number: "03",
  },
];

export function ThinkTankPreview() {
  return (
    <section className="relative overflow-hidden bg-white section-padding">
      {/* Background accents */}
      <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/4 h-120 w-120 rounded-full bg-accent/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 h-100 w-100 rounded-full bg-emerald/3 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid-light opacity-50 pointer-events-none" />

      <div className="container-max relative z-10">
        {/* Header — centered */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-6"
          >
            <div className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">
              Think Tank
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-[1.05] tracking-tight"
          >
            Latest from the{" "}
            <span className="text-gradient-emerald">Think Tank</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-base text-brand-medium/60 leading-relaxed max-w-xl mx-auto"
          >
            Independent research and policy analysis shaping the digital future of East Africa.
          </motion.p>
        </div>

        {/* Featured report + side stack */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Featured (first report) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 bento-card hover-glow-accent flex flex-col justify-between min-h-[360px]"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${reports[0].tagColor}`}>
                  {reports[0].tag}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-600">
                  <Clock className="h-3 w-3" />
                  Coming soon
                </span>
              </div>

              <span className="font-mono text-xs text-brand-muted/40 tracking-wider">
                Report {reports[0].number}
              </span>
              <h3 className="mt-2 font-display text-2xl md:text-3xl font-bold text-primary leading-snug tracking-tight">
                {reports[0].title}
              </h3>
              <p className="mt-4 text-base text-brand-medium/60 leading-relaxed max-w-lg">
                {reports[0].excerpt}
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                disabled
                className="inline-flex items-center gap-2 rounded-xl border border-border-light bg-surface-elevated px-5 py-3 text-sm font-semibold text-brand-muted cursor-not-allowed opacity-50 transition-all"
              >
                <FileDown className="h-4 w-4" />
                Download Report
              </button>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5">
                <Brain className="h-5 w-5 text-primary/30" />
              </div>
            </div>
          </motion.div>

          {/* Side stack (remaining reports) */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {reports.slice(1).map((report, idx) => (
              <motion.div
                key={report.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.1 + idx * 0.1,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bento-card hover-glow-accent flex flex-col justify-between flex-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${report.tagColor}`}>
                      {report.tag}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600">
                      <Clock className="h-2.5 w-2.5" />
                      Soon
                    </span>
                  </div>

                  <span className="font-mono text-xs text-brand-muted/40 tracking-wider">
                    Report {report.number}
                  </span>
                  <h3 className="mt-1.5 font-display text-lg font-bold text-primary leading-snug">
                    {report.title}
                  </h3>
                  <p className="mt-2 text-sm text-brand-medium/60 leading-relaxed">
                    {report.excerpt}
                  </p>
                </div>

                <div className="mt-5">
                  <button
                    disabled
                    className="inline-flex items-center gap-2 rounded-xl border border-border-light bg-surface-elevated px-4 py-2.5 text-sm font-semibold text-brand-muted cursor-not-allowed opacity-50 transition-all"
                  >
                    <FileDown className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Button variant="outline" size="lg" href="/think-tank">
            View All Research
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
