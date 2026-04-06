"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";

const heroImages = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1451187530220-cf00172e0478?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1510511459019-5dee997dd1db?q=80&w=2070&auto=format&fit=crop",
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative flex items-end overflow-hidden" style={{ minHeight: "85vh" }}>
      {/* Full-bleed image with GatesNotes gradient fade to bg */}
      <div className="absolute inset-0">
        <ImageSlideshow images={heroImages} overlay="bg-black/20" />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 50%, #f0f1f4 100%)",
          }}
        />
      </div>

      {/* Text overlay — bottom-left, GatesNotes positioning */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full pb-16 pt-40"
        style={{ maxWidth: 1240, margin: "0 auto", padding: "160px 24px 64px" }}
      >
        {/* GatesNotes: text overlay card with blur */}
        <div
          style={{
            maxWidth: 520,
            padding: "32px 24px",
            borderRadius: 8,
            background: "hsla(0,0%,100%,0.8)",
            backdropFilter: "blur(10px)",
          }}
        >
          <motion.p variants={fadeUp} className="eyebrow mb-4" style={{ color: "#515459" }}>
            Built for Africa &middot; Driven by Evidence
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display font-bold"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: "100%", letterSpacing: "-1.12px", color: "#000" }}
          >
            Securing the Digital Frontier of Africa.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{ marginTop: 16, fontSize: 16, fontWeight: 400, lineHeight: "125%", color: "#313439" }}
          >
            Uganda&apos;s integrated civic-tech company. Six divisions working together
            across cybersecurity, public records, events, digital literacy,
            media, and policy research.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3" style={{ marginTop: 24 }}>
            <Button variant="primary" size="md" href="/contact">
              Launch Inquiry
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="md" href="/think-tank">
              Explore Research
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
