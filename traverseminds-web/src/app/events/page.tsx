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
  "https://images.unsplash.com/photo-1540575861501-7ad0582371f3?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop",
];

const eventTypes = ["All", "Conference", "Luncheon", "Hackathon", "Workshop"] as const;

const upcomingEvents = [
  {
    title: "Cyber Luncheon Kampala -- May 2026",
    type: "Luncheon",
    date: "15 May 2026",
    location: "Kampala, Uganda",
    slug: "/events/cyber-luncheon",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop",
    featured: true,
  },
];

export default function EventsPage() {
... User modified the `new_string` content to be: "use client";

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
  "https://images.unsplash.com/photo-1540575861501-7ad0582371f3?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop",
];

const eventTypes = ["All", "Conference", "Luncheon", "Hackathon", "Workshop"] as const;

const upcomingEvents = [
  {
    title: "Cyber Luncheon Kampala -- May 2026",
    type: "Luncheon",
    date: "15 May 2026",
    location: "Kampala, Uganda",
    slug: "/events/cyber-luncheon",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop",
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Traverse Events</p>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05]"
            >
              Where leaders <span style={{ color: "#ff4c00" }}>connect</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              className="mt-6 max-w-lg text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Luncheons, conferences, hackathons, and workshops -- curated for East Africa&apos;s cybersecurity decision-makers.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Event Type Filter Tabs */}
      <section style={{ background: "#f0f1f4", borderBottom: "1px solid rgba(0,0,0,0.1)" }} className="relative overflow-hidden">
        <div className="container-max relative z-10 px-6 lg:px-8 py-6">
          <div className="flex overflow-x-auto gap-2 pb-2 -mx-2 px-2">
            {eventTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`shrink-0 px-5 py-2 min-h-11 text-sm font-semibold cursor-pointer ${
                  activeType === type
                    ? "bg-accent text-white shadow-sm"
                    : "bg-white border text-brand-medium/60"
                }`}
                style={{ borderRadius: 999, transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)", borderColor: activeType === type ? "transparent" : "rgba(0,0,0,0.1)" }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section style={{ background: "#f0f1f4", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
        <div className="container-max relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Upcoming</p>
          </motion.div>

          {upcomingEvents.map((ev) => (
            <SectionReveal key={ev.slug} variant="clip-inset">
              <Link
                href={ev.slug}
                className="group block overflow-hidden border bg-white"
                style={{ borderRadius: 16, borderColor: "rgba(0,0,0,0.1)", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1), 0 2px 2px 0 rgba(0,0,0,0.15), 0 1px 0 0 rgba(0,0,0,0.05)" }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative aspect-video md:aspect-auto md:min-h-90 overflow-hidden">
                    <Image
                      src={ev.image}
                      alt={ev.title}
                      fill
                      className="object-cover"
                      style={{ transition: "transform 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-transparent to-white/80 hidden md:block" />
                    <div className="absolute inset-0 bg-linear-to-t from-white to-transparent md:hidden" />
                    {ev.featured && (
                      <span className="absolute left-4 top-4 bg-accent px-4 py-1.5 text-xs font-semibold text-white shadow-lg" style={{ borderRadius: 999 }}>
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">
                      {ev.type}
                    </span>
                    <h3 className="mt-3 font-display text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "#000" }}>
                      {ev.title}
                    </h3>
                    <p className="mt-3" style={{ color: "#515459" }}>
                      An intimate, curated lunch for East Africa&apos;s cybersecurity leaders. 30 seats. Real conversations, no sales pitches.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm" style={{ color: "#919499" }}>
                      <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{ev.date}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{ev.location}</span>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-accent" style={{ transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
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
      <section style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
        <SectionReveal variant="fade-up" staggerChildren={0.12} className="container-max relative z-10 max-w-4xl mx-auto grid grid-cols-1 gap-5 md:grid-cols-2">
          {[
            { icon: Mic, title: "Speak at Our Events", desc: "Share your expertise with East Africa's cybersecurity community.", img: "https://images.unsplash.com/photo-1475721027785-f749ce072e32?q=80&w=2070&auto=format&fit=crop" },
            { icon: Users, title: "Sponsor an Event", desc: "Put your brand in front of top cybersecurity decision-makers.", img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop" },
          ].map((c) => (
            <RevealItem key={c.title} variant="scale-fade">
              <div className="group overflow-hidden border bg-white" style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1), 0 2px 2px 0 rgba(0,0,0,0.15), 0 1px 0 0 rgba(0,0,0,0.05)" }}>
                <div className="relative h-40 overflow-hidden">
                  <Image src={c.img} alt="" fill className="object-cover" />
                  <div className="absolute inset-0 bg-linear-to-b from-transparent to-white" />
                  <div className="absolute bottom-4 left-4">
                    <div className="flex h-10 w-10 items-center justify-center bg-accent/10" style={{ borderRadius: 8 }}>
                      <c.icon className="h-5 w-5 text-accent" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold" style={{ color: "#000" }}>{c.title}</h3>
                  <p className="mt-2 text-sm" style={{ color: "#515459" }}>{c.desc}</p>
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
      <section style={{ background: "#f0f1f4", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
        <div className="container-max relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Past Events</p>
          </motion.div>

          <TextReveal
            as="h2"
            variant="fade-up"
            className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000" }}
          >
            Past Events
          </TextReveal>

          <SectionReveal variant="scale-fade" delay={0.15}>
            <div className="mt-10 border-2 border-dashed py-16 max-w-2xl mx-auto" style={{ borderRadius: 16, borderColor: "rgba(0,0,0,0.1)" }}>
              <Clock className="mx-auto h-10 w-10 mb-4" style={{ color: "#919499" }} />
              <p className="text-lg font-semibold" style={{ color: "#000" }}>No past events yet</p>
              <p className="mt-2 max-w-md mx-auto" style={{ color: "#515459" }}>
                Our first Cyber Luncheon is coming May 2026. Stay tuned for recaps and highlights after each event.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}
