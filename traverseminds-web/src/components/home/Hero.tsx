"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Particles } from "@/components/ui/Particles";

export function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
      {/* Full background image with better overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80"
          alt="Cybersecurity Background"
          fill
          className="object-cover object-center opacity-90"
          priority
        />
        {/* Refined Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white" />
      </div>

      <Particles />

      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="hero-bar shadow-sm" />
            <h1 className="font-display text-5xl font-bold uppercase leading-[1.1] tracking-tight text-brand-charcoal md:text-6xl lg:text-7xl xl:text-8xl">
              Cybersecurity<br />
              <span className="text-gradient-amber relative inline-block">
                is not optional
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="mt-8 max-w-xl text-lg leading-relaxed text-brand-medium md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Traverse Minds protects East Africa&apos;s critical institutions
            with world-class penetration testing, compliance auditing, and
            incident response — built for African realities.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Button variant="primary" size="lg" href="/security" className="shadow-xl shadow-brand-green/20">
              Discover Services
            </Button>
            <Button variant="outline" size="lg" href="/contact">
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-brand-muted/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
