"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { PageTransition } from "@/components/ui/PageTransition";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { Calendar, MapPin, ArrowRight, Users, Mic, Clock } from "lucide-react";

const eventsHeroImages = [
  "/cyber/cyber_image_29.jpg",
  "/cyber/cyber_image_25.jpg",
  "/cyber/cyber_image_10.jpg",
  "/cyber/cyber_image_38.jpg",
];

const eventTypes = ["All", "Conference", "Luncheon", "Hackathon", "Workshop"] as const;

const upcomingEvents = [
  {
    title: "Cyber Luncheon Kampala — May 2026",
    type: "Luncheon",
    date: "15 May 2026",
    location: "Kampala, Uganda",
    slug: "/events/cyber-luncheon",
    image: "/cyber/cyber_image_25.jpg",
    featured: true,
  },
];

export default function EventsPage() {
  const [activeType, setActiveType] = useState<string>("All");

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-44 lg:pb-36">
        <ImageSlideshow images={eventsHeroImages} overlay="bg-primary/70" />

        <div className="container-max relative z-10 px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-4 py-1.5 backdrop-blur-md mb-8"
            >
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/55">Traverse Events</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05]"
            >
              Where leaders <span className="text-gradient-accent">connect</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-lg text-lg text-white/50 leading-relaxed"
            >
              Luncheons, conferences, hackathons, and workshops — curated for East Africa&apos;s cybersecurity decision-makers.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Event Type Filter Tabs */}
      <section className="relative bg-surface-elevated overflow-hidden border-b border-border-light">
        <div className="container-max relative z-10 px-6 lg:px-8 py-6">
          <div className="flex overflow-x-auto gap-2 pb-2 -mx-2 px-2">
            {eventTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`shrink-0 rounded-full px-5 py-2 min-h-11 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeType === type
                    ? "bg-accent text-white shadow-sm"
                    : "bg-white border border-border-light text-brand-medium/60 hover:text-primary hover:border-primary/20"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="relative bg-surface-elevated section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid-light opacity-40 pointer-events-none" />

        <div className="container-max relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-8"
          >
            <div className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">Upcoming</span>
          </motion.div>

          {upcomingEvents.map((ev) => (
            <SectionReveal key={ev.slug} variant="clip-inset">
              <Link
                href={ev.slug}
                className="group block overflow-hidden rounded-3xl border border-border-light bg-white transition-all duration-500 hover:shadow-elevated hover:-translate-y-1"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative aspect-video md:aspect-auto md:min-h-90 overflow-hidden">
                    <Image
                      src={ev.image}
                      alt={ev.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-transparent to-white/80 hidden md:block" />
                    <div className="absolute inset-0 bg-linear-to-t from-white to-transparent md:hidden" />
                    {ev.featured && (
                      <span className="absolute left-4 top-4 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">
                      {ev.type}
                    </span>
                    <h3 className="mt-3 font-display text-2xl md:text-3xl font-bold text-primary tracking-tight">
                      {ev.title}
                    </h3>
                    <p className="mt-3 text-brand-medium/60">
                      An intimate, curated lunch for East Africa&apos;s cybersecurity leaders. 30 seats. Real conversations, no sales pitches.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-brand-muted">
                      <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{ev.date}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{ev.location}</span>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-accent transition-all duration-300 group-hover:gap-3">
                      View Details & RSVP <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Sponsor / Speak */}
      <section className="relative bg-white section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid-light opacity-30 pointer-events-none" />

        <SectionReveal variant="fade-up" staggerChildren={0.12} className="container-max relative z-10 max-w-4xl mx-auto grid grid-cols-1 gap-5 md:grid-cols-2">
          {[
            { icon: Mic, title: "Speak at Our Events", desc: "Share your expertise with East Africa's cybersecurity community.", img: "/cyber/cyber_image_10.jpg" },
            { icon: Users, title: "Sponsor an Event", desc: "Put your brand in front of top cybersecurity decision-makers.", img: "/cyber/cyber_image_38.jpg" },
          ].map((c) => (
            <RevealItem key={c.title} variant="scale-fade">
              <div className="group overflow-hidden rounded-2xl border border-border-light bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated">
                <div className="relative h-40 overflow-hidden">
                  <Image src={c.img} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-linear-to-b from-transparent to-white" />
                  <div className="absolute bottom-4 left-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 backdrop-blur-sm">
                      <c.icon className="h-5 w-5 text-accent" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-primary">{c.title}</h3>
                  <p className="mt-2 text-sm text-brand-medium/60">{c.desc}</p>
                  <div className="mt-5">
                    <Button variant="outline" size="sm" href="/contact">Enquire</Button>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </SectionReveal>
      </section>

      {/* Past Events */}
      <section className="relative bg-surface-elevated section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid-light opacity-40 pointer-events-none" />

        <div className="container-max relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5"
          >
            <div className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">Past Events</span>
          </motion.div>

          <TextReveal
            as="h2"
            variant="fade-up"
            className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight"
          >
            Past Events
          </TextReveal>

          <SectionReveal variant="scale-fade" delay={0.15}>
            <div className="mt-10 rounded-3xl border-2 border-dashed border-border-light py-16 max-w-2xl mx-auto">
              <Clock className="mx-auto h-10 w-10 text-brand-muted/30 mb-4" />
              <p className="text-lg font-semibold text-primary">No past events yet</p>
              <p className="mt-2 text-brand-medium/60 max-w-md mx-auto">
                Our first Cyber Luncheon is coming May 2026. Stay tuned for recaps and highlights after each event.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}
