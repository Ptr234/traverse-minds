"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TextReveal } from "@/components/ui/TextReveal";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";

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
          src="/cyber/cyber_image_06.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/90" />
      </div>

      <div className="container-max relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Our Journey</p>
            </motion.div>
            <TextReveal
              as="h2"
              variant="clip-up"
              staggerSpeed={0.06}
              className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight"
            >
              Our Story
            </TextReveal>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 h-full w-px bg-white/15 md:left-1/2 md:-translate-x-px" />

            <SectionReveal variant="fade-up" staggerChildren={0.12} className="space-y-12">
              {milestones.map((m, i) => (
                <RevealItem
                  key={i}
                  variant="slide-up"
                >
                  <div className="relative pl-14 md:pl-0">
                    {/* Dot */}
                    <div className="absolute left-3.5 top-1 h-3.5 w-3.5 rounded-full border-2 border-accent bg-primary md:left-1/2 md:-translate-x-1.75" />

                    <div
                      className={`md:w-[calc(50%-2.5rem)] ${
                        i % 2 === 0
                          ? "md:mr-auto md:pr-8 md:text-right"
                          : "md:ml-auto md:pl-8"
                      }`}
                    >
                      <div className="border border-white/10 bg-white/5 p-6" style={{ borderRadius: 8, transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
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
                  </div>
                </RevealItem>
              ))}
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
