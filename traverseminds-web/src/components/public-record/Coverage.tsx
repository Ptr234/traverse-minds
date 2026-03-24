"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";

const countries = [
  { name: "Uganda", code: "UG", records: "15,000+", flag: "https://flagcdn.com/ug.svg" },
  { name: "Kenya", code: "KE", records: "22,000+", flag: "https://flagcdn.com/ke.svg" },
  { name: "Tanzania", code: "TZ", records: "12,000+", flag: "https://flagcdn.com/tz.svg" },
  { name: "Rwanda", code: "RW", records: "8,000+", flag: "https://flagcdn.com/rw.svg" },
  { name: "Burundi", code: "BI", records: "4,500+", flag: "https://flagcdn.com/bi.svg" },
];

export function Coverage() {
  return (
    <section style={{ background: "#f0f1f4", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
      <div className="container-max relative z-10">
        <div className="flex flex-col items-center justify-between gap-16 lg:flex-row">
          <SectionReveal variant="clip-left" className="max-w-xl">
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Coverage</p>

            <TextReveal variant="fade-up" className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000" }}>
              Unrivalled coverage across East Africa
            </TextReveal>

            <p className="mt-5 text-base leading-relaxed" style={{ color: "#515459" }}>
              We are building the most comprehensive digital archive of public records
              in the region. Our data engine continuously crawls and indexes official
              gazettes, court registries, and parliament archives across five nations.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
              {countries.map((country) => (
                <div key={country.code} className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <div className="relative h-3.5 w-5 overflow-hidden rounded-sm">
                      <Image src={country.flag} alt={country.name} fill className="object-cover" />
                    </div>
                    <span className="text-sm font-semibold" style={{ color: "#000" }}>{country.name}</span>
                  </div>
                  <span className="font-display text-xl font-bold text-accent">{country.records}</span>
                  <span className="text-[10px] uppercase tracking-wider" style={{ color: "#919499" }}>Records Indexed</span>
                </div>
              ))}
            </div>
          </SectionReveal>

          {/* Stats visual */}
          <SectionReveal variant="scale-fade" delay={0.2} className="relative w-full max-w-md aspect-square overflow-hidden" style={{ borderRadius: 16, background: "#212429", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1), 0 2px 2px 0 rgba(0,0,0,0.15), 0 1px 0 0 rgba(0,0,0,0.05)" }}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="h-full w-full"
            >
            <div className="relative z-10 flex h-full flex-col justify-center text-center text-white p-8">
              <span className="font-display text-6xl font-bold" style={{ color: "#ff4c00" }}>60k+</span>
              <span className="mt-3 text-lg font-bold uppercase tracking-widest text-white/70">Total Indexed Records</span>
              <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Updated every 24 hours</p>
            </div>
          </motion.div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
