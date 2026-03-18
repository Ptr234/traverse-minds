"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const countries = [
  { name: "Uganda", code: "UG", records: "15,000+", flag: "https://flagcdn.com/ug.svg" },
  { name: "Kenya", code: "KE", records: "22,000+", flag: "https://flagcdn.com/ke.svg" },
  { name: "Tanzania", code: "TZ", records: "12,000+", flag: "https://flagcdn.com/tz.svg" },
  { name: "Rwanda", code: "RW", records: "8,000+", flag: "https://flagcdn.com/rw.svg" },
  { name: "Burundi", code: "BI", records: "4,500+", flag: "https://flagcdn.com/bi.svg" },
];

export function Coverage() {
  return (
    <section className="relative bg-surface-elevated section-padding overflow-hidden">
      <div className="absolute inset-0 dot-grid-light opacity-40 pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="flex flex-col items-center justify-between gap-16 lg:flex-row">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-6">
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">Coverage</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Unrivalled coverage{" "}
              <span className="text-gradient-accent">across East Africa</span>
            </h2>

            <p className="mt-5 text-base text-brand-medium/60 leading-relaxed">
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
                    <span className="text-sm font-semibold text-primary">{country.name}</span>
                  </div>
                  <span className="font-display text-xl font-bold text-accent">{country.records}</span>
                  <span className="text-[10px] uppercase tracking-wider text-brand-muted">Records Indexed</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full max-w-md aspect-square rounded-3xl bg-primary overflow-hidden shadow-elevated"
          >
            <div className="absolute inset-0 dot-grid opacity-30" />
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-emerald/10 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col justify-center text-center text-white p-8">
              <span className="font-display text-6xl font-bold text-gradient-accent">60k+</span>
              <span className="mt-3 text-lg font-bold uppercase tracking-widest text-white/70">Total Indexed Records</span>
              <p className="mt-3 text-sm text-white/30">Updated every 24 hours</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
