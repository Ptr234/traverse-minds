"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Search, FileText, Bell, ArrowRight } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";

const features = [
  { icon: Search, label: "Smart Search" },
  { icon: FileText, label: "Auto-Summarise" },
  { icon: Bell, label: "Real-time Alerts" },
];

const gnEase = [0.215, 0.61, 0.355, 1] as const;

export function PublicRecordTeaser() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#212429" }}>
      {/* Subtle background image */}
      <Image src="/cyber/cyber_image_09.jpg" alt="" fill className="object-cover" style={{ opacity: 0.08 }} sizes="100vw" priority={false} />

      <div className="relative z-10" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px" }}>
        <SectionReveal variant="fade-up" className="mx-auto text-center" style={{ maxWidth: 596 }}>
          <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 24 }}>Public Record EA</p>

          <TextReveal
            as="h2"
            variant="fade-up"
            staggerSpeed={0.03}
            delay={0.1}
            className="font-display"
            style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 500, lineHeight: "125%", letterSpacing: "-0.8px", color: "#fff" }}
          >
            East Africa&rsquo;s government records — intelligently searchable.
          </TextReveal>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.35, ease: gnEase }}
            style={{ marginTop: 24, fontSize: 16, lineHeight: "125%", color: "rgba(255,255,255,0.5)", maxWidth: 500, margin: "24px auto 0" }}
          >
            AI-powered access to parliamentary records, gazettes, court filings,
            and regulatory notices across the East African Community.
          </motion.p>

          {/* Feature tags — GatesNotes breadcrumb style */}
          <SectionReveal variant="fade-up" staggerChildren={0.06} delay={0.3} className="flex flex-wrap items-center justify-center gap-2" style={{ marginTop: 32 }}>
            {features.map((feat) => (
              <RevealItem key={feat.label} variant="fade-up">
                <div
                  className="flex items-center gap-2"
                  style={{
                    padding: "8px 12px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 4,
                    transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)",
                  }}
                >
                  <feat.icon className="h-4 w-4" style={{ color: "#ff4c00" }} />
                  <span style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>{feat.label}</span>
                </div>
              </RevealItem>
            ))}
          </SectionReveal>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.35, ease: gnEase }}
            style={{ marginTop: 40 }}
          >
            <Button variant="outline-dark" size="md" href="/public-record">
              Join the Waitlist
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
}
