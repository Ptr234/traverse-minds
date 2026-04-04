"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { TextReveal } from "@/components/ui/TextReveal";
import { ArrowDown, ShieldCheck, ArrowRight } from "lucide-react";

const heroImages = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?q=80&w=2070&auto=format&fit=crop",
];

export function SecurityHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ImageSlideshow images={heroImages} overlay="bg-primary/70" />

      <div className="relative z-10 w-full container-max px-6 lg:px-8 pt-32 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Institutional Grade Protection</p>
        </motion.div>

        <TextReveal
          as="h1"
          variant="blur-in"
          delay={0.3}
          staggerSpeed={0.05}
          className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-[0.92] font-bold text-white tracking-tight mx-auto max-w-5xl"
        >
          Cybersecurity for banks &amp; government in East Africa.
        </TextReveal>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          className="mt-8 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Penetration testing, ISO 27001 compliance, Bank of Uganda audits,
          threat modelling, incident response, and regulatory advisory --
          delivered by a team based in Kampala.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="primary" size="lg" href="#enquiry">
            Request Assessment
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline-dark" size="lg" href="#capability">
            Explore Capability
          </Button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/25 cursor-pointer z-20"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <ArrowDown className="h-5 w-5" />
      </motion.div>
    </section>
  );
}
