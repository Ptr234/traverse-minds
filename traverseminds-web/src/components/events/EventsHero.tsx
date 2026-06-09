"use client";

import { motion } from "framer-motion";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";

const eventsHeroImages = [
  "/imagestouse/eventslide/stud.jpg",
  "/imagestouse/eventslide/stud (1).jpg",
  "/imagestouse/eventslide/stud (2).jpg",
  "/imagestouse/eventslide/stud (3).jpg",
];

export function EventsHero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center pt-32 pb-32 lg:pt-48 lg:pb-48">
      <ImageSlideshow images={eventsHeroImages} overlay="bg-primary/70" />
      <div className="container-max relative z-10 px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Traverse Events</p>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05]"
          >
            Where leaders <span style={{ color: "#ff4c00" }}>connect</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="mt-6 max-w-lg text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Luncheons, conferences, hackathons, and workshops — curated for Africa&apos;s cybersecurity decision-makers.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
