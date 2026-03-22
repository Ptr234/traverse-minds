"use client";

import { motion } from "framer-motion";
import { TeamCard } from "./TeamCard";
import { TextReveal } from "@/components/ui/TextReveal";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const teamMembers = [
  {
    name: "Christine Masika",
    title: "Founder & CEO",
    division: "Leadership",
    photo: `${basePath}/christine-masika.jpg`,
    linkedIn: "https://linkedin.com/in/christinemasika",
  },
];

export function TeamGrid() {
  return (
    <section id="team" className="relative bg-white section-padding overflow-hidden">
      <div className="absolute inset-0 dot-grid-light opacity-30 pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5"
          >
            <div className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">
              Our People
            </span>
          </motion.div>
          <TextReveal
            as="h2"
            variant="blur-in"
            staggerSpeed={0.06}
            className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight"
          >
            Meet the Team
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-brand-medium/60 max-w-md mx-auto"
          >
            Local experts building for East Africa. Team profiles updated as we grow.
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
