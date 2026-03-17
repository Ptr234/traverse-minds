"use client";

import { motion } from "framer-motion";

const milestones = [
  { year: "2024", title: "The idea takes shape", description: "Founded in Kampala with a clear conviction: East Africa needs homegrown cybersecurity and civic-tech capacity." },
  { year: "2025", title: "Traverse Security launches", description: "First cybersecurity engagements with Ugandan financial institutions. Built a team of certified security professionals." },
  { year: "2025", title: "Think Tank established", description: "Published first independent policy brief on Uganda's PDPA 2019 implementation gaps." },
  { year: "2026", title: "Six divisions, one mission", description: "Expanded to six interconnected divisions: Security, Events, Public Record EA, Digital Literacy, Media, and Think Tank." },
];

export function Timeline() {
  return (
    <section className="bg-light-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber">Our Journey</span>
          <h2 className="mt-3 font-display text-2xl text-brand-green md:text-3xl">Our Story</h2>
        </div>

        <div className="relative mt-12">
          <div className="absolute left-4 top-0 h-full w-px bg-light-border md:left-1/2 md:-translate-x-px" />

          <div className="space-y-12">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative pl-12 md:pl-0"
              >
                <div className="absolute left-2.5 top-1 h-3 w-3 rounded-full border-2 border-brand-amber bg-light-bg md:left-1/2 md:-translate-x-1.5" />
                <div className={`md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:mr-auto md:pr-8 md:text-right" : "md:ml-auto md:pl-8"}`}>
                  <span className="text-sm font-bold text-brand-amber">{m.year}</span>
                  <h3 className="mt-1 font-display text-lg text-brand-green">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-medium">{m.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
