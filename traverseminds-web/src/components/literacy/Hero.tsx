"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { TextReveal } from "@/components/ui/TextReveal";

const heroImages = [
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2104&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop",
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Digital Literacy Division</p>

            <TextReveal
              as="h1"
              variant="slide-up"
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight"
            >
              Digital safety for every Ugandan
            </TextReveal>

            <p className="mt-6 text-lg leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.5)" }}>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {audiences.map((item) => (
              <div
                key={item.label}
                className="border border-white/10 bg-white/5 p-6"
                style={{ borderRadius: 8 }}
              >
                <div className="font-display text-lg font-bold text-white md:text-xl">{item.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
