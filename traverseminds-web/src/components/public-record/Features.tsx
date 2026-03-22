"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Search, FileText, Bell, Zap, Database, ShieldCheck } from "lucide-react";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";

const features = [
  { icon: Search, title: "Semantic Search", description: "Search documents by meaning and context, not just keywords. Find relevant case law or regulatory updates in seconds.", image: "/cyber/cyber_image_08.jpg" },
  { icon: FileText, title: "AI Summarisation", description: "Get concise, accurate summaries of lengthy documents, policy briefs, and court judgements instantly.", image: "/cyber/cyber_image_11.jpg" },
  { icon: Bell, title: "Smart Alerts", description: "Set up custom monitors for specific keywords, organisations, or topics. Get notified when new records are indexed.", image: "/cyber/cyber_image_21.jpg" },
  { icon: Zap, title: "Cross-Border Intel", description: "Compare regulations and public records across Uganda, Kenya, Tanzania, Rwanda, and Burundi in a single view.", image: "/cyber/cyber_image_20.jpg" },
  { icon: Database, title: "Vast Archive", description: "Access a growing database of thousands of gazettes, hansards, and court records dating back decades.", image: "/cyber/cyber_image_06.jpg" },
  { icon: ShieldCheck, title: "Verified Sources", description: "Every document is linked to its official source, ensuring the highest level of evidentiary integrity.", image: "/cyber/cyber_image_14.jpg" },
];

export function Features() {
  return (
    <section className="relative bg-white section-padding overflow-hidden">
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 12, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
            <div className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">Platform</span>
          </motion.div>
          <TextReveal variant="clip-up" delay={0.05} className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
            Built to empower evidence-based action
          </TextReveal>
          <motion.p initial={{ opacity: 0, y: 10, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mt-3 text-brand-medium/60 max-w-2xl mx-auto">
            Three pillars of intelligence to navigate East Africa&apos;s public record landscape.
          </motion.p>
        </div>

        <SectionReveal variant="fade-up" staggerChildren={0.1} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <RevealItem
              key={feature.title}
              variant="scale-fade"
              className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated min-h-56"
            >
              <Image src={feature.image} alt={feature.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-primary/80 group-hover:bg-primary/70 transition-colors duration-500" />

              <div className="relative z-10 p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-accent transition-all duration-500 group-hover:scale-110">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{feature.description}</p>
              </div>
            </RevealItem>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}
