"use client";

import { motion } from "framer-motion";
import { Mic, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";

const heroImages = [
  "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1800&q=80",
  "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1800&q=80",
  "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1800&q=80",
  "https://images.unsplash.com/photo-1504711434969-e33886168d0c?w=1800&q=80",
];

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <ImageSlideshow images={heroImages} overlay="bg-primary/65" />

      <div className="container-max relative z-10 px-6 lg:px-8 pt-32 pb-24 lg:pt-40">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-8">
            <Mic className="h-3 w-3 text-accent" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60">
              New Episode Weekly
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05]">
            Facts & Figures{" "}
            <span className="text-gradient-accent">The Policy Podcast</span>
          </h1>

          <p className="mt-6 text-lg text-white/50 leading-relaxed">
            Unpacking the data, laws, and technology shaping East Africa.
            Join our experts and guest policy-makers as they navigate the complexities of the regional digital landscape.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button variant="primary" size="lg">
              <Play className="h-4 w-4 fill-current" /> Listen Now
            </Button>
            <div className="flex items-center gap-5 px-2">
              {["Spotify", "Apple", "Google"].map((p) => (
                <span key={p} className="text-xs font-semibold text-white/30 hover:text-white cursor-pointer transition-colors uppercase tracking-wider">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
