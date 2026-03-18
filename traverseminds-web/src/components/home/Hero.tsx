"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { useRef } from "react";

const heroImages = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1800&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1800&q=80",
  "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1800&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80",
];

export function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <ImageSlideshow images={heroImages} overlay="bg-primary/70" />

      <motion.div
        style={{ y, opacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className="relative z-10 w-full container-max px-6 lg:px-8 pt-32 pb-24 lg:pt-40"
      >
        <div className="max-w-4xl mx-auto text-center lg:text-left lg:mx-0">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60">
              Built for Africa &middot; Driven by Evidence
            </span>
          </div>

          <h1 className="font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.92] font-bold text-white tracking-tight">
            Securing the{" "}
            <span className="text-gradient-accent">Digital Frontier</span>{" "}
            of East Africa.
          </h1>

          <p className="mt-8 max-w-xl text-lg md:text-xl text-white/50 leading-relaxed mx-auto lg:mx-0">
            Uganda&apos;s integrated civic-tech company. Six divisions working together
            across cybersecurity, public records, events, digital literacy,
            media, and policy research.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Button variant="primary" size="lg" href="/contact">
              Launch Inquiry
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline-dark" size="lg" href="/think-tank">
              Explore Research
            </Button>
          </div>

          <div className="mt-14 flex items-center justify-center lg:justify-start gap-8">
            {[
              { num: "6", label: "Divisions" },
              { num: "5", label: "EAC Countries" },
              { num: "1", label: "Mission" },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="font-display text-2xl font-bold text-white">{stat.num}</p>
                <p className="text-[11px] uppercase tracking-wider text-white/30">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer z-20"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/25">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="h-4 w-4 text-white/25" />
        </motion.div>
      </motion.div>
    </section>
  );
}
