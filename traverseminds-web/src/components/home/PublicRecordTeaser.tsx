"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Search, FileText, Bell, ArrowRight } from "lucide-react";

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
        src="https://images.unsplash.com/photo-1568667256549-094345857637?w=1800&q=80"
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

      <div className="container-max relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-8"
          >
            <div className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/50">
              Public Record EA
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight"
          >
            East Africa&apos;s government records &mdash;{" "}
            <span className="text-gradient-accent">intelligently searchable</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-white/45 leading-relaxed max-w-xl mx-auto"
          >
            AI-powered access to parliamentary records, gazettes, court filings,
            and regulatory notices across the East African Community.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            {features.map((feat, idx) => (
              <motion.div
                key={feat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 + idx * 0.08 }}
                className="flex items-center gap-2.5 rounded-full border border-white/8 bg-white/5 px-5 py-2.5 backdrop-blur-sm"
              >
                <feat.icon className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold text-white/70">
                  {feat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <Button variant="primary" size="lg" href="/public-record">
              Join the Waitlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
