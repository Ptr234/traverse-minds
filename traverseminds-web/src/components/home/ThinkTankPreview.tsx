"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, FileDown, Clock, Brain } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";

const reports = [
  { title: "Data Protection in Uganda: 2025 Status Report", excerpt: "A comprehensive review of PDPA enforcement, institutional readiness, and compliance gaps across key sectors.", tag: "Policy", number: "01" },
  { title: "AI Governance Framework for African Regulators", excerpt: "Proposed regulatory pathways for AI deployment in public services, finance, and healthcare across Africa.", tag: "AI & Governance", number: "02" },
  { title: "Digital Rights in Africa: Annual Review", excerpt: "Tracking internet freedom, data sovereignty, and digital inclusion metrics across five member states.", tag: "Digital Rights", number: "03" },
];

const gnEase = [0.215, 0.61, 0.355, 1] as const;

export function ThinkTankPreview() {
  return (
    <section style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56 }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px 80px" }}>
        {/* Header */}
        <div className="text-center" style={{ marginBottom: 48 }}>
          <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Think Tank</p>
          <TextReveal
            as="h2"
            variant="clip-up"
            staggerSpeed={0.03}
            delay={0.1}
            className="font-display"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 500, lineHeight: "125%", letterSpacing: "-0.8px", color: "#000" }}
          >
            Latest from the Think Tank
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.35, ease: gnEase }}
            style={{ marginTop: 16, fontSize: 16, color: "#515459", lineHeight: "125%", maxWidth: 500, margin: "16px auto 0" }}
          >
            Independent research and policy analysis shaping the digital future of Africa.
          </motion.p>
        </div>

        {/* Featured + side stack */}
        <SectionReveal variant="fade-up" staggerChildren={0.1} delay={0.15} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Featured report */}
          <RevealItem variant="fade-up" className="lg:col-span-3">
            <div className="editorial-card-lg flex flex-col justify-between" style={{ padding: 48, minHeight: 400 }}>
              <div>
                <div className="flex items-center justify-between" style={{ marginBottom: 24 }}>
                  <span className="eyebrow" style={{ color: "#ff4c00" }}>{reports[0].tag}</span>
                  <span className="flex items-center gap-1.5" style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase" as const, color: "#919499" }}>
                    <Clock className="h-3 w-3" /> Coming soon
                  </span>
                </div>
                <span style={{ fontSize: 12, color: "#c1c4c9", fontFamily: "var(--font-mono)", letterSpacing: "0.6px" }}>Report {reports[0].number}</span>
                <h3 className="font-display" style={{ marginTop: 8, fontSize: 32, fontWeight: 500, lineHeight: "125%", letterSpacing: "-0.64px", color: "#000" }}>
                  {reports[0].title}
                </h3>
                <p style={{ marginTop: 16, fontSize: 16, lineHeight: "125%", color: "#515459", maxWidth: 500 }}>{reports[0].excerpt}</p>
              </div>
              <div style={{ marginTop: 32 }}>
                <button disabled className="btn-tag opacity-50 cursor-not-allowed flex items-center gap-2">
                  <FileDown className="h-4 w-4" /> Download Report
                </button>
              </div>
            </div>
          </RevealItem>

          {/* Side stack */}
          <RevealItem variant="fade-up" className="lg:col-span-2 flex flex-col gap-6">
            {reports.slice(1).map((report) => (
              <div key={report.title} className="editorial-card flex flex-col justify-between flex-1" style={{ padding: 32 }}>
                <div>
                  <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
                    <span className="eyebrow" style={{ color: "#ff4c00" }}>{report.tag}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase" as const, color: "#919499" }}>Soon</span>
                  </div>
                  <span style={{ fontSize: 12, color: "#c1c4c9", fontFamily: "var(--font-mono)" }}>Report {report.number}</span>
                  <h3 className="font-display" style={{ marginTop: 8, fontSize: 21, fontWeight: 500, lineHeight: "125%", letterSpacing: "-0.21px", color: "#000" }}>
                    {report.title}
                  </h3>
                  <p style={{ marginTop: 8, fontSize: 14, lineHeight: "125%", color: "#515459" }}>{report.excerpt}</p>
                </div>
                <div style={{ marginTop: 20 }}>
                  <button disabled className="btn-tag opacity-50 cursor-not-allowed flex items-center gap-2 text-xs">
                    <FileDown className="h-3.5 w-3.5" /> Download
                  </button>
                </div>
              </div>
            ))}
          </RevealItem>
        </SectionReveal>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.35, ease: gnEase }}
          className="text-center" style={{ marginTop: 40 }}
        >
          <Button variant="outline" size="md" href="/think-tank">
            View All Research <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
