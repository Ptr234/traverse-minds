"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";

const regions = [
  {
    id: "ea",
    name: "East Africa",
    countries: [
      { name: "Uganda", code: "UG", records: "15,000+", flag: "https://flagcdn.com/ug.svg" },
      { name: "Kenya", code: "KE", records: "22,000+", flag: "https://flagcdn.com/ke.svg" },
      { name: "Tanzania", code: "TZ", records: "12,000+", flag: "https://flagcdn.com/tz.svg" },
      { name: "Rwanda", code: "RW", records: "8,000+", flag: "https://flagcdn.com/rw.svg" },
      { name: "Burundi", code: "BI", records: "4,500+", flag: "https://flagcdn.com/bi.svg" },
      { name: "Ethiopia", code: "ET", records: "3,200+", flag: "https://flagcdn.com/et.svg" },
    ],
  },
  {
    id: "wa",
    name: "West Africa",
    countries: [
      { name: "Nigeria", code: "NG", records: "Pipeline", flag: "https://flagcdn.com/ng.svg" },
      { name: "Ghana", code: "GH", records: "Pipeline", flag: "https://flagcdn.com/gh.svg" },
      { name: "Senegal", code: "SN", records: "Pipeline", flag: "https://flagcdn.com/sn.svg" },
      { name: "Ivory Coast", code: "CI", records: "Pipeline", flag: "https://flagcdn.com/ci.svg" },
    ],
  },
  {
    id: "sa",
    name: "Southern Africa",
    countries: [
      { name: "South Africa", code: "ZA", records: "Pipeline", flag: "https://flagcdn.com/za.svg" },
      { name: "Zambia", code: "ZM", records: "Pipeline", flag: "https://flagcdn.com/zm.svg" },
      { name: "Botswana", code: "BW", records: "Pipeline", flag: "https://flagcdn.com/bw.svg" },
      { name: "Namibia", code: "NA", records: "Pipeline", flag: "https://flagcdn.com/na.svg" },
    ],
  },
  {
    id: "ca",
    name: "Central Africa",
    countries: [
      { name: "DRC", code: "CD", records: "Pipeline", flag: "https://flagcdn.com/cd.svg" },
      { name: "Cameroon", code: "CM", records: "Pipeline", flag: "https://flagcdn.com/cm.svg" },
      { name: "Gabon", code: "GA", records: "Pipeline", flag: "https://flagcdn.com/ga.svg" },
    ],
  },
];

export function Coverage() {
  const [activeRegion, setActiveRegion] = useState(regions[0].id);

  return (
    <section style={{ background: "#f0f1f4", paddingTop: 80, paddingBottom: 80 }} className="relative overflow-hidden">
      <div className="container-max relative z-10">
        <div className="flex flex-col gap-12">
          <div className="max-w-2xl">
            <SectionReveal variant="clip-left">
              <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Coverage</p>
            </SectionReveal>
            
            <TextReveal variant="fade-up" className="font-display text-3xl md:text-5xl font-bold tracking-tight" style={{ color: "#000" }}>
              Unrivalled access across the continent
            </TextReveal>

            <SectionReveal variant="fade-up" delay={0.2}>
              <p className="mt-5 text-lg leading-relaxed" style={{ color: "#515459" }}>
                We are building the most comprehensive digital archive of public records
                in Africa. Segmented by region, our data engine continuously crawls 
                official gazettes, court registries, and parliament archives.
              </p>
            </SectionReveal>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Region Selector */}
            <div className="lg:w-1/3">
              <div className="flex flex-col gap-2">
                {regions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setActiveRegion(region.id)}
                    className={`group flex items-center justify-between p-4 transition-all duration-300 ${
                      activeRegion === region.id 
                        ? "bg-white shadow-md translate-x-2" 
                        : "hover:bg-white/50"
                    }`}
                    style={{ 
                      borderRadius: 8,
                      border: activeRegion === region.id ? "1px solid rgba(255,76,0,0.2)" : "1px solid transparent"
                    }}
                  >
                    <span className={`font-display text-lg font-bold ${
                      activeRegion === region.id ? "text-accent" : "text-[#515459]"
                    }`}>
                      {region.name}
                    </span>
                    <div className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      activeRegion === region.id ? "bg-accent scale-125" : "bg-black/10"
                    }`} />
                  </button>
                ))}
              </div>

              <div className="mt-8 p-6 bg-primary text-white" style={{ borderRadius: 12 }}>
                <span className="font-display text-4xl font-bold text-accent">65k+</span>
                <p className="mt-2 text-sm font-medium text-white/70 uppercase tracking-widest">Total Indexed Records</p>
                <div className="mt-4 h-px bg-white/10" />
                <p className="mt-4 text-xs text-white/40 italic">Updated every 24 hours</p>
              </div>
            </div>

            {/* Country Grid */}
            <div className="lg:w-2/3 min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRegion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {regions.find(r => r.id === activeRegion)?.countries.map((country) => (
                    <div 
                      key={country.code} 
                      className="bg-white p-6 border border-black/5 flex flex-col justify-between"
                      style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative h-4 w-6 overflow-hidden rounded-sm shadow-sm">
                          <Image src={country.flag} alt={country.name} fill className="object-cover" />
                        </div>
                        <span className="text-sm font-bold tracking-tight text-[#000]">{country.name}</span>
                      </div>
                      <div className="mt-6">
                        <span className={`font-display text-2xl font-bold ${
                          country.records === "Pipeline" ? "text-black/20" : "text-accent"
                        }`}>
                          {country.records}
                        </span>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#919499] mt-1">
                          {country.records === "Pipeline" ? "Coming Soon" : "Records Indexed"}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
