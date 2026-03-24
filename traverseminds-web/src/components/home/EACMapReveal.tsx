"use client";

import { type ReactNode } from "react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { motion } from "framer-motion";

const gnEase = [0.215, 0.61, 0.355, 1] as const;

export function EACMapReveal({ children }: { children: ReactNode }) {
  return (
    <section style={{ background: "#f0f1f4", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56 }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px 80px" }}>
        <div className="text-center" style={{ marginBottom: 40 }}>
          <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Coverage</p>

          <TextReveal
            as="h2"
            variant="fade-up"
            staggerSpeed={0.03}
            delay={0.1}
            className="font-display"
            style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 500, lineHeight: "125%", letterSpacing: "-0.8px", color: "#000" }}
          >
            Operating Across East Africa
          </TextReveal>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.35, ease: gnEase }}
            style={{ marginTop: 12, fontSize: 16, color: "#515459", lineHeight: "125%", maxWidth: 460, margin: "12px auto 0" }}
          >
            Headquartered in Kampala, serving all five EAC member states.
          </motion.p>
        </div>

        <SectionReveal variant="clip-inset" delay={0.2}>
          {children}
        </SectionReveal>
      </div>
    </section>
  );
}
