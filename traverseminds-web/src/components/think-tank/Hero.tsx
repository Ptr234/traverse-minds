"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { BookOpen, ArrowRight } from "lucide-react";

const heroImages = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80",
  "https://images.unsplash.com/photo-1504711434969-e33886168d0c?w=1800&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1800&q=80",
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
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-8">
            <BookOpen className="h-3 w-3 text-accent" />
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/60">
              Strategic Intelligence
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] font-bold text-white tracking-tight">
            Independent policy intelligence for{" "}
            <span className="text-gradient-accent">East Africa&apos;s digital future</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/50 leading-relaxed">
            Bridging the gap between technology and policy. We provide
            independent research on data protection, AI governance,
            cybersecurity policy, and digital rights across the EAC.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Button variant="primary" size="lg" href="#publications">
              Read Reports
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline-dark" size="lg" href="#commission">
              Commission Research
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
