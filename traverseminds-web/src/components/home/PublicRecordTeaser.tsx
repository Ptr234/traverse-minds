"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Search, FileText, Bell, ArrowRight } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { FloatingOrbs } from "@/components/ui/FloatingOrbs";
import { MouseGlow } from "@/components/ui/MouseGlow";

const features = [
  { icon: Search, label: "Smart Search" },
  { icon: FileText, label: "Auto-Summarise" },
  { icon: Bell, label: "Real-time Alerts" },
];

export function PublicRecordTeaser() {
  return (
    <section className="relative overflow-hidden bg-primary section-padding">
      {/* Background image with overlay */}
      <Image
        src="/cyber/cyber_image_09.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-primary/85" />

      {/* Dot grid texture */}
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-120 w-120 rounded-full bg-accent/8 blur-[160px] pointer-events-none" />
      <FloatingOrbs variant="accent" />
      <MouseGlow color="249, 115, 22" size={500} intensity={0.06} />

      <div className="container-max relative z-10">
        <SectionReveal variant="fade-blur" className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-8"
          >
            <div className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/50">
              Public Record EA
            </span>
          </motion.div>

          {/* Headline */}
          <TextReveal
            as="h2"
            variant="slide-up"
            staggerSpeed={0.04}
            delay={0.15}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight"
          >
            East Africa&rsquo;s government records — intelligently searchable.
          </TextReveal>

          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base md:text-lg text-white/60 leading-relaxed max-w-xl mx-auto"
          >
            AI-powered access to parliamentary records, gazettes, court filings,
            and regulatory notices across the East African Community.
          </motion.p>

          {/* Feature Pills */}
          <SectionReveal variant="fade-up" staggerChildren={0.1} delay={0.5} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {features.map((feat) => (
              <RevealItem key={feat.label} variant="scale-fade">
                <div className="flex items-center gap-2.5 rounded-full border border-white/8 bg-white/5 px-5 py-2.5 backdrop-blur-sm transition-all duration-500 hover:border-accent/25 hover:bg-accent/10 hover:-translate-y-0.5">
                  <feat.icon className="h-4 w-4 text-accent" />
                  <span className="text-sm font-semibold text-white/70">
                    {feat.label}
                  </span>
                </div>
              </RevealItem>
            ))}
          </SectionReveal>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12"
          >
            <Button variant="primary" size="lg" href="/public-record">
              Join the Waitlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
}
