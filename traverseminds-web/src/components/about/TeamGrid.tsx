"use client";

import { motion } from "framer-motion";
import { TeamCard } from "./TeamCard";

const teamMembers = [
  {
    name: "Christine Masika",
    title: "Founder & CEO",
    division: "Leadership",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    linkedIn: "https://linkedin.com/in/",
  },
  {
    name: "Team Member",
    title: "Head of Security",
    division: "Traverse Security",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    linkedIn: "https://linkedin.com/in/",
  },
  {
    name: "Team Member",
    title: "Lead Researcher",
    division: "Think Tank",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
    linkedIn: "https://linkedin.com/in/",
  },
  {
    name: "Team Member",
    title: "Events & Community Lead",
    division: "Traverse Events",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    linkedIn: "https://linkedin.com/in/",
  },
];

export function TeamGrid() {
  return (
    <section id="team" className="relative bg-white section-padding overflow-hidden">
      <div className="absolute inset-0 dot-grid-light opacity-30 pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5"
          >
            <div className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">
              Our People
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight"
          >
            Meet the Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-brand-medium/60 max-w-md mx-auto"
          >
            Local experts building for East Africa.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
                },
              }}
            >
              <TeamCard {...member} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
