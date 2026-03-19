"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Calendar, Database, Brain, Mic, BookOpen, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const divisions = [
  {
    id: "security", name: "Cybersecurity", icon: Shield,
    desc: "End-to-end protection for critical infrastructure, banks, and government.",
    href: "/security",
    size: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=70",
    featured: true,
  },
  {
    id: "think-tank", name: "Think Tank", icon: Brain,
    desc: "Independent research and policy analysis for the digital age.",
    href: "/think-tank",
    size: "",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=70",
    featured: false,
  },
  {
    id: "public-record", name: "Public Record EA", icon: Database,
    desc: "AI-powered transparency tool for accessing public documents.",
    href: "/public-record",
    size: "",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=70",
    featured: false,
  },
  {
    id: "events", name: "Events", icon: Calendar,
    desc: "High-level forums like the Cyber Luncheon for digital leaders.",
    href: "/events",
    size: "",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=70",
    featured: false,
  },
  {
    id: "media", name: "Media", icon: Mic,
    desc: "Amplifying narratives through podcasts, reports, and coverage.",
    href: "/media",
    size: "",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&q=70",
    featured: false,
  },
  {
    id: "literacy", name: "Digital Literacy", icon: BookOpen,
    desc: "Empowering SMEs and citizens with essential digital skills and safety.",
    href: "/literacy",
    size: "sm:col-span-2 lg:col-span-2",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=70",
    featured: false,
  },
];

export function FeaturedDivision() {
  return (
    <section className="relative overflow-hidden section-padding">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />
      </div>
      <div className="absolute inset-0 dot-grid-light opacity-30 pointer-events-none" />

      <div className="container-max relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-6"
            >
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">
                One Company. Six Divisions.
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-[1.05] tracking-tight"
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
            className="text-brand-medium/70 max-w-sm text-base leading-relaxed"
          >
            Every division strengthens the others — security informs research, events build community, media amplifies findings.
          </motion.p>
        </div>

        {/* Bento Grid — 4 cols on desktop, 2 on tablet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[220px] lg:auto-rows-[240px]">
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
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-elevated hover:border-accent/25 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {/* Background image */}
                <Image src={div.image} alt={div.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-primary/40 group-hover:from-primary/85 group-hover:via-primary/50 group-hover:to-primary/30 transition-all duration-700" />

                {/* Hover shine sweep */}
                <div className="absolute inset-0 z-[1] opacity-0 group-hover:opacity-100 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-accent backdrop-blur-sm icon-hover-float">
                    <div.icon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-6" />
                  </div>
                </div>

                <div className="relative z-10 p-6 pt-0">
                  <h3 className={`font-display font-bold text-white transition-colors duration-300 group-hover:text-accent ${div.featured ? "text-2xl lg:text-3xl" : "text-lg"}`}>
                    {div.name}
                  </h3>
                  <p className={`mt-2 text-white/65 leading-relaxed ${div.featured ? "text-sm max-w-xs" : "text-xs max-w-60"}`}>
                    {div.desc}
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-white/30 group-hover:text-accent transition-colors duration-300">
                      Explore
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-white/30 group-hover:text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
