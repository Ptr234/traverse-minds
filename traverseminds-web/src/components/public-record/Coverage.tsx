"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { AfricaMap } from "@/components/ui/AfricaMap";
import type { CountryData } from "@/components/ui/AfricaMap";

const coverageCountries: CountryData[] = [
  { name: "Uganda",       data: "15,000+ records",  status: "active" },
  { name: "Kenya",        data: "22,000+ records",  status: "active" },
  { name: "Tanzania",     data: "12,000+ records",  status: "active" },
  { name: "Rwanda",       data: "8,000+ records",   status: "active" },
  { name: "Burundi",      data: "4,500+ records",   status: "active" },
  { name: "Ethiopia",     data: "3,200+ records",   status: "active" },
  { name: "Nigeria",      data: "Pipeline",         status: "pipeline" },
  { name: "Ghana",        data: "Pipeline",         status: "pipeline" },
  { name: "Senegal",      data: "Pipeline",         status: "pipeline" },
  { name: "Ivory Coast",  data: "Pipeline",         status: "pipeline" },
  { name: "South Africa", data: "Pipeline",         status: "pipeline" },
  { name: "Zambia",       data: "Pipeline",         status: "pipeline" },
  { name: "Botswana",     data: "Pipeline",         status: "pipeline" },
  { name: "Namibia",      data: "Pipeline",         status: "pipeline" },
  { name: "DRC",          data: "Pipeline",         status: "pipeline" },
  { name: "Cameroon",     data: "Pipeline",         status: "pipeline" },
  { name: "Gabon",        data: "Pipeline",         status: "pipeline" },
];

const stats = [
  { value: "65k+", label: "Indexed Records" },
  { value: "6",    label: "Active Countries" },
  { value: "17",   label: "Countries Total" },
  { value: "24h",  label: "Update Cycle" },
];

export function Coverage() {
  return (
    <section
      style={{ background: "#f0f1f4", paddingTop: 80, paddingBottom: 80 }}
      className="relative overflow-hidden"
    >
      <div className="container-max relative z-10">
        <div className="flex flex-col gap-12">

          {/* Header */}
          <div className="max-w-2xl">
            <SectionReveal variant="clip-left">
              <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Coverage</p>
            </SectionReveal>
            <TextReveal variant="fade-up" className="font-display text-3xl md:text-5xl font-bold tracking-tight" style={{ color: "#000" }}>
              Unrivalled access across the continent
            </TextReveal>
            <SectionReveal variant="fade-up" delay={0.2}>
              <p className="mt-5 text-lg leading-relaxed" style={{ color: "#515459" }}>
                Building the most comprehensive digital archive of public records in Africa —
                from official gazettes and court registries to parliament archives, continuously indexed.
              </p>
            </SectionReveal>
          </div>

          {/* Stats row */}
          <SectionReveal variant="fade-up" staggerChildren={0.08} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white p-5 text-center border"
                style={{ borderRadius: 12, borderColor: "rgba(0,0,0,0.07)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
              >
                <p className="font-display text-3xl font-bold" style={{ color: "#ff4c00" }}>{s.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider" style={{ color: "#919499" }}>{s.label}</p>
              </div>
            ))}
          </SectionReveal>

          {/* Map + legend */}
          <SectionReveal variant="clip-inset">
            <div className="bg-white border overflow-hidden" style={{ borderRadius: 16, borderColor: "rgba(0,0,0,0.08)", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
              {/* Legend */}
              <div className="flex flex-wrap items-center gap-6 px-6 py-4 border-b" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#000" }}>Coverage</span>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ background: "#ff4c00" }} />
                  <span className="text-xs" style={{ color: "#515459" }}>Live — records indexed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ background: "#919499" }} />
                  <span className="text-xs" style={{ color: "#515459" }}>Pipeline — coming soon</span>
                </div>
                <span className="ml-auto text-xs italic" style={{ color: "#c5c7cc" }}>Hover a marker for details</span>
              </div>

              {/* Map */}
              <AfricaMap
                countries={coverageCountries}
                className="rounded-none! border-0! h-120"
              />
            </div>
          </SectionReveal>

        </div>
      </div>
    </section>
  );
}
