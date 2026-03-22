"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { TextReveal } from "@/components/ui/TextReveal";
import { BookOpen, ArrowRight } from "lucide-react";

const heroImages = [
  "/cyber/cyber_image_04.jpg",
  "/cyber/cyber_image_06.jpg",
  "/cyber/cyber_image_11.jpg",
  "/cyber/cyber_image_15.jpg",
];

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <ImageSlideshow images={heroImages} overlay="bg-primary/70" />

      <div className="container-max relative z-10 px-6 lg:px-8 pt-32 pb-24 lg:pt-40">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-8"
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <BookOpen className="h-3 w-3 text-accent" />
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/60">
              Strategic Intelligence
            </span>
          </motion.div>

          <TextReveal
            as="h1"
            variant="clip-up"
            delay={0.3}
            className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] font-bold text-white tracking-tight"
          >
            Independent policy intelligence for East Africa&apos;s digital future
          </TextReveal>

          <motion.p
            className="mt-6 max-w-xl text-lg text-white/50 leading-relaxed"
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          >
            Bridging the gap between technology and policy. We provide
            independent research on data protection, AI governance,
            cybersecurity policy, and digital rights across the EAC.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] as const }}
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
