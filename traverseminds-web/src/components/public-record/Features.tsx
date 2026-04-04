"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Search, FileText, Bell, Zap, Database, ShieldCheck } from "lucide-react";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";

const features = [
  { icon: Search, title: "Semantic Search", description: "Search documents by meaning and context, not just keywords. Find relevant case law or regulatory updates in seconds.", image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=2070&auto=format&fit=crop" },
  { icon: FileText, title: "AI Summarisation", description: "Get concise, accurate summaries of lengthy documents, policy briefs, and court judgements instantly.", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop" },
  { icon: Bell, title: "Smart Alerts", description: "Set up custom monitors for specific keywords, organisations, or topics. Get notified when new records are indexed.", image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop" },
  { icon: Zap, title: "Cross-Border Intel", description: "Compare regulations and public records across Uganda, Kenya, Tanzania, Rwanda, and Burundi in a single view.", image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1974&auto=format&fit=crop" },
  { icon: Database, title: "Vast Archive", description: "Access a growing database of thousands of gazettes, hansards, and court records dating back decades.", image: "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2030&auto=format&fit=crop" },
  { icon: ShieldCheck, title: "Verified Sources", description: "Every document is linked to its official source, ensuring the highest level of evidentiary integrity.", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop" },
];

export function Features() {
  return (
    <section style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Platform</p>
          </motion.div>
          <TextReveal variant="clip-up" delay={0.05} className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000" }}>
            Built to empower evidence-based action
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
            className="mt-3 max-w-2xl mx-auto" style={{ color: "#515459" }}
          >
            Three pillars of intelligence to navigate East Africa&apos;s public record landscape.
          </motion.p>
        </div>

        <SectionReveal variant="fade-up" staggerChildren={0.1} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <RevealItem
              key={feature.title}
              variant="scale-fade"
            >
              <div className="group relative overflow-hidden min-h-56" style={{ borderRadius: 8, transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
                <Image src={feature.image} alt={feature.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-primary/80" style={{ transition: "background 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }} />

                <div className="relative z-10 p-7">
                  <div className="flex h-12 w-12 items-center justify-center bg-white/10 text-accent" style={{ borderRadius: 8 }}>
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{feature.description}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}
