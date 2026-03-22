"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { TextReveal } from "@/components/ui/TextReveal";

const heroImages = [
  "/cyber/cyber_image_33.jpg",
  "/cyber/cyber_image_44.jpg",
  "/cyber/cyber_image_05.jpg",
  "/cyber/cyber_image_40.jpg",
];

const audiences = [
  { label: "Schools", value: "Students & Teachers" },
  { label: "SMEs", value: "Small Business Teams" },
  { label: "Government", value: "Agency Staff" },
  { label: "NGOs", value: "Field Workers" },
];

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <ImageSlideshow images={heroImages} overlay="bg-primary/70" />

      <div className="container-max relative z-10 px-6 lg:px-8 pt-32 pb-24 lg:pt-40">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-8">
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/60">
                Digital Literacy Division
              </span>
            </div>

            <TextReveal
              as="h1"
              variant="slide-up"
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight"
            >
              Digital safety for every Ugandan
            </TextReveal>

            <p className="mt-6 text-lg text-white/50 leading-relaxed max-w-xl">
              Practical, language-accessible digital safety training
              for schools, small businesses, government agencies, and NGOs
              across Uganda.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button variant="primary" size="lg">
                Explore Programmes
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline-dark" size="lg" href="/contact">
                Book for your Organisation
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="grid grid-cols-2 gap-4"
          >
            {audiences.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="font-display text-lg font-bold text-white md:text-xl">{item.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-white/50">{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
