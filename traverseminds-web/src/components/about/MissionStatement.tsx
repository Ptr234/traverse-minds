"use client";

import { motion } from "framer-motion";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { TextReveal } from "@/components/ui/TextReveal";

const heroImages = [
  "/imagestouse/tec.jpg",
  "/imagestouse/tec (1).jpg",
  "/imagestouse/cyber.jpg",
  "/imagestouse/cyber (1).jpg",
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
            transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Our Mission</p>

            <TextReveal
              as="h1"
              variant="slide-up"
              staggerSpeed={0.05}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05]"
            >
              A digitally secure Africa
            </TextReveal>
          </motion.div>

          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          >
            Built for Africa &middot; Driven by Evidence. Technology serving the
            public interest -- anchored in local laws, shaped by independent research.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
