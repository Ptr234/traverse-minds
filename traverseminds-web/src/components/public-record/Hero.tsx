"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { TextReveal } from "@/components/ui/TextReveal";
import { ArrowRight } from "lucide-react";

const heroImages = [
  "https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2030&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=2070&auto=format&fit=crop",
];

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <ImageSlideshow images={heroImages} overlay="bg-primary/70" />

      <div className="container-max relative z-10 px-6 lg:px-8 pt-32 pb-24 lg:pt-40">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Public Record EA</p>
          </motion.div>

          <TextReveal
            as="h1"
            variant="blur-in"
            delay={0.3}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight"
          >
            East Africa&apos;s government records -- intelligently searchable
          </TextReveal>

          <motion.p
            className="mt-6 text-lg leading-relaxed max-w-xl"
            style={{ color: "rgba(255,255,255,0.5)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
          >
            Search, summarise, and monitor public documents, court records,
            and regulatory updates across Uganda, Kenya, Tanzania, Rwanda,
            and Burundi.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.65, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <Button variant="primary" size="lg" href="#waitlist">
              Join the Waitlist
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline-dark" size="lg">
              See How it Works
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
