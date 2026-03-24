"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/TextReveal";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";

const programmes = [
  { id: 1, title: "CyberSafe Schools", audience: "students", duration: "4 Weeks", format: "In-person Workshops", description: "Equipping students with the skills to identify online grooming, cyberbullying, and misinformation.", topics: ["Password Safety", "Privacy Settings", "Digital Footprint"], image: "/cyber/cyber_image_33.jpg" },
  { id: 2, title: "SME Security Essentials", audience: "business", duration: "2 Days", format: "Intensive Boot Camp", description: "Practical security training for business owners and employees. From phishing to basic encryption.", topics: ["Phishing Awareness", "Device Security", "Data Backups"], image: "/cyber/cyber_image_35.jpg" },
  { id: 3, title: "Digital Safety for Educators", audience: "teachers", duration: "1 Week", format: "Hybrid (Online + In-person)", description: "Training teachers to integrate digital citizenship and online safety into their daily curriculum.", topics: ["Classroom Policy", "Online Resources", "Parent Engagement"], image: "/cyber/cyber_image_05.jpg" },
  { id: 4, title: "Public Sector Cyber Literacy", audience: "government", duration: "3 Days", format: "Closed Workshop", description: "Critical security awareness for government staff handling sensitive citizen data and public services.", topics: ["Information Handling", "Social Engineering", "Compliance"], image: "/cyber/cyber_image_40.jpg" },
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
    <section style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
      <div className="container-max relative z-10">
        <div className="text-center mb-12">
          <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Programmes</p>
          <TextReveal
            as="h2"
            variant="fade-up"
            className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000" }}
          >
            Our Training Programmes
          </TextReveal>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-5 py-2 text-sm font-semibold ${
                  filter === f.value
                    ? "bg-accent text-white"
                    : "text-brand-medium"
                }`}
                style={{ borderRadius: 999, transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)", background: filter === f.value ? undefined : "#f0f1f4" }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <SectionReveal variant="fade-up">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
                className="group relative overflow-hidden"
                style={{ borderRadius: 8, transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
              >
                <Image src={p.image} alt={p.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-primary/85" style={{ transition: "background 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }} />

                <div className="relative z-10 p-7 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-accent/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
                      {p.audience}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                      <Clock className="h-3 w-3" /> {p.duration}
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-white" style={{ transition: "color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{p.description}</p>

                  <div className="mt-5">
                    <h4 className="text-[10px] font-semibold uppercase tracking-wider text-white/25">What you&apos;ll cover:</h4>
                    <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                      {p.topics.map((t) => (
                        <li key={t} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                          <div className="h-1 w-1 rounded-full bg-accent" /> {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-5 flex items-center justify-between border-t border-white/8">
                    <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
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
        </SectionReveal>
      </div>
    </section>
  );
}
