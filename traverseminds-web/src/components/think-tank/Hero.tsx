"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { TextReveal } from "@/components/ui/TextReveal";
import { BookOpen, ArrowRight } from "lucide-react";

const heroImages = [
  "https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
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
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Strategic Intelligence</p>
          </motion.div>

          <TextReveal
            as="h1"
            variant="clip-up"
            delay={0.3}
            className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] font-bold text-white tracking-tight"
          >
            Independent policy intelligence for Africa&apos;s digital future
          </TextReveal>

          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
          >
            Bridging the gap between technology and policy. We provide
            independent research on data protection, AI governance,
            cybersecurity policy, and digital rights across Africa.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.65, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <Button variant="primary" size="lg" href="#publications">
              Read Reports
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline-dark" size="lg" href="#commission">
              Commission Research
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
