"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, FileDown, Clock } from "lucide-react";

const reports = [
  {
    title: "Data Protection in Uganda: 2025 Status Report",
    tag: "Policy",
    tagColor: "bg-accent/15 text-accent",
  },
  {
    title: "AI Governance Framework for East African Regulators",
    tag: "AI & Governance",
    tagColor: "bg-emerald/15 text-emerald",
  },
  {
    title: "Digital Rights in the EAC: Annual Review",
    tag: "Digital Rights",
    tagColor: "bg-blue-500/15 text-blue-400",
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
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="max-w-xl">
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
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button variant="outline" size="md" href="/think-tank">
              View All Research
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>

        {/* Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reports.map((report, idx) => (
            <motion.div
              key={report.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: idx * 0.1,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bento-card flex flex-col justify-between"
            >
              <div>
                {/* Tag row */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${report.tagColor}`}
                  >
                    {report.tag}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-600">
                    <Clock className="h-3 w-3" />
                    Coming soon
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-lg font-bold text-primary leading-snug">
                  {report.title}
                </h3>

                <p className="mt-3 text-sm text-brand-medium/60 leading-relaxed">
                  Independent research and analysis from the Traverse Minds Think
                  Tank division.
                </p>
              </div>

              {/* Download CTA */}
              <div className="mt-8">
                <button
                  disabled
                  className="inline-flex items-center gap-2 rounded-full border border-border-light bg-surface-elevated px-5 py-2.5 text-sm font-semibold text-brand-muted cursor-not-allowed opacity-60 transition-all"
                >
                  <FileDown className="h-4 w-4" />
                  Download Report
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
