"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Particles } from "@/components/ui/Particles";

export function SecurityHero() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1600&q=80"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-light-surface/60 via-transparent to-light-surface/80" />
      </div>

      <Particles />

      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl py-20 lg:py-28">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="hero-bar" />
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber">Traverse Security</p>
            <h1 className="font-display text-4xl uppercase leading-[1.1] tracking-tight text-brand-charcoal md:text-5xl lg:text-6xl">
              Uganda&apos;s most trusted<br /><span className="text-brand-amber">cyber partner</span>
            </h1>
          </motion.div>
          <motion.p className="mt-6 max-w-lg text-lg leading-relaxed text-brand-medium" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            We protect East Africa&apos;s critical institutions with world-class penetration testing, compliance auditing, and incident response — built for African regulatory realities.
          </motion.p>
          <motion.div className="mt-8 flex flex-col gap-4 sm:flex-row" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <Button variant="primary" size="lg" href="#enquiry">Request a Free Assessment</Button>
            <Button variant="outline" size="lg" href="#capability">Download Capability Statement</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
