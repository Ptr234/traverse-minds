"use client";

import { motion } from "framer-motion";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";

const heroImages = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1800&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1800&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1800&q=80",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1800&q=80",
];

export function MissionStatement() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <ImageSlideshow images={heroImages} overlay="bg-primary/70" />

      <div className="relative z-10 container-max px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-8">
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/60">
                Our Mission
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05]">
              A digitally secure{" "}
              <span className="text-gradient-accent">East Africa</span>
            </h1>
          </motion.div>

          <motion.p
            className="mt-6 max-w-xl text-lg text-white/50 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          >
            Built for Africa &middot; Driven by Evidence. Technology serving the
            public interest — anchored in local laws, shaped by independent research.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
