"use client";

import { motion } from "framer-motion";
import { Mic, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { TextReveal } from "@/components/ui/TextReveal";

const heroImages = [
  "/cyber/cyber_image_16.jpg",
  "/cyber/cyber_image_30.jpg",
  "/cyber/cyber_image_12.jpg",
  "/cyber/cyber_image_11.jpg",
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
          transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>New Episode Weekly</p>

          <TextReveal
            as="h1"
            variant="clip-up"
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05]"
          >
            Facts & Figures The Policy Podcast
          </TextReveal>

          <p className="mt-6 text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Unpacking the data, laws, and technology shaping East Africa.
            Join our experts and guest policy-makers as they navigate the complexities of the regional digital landscape.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button variant="primary" size="lg">
              <Play className="h-4 w-4 fill-current" /> Listen Now
            </Button>
            <div className="flex items-center gap-5 px-2">
              {["Spotify", "Apple", "Google"].map((p) => (
                <span key={p} className="text-xs font-semibold cursor-pointer uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
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
