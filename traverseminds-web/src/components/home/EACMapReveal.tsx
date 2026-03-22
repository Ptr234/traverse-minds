"use client";

import { type ReactNode } from "react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function EACMapReveal({ children }: { children: ReactNode }) {
  return (
    <section className="relative bg-white section-padding overflow-hidden border-t border-border-light">
      <div className="container-max">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5"
          >
            <div className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">
              Coverage
            </span>
          </motion.div>

          <TextReveal
            as="h2"
            variant="fade-up"
            staggerSpeed={0.06}
            delay={0.1}
            className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight"
          >
            Operating Across East Africa
          </TextReveal>

          <motion.p
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease }}
            className="mt-3 text-brand-medium/60 max-w-lg mx-auto"
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
