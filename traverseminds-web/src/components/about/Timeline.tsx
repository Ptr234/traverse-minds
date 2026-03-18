"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const milestones = [
  {
    year: "2024",
    title: "The idea takes shape",
    description:
      "Founded in Kampala with a clear conviction: East Africa needs homegrown cybersecurity and civic-tech capacity.",
  },
  {
    year: "2025",
    title: "Traverse Security launches",
    description:
      "First cybersecurity engagements with Ugandan financial institutions. Built a team of certified security professionals.",
  },
  {
    year: "2025",
    title: "Think Tank established",
    description:
      "Published first independent policy brief on Uganda's PDPA 2019 implementation gaps.",
  },
  {
    year: "2026",
    title: "Six divisions, one mission",
    description:
      "Expanded to six interconnected divisions: Security, Events, Public Record EA, Digital Literacy, Media, and Think Tank.",
  },
];

export function Timeline() {
  return (
    <section className="relative section-padding overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/90" />
      </div>
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-5"
            >
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/50">
                Our Journey
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight"
            >
              Our Story
            </motion.h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 h-full w-px bg-white/15 md:left-1/2 md:-translate-x-px" />

            <div className="space-y-12">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  className="relative pl-14 md:pl-0"
                >
                  {/* Dot */}
                  <div className="absolute left-3.5 top-1 h-3.5 w-3.5 rounded-full border-2 border-accent bg-primary md:left-1/2 md:-translate-x-1.75" />

                  <div
                    className={`md:w-[calc(50%-2.5rem)] ${
                      i % 2 === 0
                        ? "md:mr-auto md:pr-8 md:text-right"
                        : "md:ml-auto md:pl-8"
                    }`}
                  >
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5">
                      <span className="inline-block rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent">
                        {m.year}
                      </span>
                      <h3 className="mt-3 font-display text-lg font-bold text-white">
                        {m.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">
                        {m.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
