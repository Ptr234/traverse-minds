"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Brain, Fingerprint, Globe, Users, FileText } from "lucide-react";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";

const areas = [
  { icon: Shield, title: "Data Protection", description: "Analysing the impact and implementation of the Uganda PDPA 2019 and regional data protection frameworks.", image: "/cyber/cyber_image_14.jpg" },
  { icon: Brain, title: "AI Governance", description: "Researching ethics, bias, and regulatory approaches to Artificial Intelligence in the African context.", image: "/cyber/cyber_image_17.jpg" },
  { icon: Shield, title: "Cybersecurity Policy", description: "Evaluating national cybersecurity strategies, incident reporting frameworks, and sector-specific regulations across the EAC.", image: "/cyber/cyber_image_08.jpg" },
  { icon: Globe, title: "Open Government", description: "Advocating for data transparency, digitisation of public records, and OGP commitments to improve accountability.", image: "/cyber/cyber_image_06.jpg" },
  { icon: Users, title: "Digital Rights", description: "Investigating online freedoms, surveillance oversight, and the balance between security and civil liberties.", image: "/cyber/cyber_image_33.jpg" },
  { icon: FileText, title: "Public Procurement", description: "Analysing transparency in government procurement processes and the role of technology in reducing corruption.", image: "/cyber/cyber_image_11.jpg" },
];

export function ResearchAreas() {
  return (
    <section className="relative bg-surface-elevated section-padding overflow-hidden">
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 12, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
            <div className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">Focus Areas</span>
          </motion.div>
          <TextReveal variant="fade-up" delay={0.05} className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
            Our core research areas
          </TextReveal>
          <motion.p initial={{ opacity: 0, y: 10, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mt-3 text-brand-medium/60 max-w-2xl mx-auto">
            We focus on the most critical intersections of technology, law, and society in East Africa.
          </motion.p>
        </div>

        <SectionReveal variant="fade-up" staggerChildren={0.1} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <RevealItem
              key={area.title}
              variant="scale-fade"
              className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated min-h-56"
            >
              <Image src={area.image} alt={area.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-primary/80 group-hover:bg-primary/70 transition-colors duration-500" />

              <div className="relative z-10 p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-accent transition-all duration-500 group-hover:scale-110">
                  <area.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-white">{area.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{area.description}</p>
              </div>
            </RevealItem>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}
