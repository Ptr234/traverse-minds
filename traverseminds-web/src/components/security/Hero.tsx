"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { ArrowDown, ShieldCheck, ArrowRight } from "lucide-react";

const heroImages = [
  "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1800&q=80",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1800&q=80",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1800&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1800&q=80",
];

export function SecurityHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ImageSlideshow images={heroImages} overlay="bg-primary/70" />

      <div className="relative z-10 w-full container-max px-6 lg:px-8 pt-32 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md mb-8">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60">
              Institutional Grade Protection
            </span>
          </div>

          <h1 className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-[0.92] font-bold text-white tracking-tight mx-auto max-w-5xl">
            Cybersecurity for{" "}
            <span className="text-gradient-accent">banks &amp; government</span>{" "}
            in East Africa.
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-white/50 leading-relaxed">
            Penetration testing, ISO 27001 compliance, Bank of Uganda audits,
            threat modelling, incident response, and regulatory advisory —
            delivered by a team based in Kampala.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="#enquiry">
              Request Assessment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline-dark" size="lg" href="#capability">
              Explore Capability
            </Button>
          </div>
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
