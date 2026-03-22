"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Zap, Globe, ArrowRight } from "lucide-react";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";

const features = [
  {
    icon: ShieldCheck,
    title: "Institutional Security",
    desc: "End-to-end assessments for banks and government agencies using global frameworks.",
    image: "/cyber/cyber_image_14.jpg",
  },
  {
    icon: Globe,
    title: "Local Excellence",
    desc: "Deep roots in Kampala, providing on-the-ground expertise tailored for African realities.",
    image: "/cyber/cyber_image_06.jpg",
  },
  {
    icon: Zap,
    title: "Think Tank Driven",
    desc: "Direct intelligence pipeline from our research division to your security strategy.",
    image: "/cyber/cyber_image_11.jpg",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function WhatWeDo() {
  return (
    <section className="relative section-padding overflow-hidden bg-white">
      {/* Background accents */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 h-150 w-150 rounded-full bg-accent/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 h-125 w-125 rounded-full bg-emerald/3 blur-[120px] pointer-events-none" />

      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <SectionReveal variant="clip-left" className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-8 w-fit"
            >
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">
                The Traverse Standard
              </span>
            </motion.div>

            <TextReveal
              as="h2"
              variant="fade-up"
              staggerSpeed={0.05}
              delay={0.3}
              className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-primary leading-[1.05] tracking-tight"
            >
              Cybersecurity meets civic technology
            </TextReveal>

            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.5 }}
              className="mt-6 text-lg text-brand-medium/70 leading-relaxed max-w-xl"
            >
              Traverse Minds operates at the intersection of institutional security
              and public-interest research. Our six divisions work together to
              protect organisations, inform policy, and build digital capacity
              across East Africa.
            </motion.p>

            <SectionReveal variant="fade-up" staggerChildren={0.12} delay={0.6} className="mt-10 space-y-5">
              {features.map((item) => (
                <RevealItem key={item.title} variant="slide-up">
                  <div className="group relative overflow-hidden flex gap-4 p-5 rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-card border border-transparent hover:border-accent/15">
                    <Image src={item.image} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="50vw" />
                    <div className="absolute inset-0 bg-primary/85 group-hover:bg-primary/75 transition-colors duration-500" />
                    <div className="relative z-10 shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-accent icon-hover-float backdrop-blur-sm">
                      <item.icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-display text-base font-bold text-white transition-colors duration-300 group-hover:text-accent">{item.title}</h4>
                      <p className="mt-1 text-sm text-white/65 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </SectionReveal>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: 0.8 }}
              className="mt-10"
            >
              <Button variant="secondary" size="lg" href="/security">
                Our Methodology
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </SectionReveal>

          {/* Right: Image with overlays */}
          <SectionReveal variant="clip-inset" delay={0.2}>
            <div className="relative">
              <div className="relative aspect-4/5 rounded-3xl overflow-hidden">
                <Image
                  src="/cyber/cyber_image_02.jpg"
                  alt="Digital Security"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/10 to-transparent" />

                {/* Bottom info card */}
                <motion.div
                  initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8, ease }}
                  className="absolute bottom-6 left-6 right-6 glass-panel rounded-2xl p-6 border-white/20 backdrop-blur-xl"
                >
                  <p className="text-primary text-lg font-display font-bold leading-snug">
                    Six divisions. One integrated mission.
                  </p>
                  <p className="mt-2 text-primary/40 text-xs uppercase tracking-widest font-semibold">
                    Built for Africa &middot; Driven by Evidence
                  </p>
                </motion.div>
              </div>

              {/* Floating division count badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6, ease }}
                className="absolute -top-6 -right-4 hidden md:block"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="glass-panel p-5 rounded-2xl shadow-elevated">
                    <p className="font-display text-3xl font-bold text-accent">6</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mt-1">
                      Divisions
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
