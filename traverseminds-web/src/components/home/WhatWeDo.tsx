"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Zap, Globe, ArrowRight } from "lucide-react";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";

const features = [
  { icon: ShieldCheck, title: "Institutional Security", desc: "End-to-end assessments for banks and government agencies using global frameworks." },
  { icon: Globe, title: "Local Excellence", desc: "Deep roots in Kampala, providing on-the-ground expertise tailored for African realities." },
  { icon: Zap, title: "Think Tank Driven", desc: "Direct intelligence pipeline from our research division to your security strategy." },
];

const gnEase = [0.215, 0.61, 0.355, 1] as const;

export function WhatWeDo() {
  return (
    <section style={{ background: "#f0f1f4", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56 }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px 80px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Content */}
          <SectionReveal variant="fade-up" className="flex flex-col">
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 24 }}>The Traverse Standard</p>

            <TextReveal
              as="h2"
              variant="fade-up"
              staggerSpeed={0.03}
              delay={0.1}
              className="font-display"
              style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 500, lineHeight: "125%", letterSpacing: "-1.44px", color: "#000" }}
            >
              Cybersecurity meets civic technology
            </TextReveal>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.2, ease: gnEase }}
              style={{ marginTop: 24, fontSize: 16, fontWeight: 400, lineHeight: "125%", color: "#313439", maxWidth: 500 }}
            >
              Traverse Minds operates at the intersection of institutional security
              and public-interest research. Our six divisions work together to
              protect organisations, inform policy, and build digital capacity
              across East Africa.
            </motion.p>

            <SectionReveal variant="fade-up" staggerChildren={0.08} delay={0.3} className="space-y-0" style={{ marginTop: 40 }}>
              {features.map((item) => (
                <RevealItem key={item.title} variant="fade-up">
                  <div className="flex gap-4" style={{ padding: "16px 0", borderTop: "1px solid rgba(0,0,0,0.1)" }}>
                    <item.icon className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "#ff4c00" }} />
                    <div>
                      <h4 style={{ fontSize: 16, fontWeight: 500, color: "#000" }}>{item.title}</h4>
                      <p style={{ marginTop: 4, fontSize: 14, color: "#515459", lineHeight: "125%" }}>{item.desc}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </SectionReveal>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.4, ease: gnEase }}
              style={{ marginTop: 32 }}
            >
              <Button variant="primary" size="md" href="/security">
                Our Methodology
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </SectionReveal>

          {/* Right: Image — 4px radius, no shadow, gradient mask */}
          <SectionReveal variant="clip-inset" delay={0.2}>
            <div className="relative overflow-hidden" style={{ aspectRatio: "380/500", borderRadius: 8 }}>
              <Image
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop"
                alt="Digital Security"
                fill
                className="object-cover"
              />
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
