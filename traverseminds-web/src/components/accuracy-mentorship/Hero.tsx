"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { TextReveal } from "@/components/ui/TextReveal";
import { PageTransition } from "@/components/ui/PageTransition";

const heroImages = [
  "/imagestouse/tec (2).jpg",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
];

export function AccuracyMentorshipHero() {
  return (
    <PageTransition>
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <ImageSlideshow images={heroImages} overlay="bg-primary/70" />

        <div className="container-max relative z-10 px-6 lg:px-8 pt-32 pb-24 lg:pt-40">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>
                ACCURACY MENTORSHIP PROGRAM
              </p>

              <TextReveal
                as="h1"
                variant="slide-up"
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6"
              >
                The Quiet Discipline of Getting It Right
              </TextReveal>

              <p className="mt-6 text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.7)" }}>
                Preparing young people to live with vigour, meaning, and self-sufficiency in a world that increasingly rewards appearance over substance.
              </p>

              <p className="mt-4 text-base" style={{ color: "rgba(255,255,255,0.5)" }}>
                Accuracy is the quiet discipline of getting it right when no one's watching.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button variant="accent" size="lg" href="#apply">
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline-dark" size="lg" href="#learn-more">
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
