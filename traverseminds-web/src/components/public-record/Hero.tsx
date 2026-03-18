"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { ArrowRight } from "lucide-react";

const heroImages = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80",
  "https://images.unsplash.com/photo-1504711434969-e33886168d0c?w=1800&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1800&q=80",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1800&q=80",
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
            <div className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/60">Public Record EA</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight">
            East Africa&apos;s AI-powered{" "}
            <span className="text-gradient-accent">public document platform</span>
          </h1>

          <p className="mt-6 text-lg text-white/50 leading-relaxed max-w-xl">
            Instantly search, summarise, and monitor thousands of public documents,
            court records, and regulatory updates across five East African nations.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button variant="primary" size="lg" href="#waitlist">
              Join the Waitlist
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline-dark" size="lg">
              See How it Works
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
