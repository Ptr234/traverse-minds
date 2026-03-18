"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";

const heroImages = [
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1800&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1800&q=80",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1800&q=80",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1800&q=80",
];

const stats = [
  { label: "Students Trained", value: "2,500+" },
  { label: "SMEs Empowered", value: "450+" },
  { label: "Workshops", value: "120+" },
  { label: "Safety Alerts", value: "15k+" },
];

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <ImageSlideshow images={heroImages} overlay="bg-primary/70" />

      <div className="container-max relative z-10 px-6 lg:px-8 pt-32 pb-24 lg:pt-40">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-8">
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/60">
                Digital Literacy Division
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight">
              Building a{" "}
              <span className="text-gradient-accent">cyber-safe generation</span>
            </h1>

            <p className="mt-6 text-lg text-white/50 leading-relaxed max-w-xl">
              We provide practical, language-accessible digital safety training
              for schools, small businesses, and government agencies across Uganda.
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="font-display text-2xl font-bold text-white md:text-3xl">{stat.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-white/35">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
