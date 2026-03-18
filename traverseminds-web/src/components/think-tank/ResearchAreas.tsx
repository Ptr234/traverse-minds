"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Brain, Fingerprint, Globe, Users, FileText } from "lucide-react";

const areas = [
  { icon: Shield, title: "Data Protection", description: "Analysing the impact and implementation of the Uganda PDPA 2019 and regional data protection frameworks.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&q=70" },
  { icon: Brain, title: "AI Governance", description: "Researching ethics, bias, and regulatory approaches to Artificial Intelligence in the African context.", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=70" },
  { icon: Fingerprint, title: "Digital Identity", description: "Studying the evolution of national ID systems and their impact on inclusion and human rights.", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=70" },
  { icon: Globe, title: "Open Government", description: "Advocating for data transparency and the digitisation of public records to improve accountability.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=70" },
  { icon: Users, title: "Digital Inclusion", description: "Identifying barriers to digital access and developing policy recommendations for the digital divide.", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=70" },
  { icon: FileText, title: "Civic Tech Impact", description: "Measuring the effectiveness of technology interventions in improving public service delivery.", image: "https://images.unsplash.com/photo-1504711434969-e33886168d0c?w=600&q=70" },
];

export function ResearchAreas() {
  return (
    <section className="relative bg-surface-elevated section-padding overflow-hidden">
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
            <div className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">Focus Areas</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
            Our core <span className="text-gradient-accent">research areas</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mt-3 text-brand-medium/60 max-w-2xl mx-auto">
            We focus on the most critical intersections of technology, law, and society in East Africa.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, idx) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated min-h-56"
            >
              <Image src={area.image} alt={area.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-primary/80 group-hover:bg-primary/70 transition-colors duration-500" />

              <div className="relative z-10 p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-accent transition-all duration-500 group-hover:scale-110">
                  <area.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-white">{area.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/40">{area.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
