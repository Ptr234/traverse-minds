"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { TextReveal } from "@/components/ui/TextReveal";
import { ArrowRight } from "lucide-react";

const heroImages = [
  "/cyber/cyber_image_20.jpg",
  "/cyber/cyber_image_11.jpg",
  "/cyber/cyber_image_08.jpg",
  "/cyber/cyber_image_21.jpg",
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
            <div className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/60">Public Record EA</span>
          </motion.div>

          <TextReveal
            as="h1"
            variant="blur-in"
            delay={0.3}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight"
          >
            East Africa&apos;s government records — intelligently searchable
          </TextReveal>

          <motion.p
            className="mt-6 text-lg text-white/50 leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          >
            Search, summarise, and monitor public documents, court records,
            and regulatory updates across Uganda, Kenya, Tanzania, Rwanda,
            and Burundi.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] as const }}
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
