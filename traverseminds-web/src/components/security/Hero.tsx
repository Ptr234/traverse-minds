"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { TextReveal } from "@/components/ui/TextReveal";
import { NetworkConstellation } from "@/components/ui/NetworkConstellation";
import { ArrowDown, ShieldCheck, ArrowRight } from "lucide-react";

const heroImages = [
  "/cyber/cyber_image_14.jpg",
  "/cyber/cyber_image_02.jpg",
  "/cyber/cyber_image_21.jpg",
  "/cyber/cyber_image_01.jpg",
];

export function SecurityHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ImageSlideshow images={heroImages} overlay="bg-primary/70" />
      <NetworkConstellation nodeCount={55} connectionDistance={130} speed={0.5} color="16, 185, 129" color2="249, 115, 22" />

      <div className="relative z-10 w-full container-max px-6 lg:px-8 pt-32 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md mb-8">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60">
              Institutional Grade Protection
            </span>
          </div>
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
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-white/50 leading-relaxed"
        >
          Penetration testing, ISO 27001 compliance, Bank of Uganda audits,
          threat modelling, incident response, and regulatory advisory —
          delivered by a team based in Kampala.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="primary" size="lg" href="#enquiry">
            Request Assessment
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
