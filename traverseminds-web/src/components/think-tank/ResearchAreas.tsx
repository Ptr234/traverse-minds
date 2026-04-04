"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Brain, Fingerprint, Globe, Users, FileText } from "lucide-react";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";

const areas = [
  { icon: Shield, title: "Data Protection", description: "Analysing the impact and implementation of the Uganda PDPA 2019 and regional data protection frameworks.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop" },
  { icon: Brain, title: "AI Governance", description: "Researching ethics, bias, and regulatory approaches to Artificial Intelligence in the African context.", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop" },
  { icon: Shield, title: "Cybersecurity Policy", description: "Evaluating national cybersecurity strategies, incident reporting frameworks, and sector-specific regulations across the EAC.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" },
  { icon: Globe, title: "Open Government", description: "Advocating for data transparency, digitisation of public records, and OGP commitments to improve accountability.", image: "https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=2069&auto=format&fit=crop" },
  { icon: Users, title: "Digital Rights", description: "Investigating online freedoms, surveillance oversight, and the balance between security and civil liberties.", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" },
  { icon: FileText, title: "Public Procurement", description: "Analysing transparency in government procurement processes and the role of technology in reducing corruption.", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop" },
];

export function ResearchAreas() {
  return (
    <section style={{ background: "#f0f1f4", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Focus Areas</p>
          </motion.div>
          <TextReveal variant="fade-up" delay={0.05} className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000" }}>
            Our core research areas
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
            className="mt-3 max-w-2xl mx-auto" style={{ color: "#515459" }}
          >
            We focus on the most critical intersections of technology, law, and society in East Africa.
          </motion.p>
        </div>

        <SectionReveal variant="fade-up" staggerChildren={0.1} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <RevealItem
              key={area.title}
              variant="scale-fade"
            >
              <div className="group relative overflow-hidden min-h-56" style={{ borderRadius: 8, transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
                <Image src={area.image} alt={area.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-primary/80" style={{ transition: "background 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }} />

                <div className="relative z-10 p-7">
                  <div className="flex h-12 w-12 items-center justify-center bg-white/10 text-accent" style={{ borderRadius: 8 }}>
                    <area.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-white">{area.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{area.description}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}
