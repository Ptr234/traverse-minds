"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Calendar, Database, Brain, Mic, BookOpen, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const divisions = [
  {
    id: "security", name: "Cybersecurity", icon: Shield,
    desc: "End-to-end protection for critical infrastructure, banks, and government.",
    href: "/security", size: "md:col-span-2 md:row-span-2",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=70",
  },
  {
    id: "think-tank", name: "Think Tank", icon: Brain,
    desc: "Independent research and policy analysis for the digital age.",
    href: "/think-tank", size: "",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=70",
  },
  {
    id: "public-record", name: "Public Record EA", icon: Database,
    desc: "AI-powered transparency tool for accessing public documents.",
    href: "/public-record", size: "",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=70",
  },
  {
    id: "events", name: "Events", icon: Calendar,
    desc: "High-level forums like the Cyber Luncheon for digital leaders.",
    href: "/events", size: "",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=70",
  },
  {
    id: "media", name: "Media", icon: Mic,
    desc: "Amplifying narratives through podcasts, reports, and coverage.",
    href: "/media", size: "",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&q=70",
  },
  {
    id: "literacy", name: "Digital Literacy", icon: BookOpen,
    desc: "Empowering SMEs and citizens with essential digital skills and safety.",
    href: "/literacy", size: "md:col-span-2",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=70",
  },
];

export function FeaturedDivision() {
  return (
    <section className="relative overflow-hidden bg-primary section-padding">
      <div className="container-max relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6"
            >
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/50">
                One Company. Six Divisions.
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight"
            >
              Six divisions,{" "}
              <span className="text-gradient-accent">one integrated mission</span>.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-sm text-base leading-relaxed"
          >
            Every division strengthens the others — security informs research, events build community, media amplifies findings.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
          {divisions.map((div, idx) => (
            <motion.div
              key={div.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              className={div.size}
            >
              <Link
                href={div.href}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1"
              >
                {/* Background image */}
                <Image src={div.image} alt={div.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-primary/75 group-hover:bg-primary/65 transition-colors duration-500" />

                <div className="relative z-10 p-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-accent transition-transform duration-500 group-hover:scale-110">
                    <div.icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold text-white">{div.name}</h3>
                  <p className="mt-2 text-sm text-white/55 leading-relaxed max-w-75">{div.desc}</p>
                </div>

                <div className="relative z-10 p-7 pt-0 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/25 group-hover:text-accent transition-colors duration-300">
                    Explore
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/25 transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:scale-110">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
