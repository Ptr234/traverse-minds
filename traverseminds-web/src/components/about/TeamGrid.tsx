"use client";

import { motion } from "framer-motion";
import { TeamCard } from "./TeamCard";

const teamMembers = [
  { name: "Christine Masika", title: "Founder & CEO", division: "Leadership", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80", linkedIn: "https://linkedin.com/in/" },
  { name: "Team Member", title: "Head of Security", division: "Traverse Security", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", linkedIn: "https://linkedin.com/in/" },
  { name: "Team Member", title: "Lead Researcher", division: "Think Tank", photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80", linkedIn: "https://linkedin.com/in/" },
  { name: "Team Member", title: "Events & Community Lead", division: "Traverse Events", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", linkedIn: "https://linkedin.com/in/" },
];

export function TeamGrid() {
  return (
    <section className="bg-light-surface px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber">Our People</span>
          <h2 className="mt-3 font-display text-2xl text-brand-green md:text-3xl">Our Team</h2>
          <p className="mx-auto mt-3 max-w-2xl text-brand-medium">Local experts building for East Africa.</p>
        </div>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {teamMembers.map((member, i) => (
            <motion.div key={i} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}>
              <TeamCard {...member} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
