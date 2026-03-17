"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Particles } from "@/components/ui/Particles";

export function MissionStatement() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-light-surface/60 via-transparent to-light-surface/80" />
      </div>
      <Particles />

      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl py-20 lg:py-28">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="hero-bar" />
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber">Our Mission</p>
            <h1 className="font-display text-3xl uppercase leading-[1.1] tracking-tight text-brand-charcoal md:text-4xl lg:text-5xl">
              A digitally secure<br /><span className="text-brand-amber">East Africa</span>
            </h1>
          </motion.div>
          <motion.p className="mt-6 max-w-lg text-lg leading-relaxed text-brand-medium" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            Technology serving the public interest — built for African realities, anchored in local laws, driven by evidence.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
