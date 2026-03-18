"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const programmes = [
  { id: 1, title: "CyberSafe Schools", audience: "students", duration: "4 Weeks", format: "In-person Workshops", description: "Equipping students with the skills to identify online grooming, cyberbullying, and misinformation.", topics: ["Password Safety", "Privacy Settings", "Digital Footprint"], image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=70" },
  { id: 2, title: "SME Security Essentials", audience: "business", duration: "2 Days", format: "Intensive Boot Camp", description: "Practical security training for business owners and employees. From phishing to basic encryption.", topics: ["Phishing Awareness", "Device Security", "Data Backups"], image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=70" },
  { id: 3, title: "Digital Safety for Educators", audience: "teachers", duration: "1 Week", format: "Hybrid (Online + In-person)", description: "Training teachers to integrate digital citizenship and online safety into their daily curriculum.", topics: ["Classroom Policy", "Online Resources", "Parent Engagement"], image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=70" },
  { id: 4, title: "Public Sector Cyber Literacy", audience: "government", duration: "3 Days", format: "Closed Workshop", description: "Critical security awareness for government staff handling sensitive citizen data and public services.", topics: ["Information Handling", "Social Engineering", "Compliance"], image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=70" },
];

const filters = [
  { label: "All", value: "all" },
  { label: "Students", value: "students" },
  { label: "Business", value: "business" },
  { label: "Teachers", value: "teachers" },
  { label: "Government", value: "government" },
];

export function ProgrammeListing() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? programmes : programmes.filter((p) => p.audience === filter);

  return (
    <section className="relative bg-white section-padding overflow-hidden">
      <div className="container-max relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
            <div className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">Programmes</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">Our Training Programmes</h2>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                  filter === f.value
                    ? "bg-accent text-white shadow-lg shadow-accent/20"
                    : "bg-surface-elevated text-brand-medium hover:bg-primary hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated"
              >
                <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-primary/85 group-hover:bg-primary/75 transition-colors duration-500" />

                <div className="relative z-10 p-7 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-accent/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
                      {p.audience}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-white/40">
                      <Clock className="h-3 w-3" /> {p.duration}
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-white group-hover:text-accent transition-colors">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/40">{p.description}</p>

                  <div className="mt-5">
                    <h4 className="text-[10px] font-semibold uppercase tracking-wider text-white/25">What you&apos;ll cover:</h4>
                    <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                      {p.topics.map((t) => (
                        <li key={t} className="flex items-center gap-2 text-sm text-white/35">
                          <div className="h-1 w-1 rounded-full bg-accent" /> {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-5 flex items-center justify-between border-t border-white/8">
                    <div className="flex items-center gap-2 text-xs text-white/30">
                      <BookOpen className="h-3.5 w-3.5" /> {p.format}
                    </div>
                    <Button variant="outline-dark" size="sm">
                      Learn More <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
