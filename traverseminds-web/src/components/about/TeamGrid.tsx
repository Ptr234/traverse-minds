"use client";

import { motion } from "framer-motion";
import { TeamCard } from "./TeamCard";
import { TextReveal } from "@/components/ui/TextReveal";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const teamMembers = [
  {
    name: "Masiika Christine Thembo",
    title: "Founder & CEO",
    division: "Leadership",
    photo: `${basePath}/christine-masika.jpg`,
    linkedIn: "https://linkedin.com/in/christinemasika",
  },
];

export function TeamGrid() {
  return (
    <section id="team" style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Our People</p>
          </motion.div>
          <TextReveal
            as="h2"
            variant="blur-in"
            staggerSpeed={0.06}
            className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000" }}
          >
            Meet the Team
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
            className="mt-3 max-w-md mx-auto" style={{ color: "#515459" }}
          >
            Local experts building for Africa. Team profiles updated as we grow.
          </motion.p>
        </div>

        <SectionReveal
          variant="fade-up"
          staggerChildren={0.1}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto"
        >
          {teamMembers.map((member, i) => (
            <RevealItem key={i} variant="scale-fade">
              <TeamCard {...member} />
            </RevealItem>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}
