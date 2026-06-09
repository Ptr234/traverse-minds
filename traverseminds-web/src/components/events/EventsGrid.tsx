"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Clock, Tag } from "lucide-react";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";

export interface SanityEvent {
  _id: string;
  title: string;
  slug: string;
  type?: string;
  date: string;
  location?: string;
  isFeatured?: boolean;
  isPast?: boolean;
  thumbnailUrl?: string;
  tagline?: string;
  price?: string;
  capacity?: number;
}

const eventTypes = ["All", "Conference", "Luncheon", "Hackathon", "Workshop"] as const;

function EventCard({ ev }: { ev: SanityEvent }) {
  return (
    <Link
      href={`/events/${ev.slug}`}
      className="group block overflow-hidden border bg-white"
      style={{ borderRadius: 16, borderColor: "rgba(0,0,0,0.1)", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1), 0 2px 2px 0 rgba(0,0,0,0.15), 0 1px 0 0 rgba(0,0,0,0.05)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-video md:aspect-auto md:min-h-90 overflow-hidden">
          {ev.thumbnailUrl ? (
            <Image
              src={ev.thumbnailUrl}
              alt={ev.title}
              fill
              className="object-cover"
              style={{ transition: "transform 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
          )}
          <div className="absolute inset-0 bg-linear-to-r from-transparent to-white/80 hidden md:block" />
          <div className="absolute inset-0 bg-linear-to-t from-white to-transparent md:hidden" />
          {ev.isFeatured && (
            <span className="absolute left-4 top-4 bg-accent px-4 py-1.5 text-xs font-semibold text-white shadow-lg" style={{ borderRadius: 999 }}>
              Featured
            </span>
          )}
        </div>
        <div className="flex flex-col justify-center p-8 md:p-12">
          {ev.type && (
            <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">
              {ev.type}
            </span>
          )}
          <h3 className="mt-3 font-display text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "#000" }}>
            {ev.title}
          </h3>
          {ev.tagline && (
            <p className="mt-3" style={{ color: "#515459" }}>{ev.tagline}</p>
          )}
          <div className="mt-4 flex flex-wrap gap-4 text-sm" style={{ color: "#919499" }}>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(ev.date).toLocaleDateString("en-UG", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            {ev.location && (
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{ev.location}</span>
            )}
            {ev.price && (
              <span className="flex items-center gap-1.5"><Tag className="h-4 w-4" />{ev.price}</span>
            )}
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-accent" style={{ transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
            View Details & RSVP <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function EventsGrid({ events }: { events: SanityEvent[] }) {
  const [activeType, setActiveType] = useState<string>("All");

  const upcoming = events.filter((e) => !e.isPast);
  const past = events.filter((e) => e.isPast);

  const filteredUpcoming = activeType === "All"
    ? upcoming
    : upcoming.filter((e) => e.type?.toLowerCase() === activeType.toLowerCase());

  return (
    <>
      {/* Filter Tabs */}
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

      {/* Upcoming Events */}
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

          {filteredUpcoming.length === 0 ? (
            <div className="border-2 border-dashed py-16 max-w-2xl mx-auto text-center" style={{ borderRadius: 16, borderColor: "rgba(0,0,0,0.1)" }}>
              <p className="text-lg font-semibold" style={{ color: "#000" }}>No upcoming events</p>
              <p className="mt-2" style={{ color: "#515459" }}>Check back soon for new events.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {filteredUpcoming.map((ev) => (
                <SectionReveal key={ev._id} variant="clip-inset">
                  <EventCard ev={ev} />
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Past Events */}
      <section style={{ background: "#f0f1f4", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
        <div className="container-max relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Past Events</p>
          </motion.div>

          {past.length === 0 ? (
            <SectionReveal variant="scale-fade" delay={0.15}>
              <div className="border-2 border-dashed py-16 max-w-2xl mx-auto text-center" style={{ borderRadius: 16, borderColor: "rgba(0,0,0,0.1)" }}>
                <Clock className="mx-auto h-10 w-10 mb-4" style={{ color: "#919499" }} />
                <p className="text-lg font-semibold" style={{ color: "#000" }}>No past events yet</p>
                <p className="mt-2 max-w-md mx-auto" style={{ color: "#515459" }}>
                  Stay tuned for recaps and highlights after each event.
                </p>
              </div>
            </SectionReveal>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((ev) => (
                <RevealItem key={ev._id} variant="scale-fade">
                  <Link href={`/events/${ev.slug}`} className="group block overflow-hidden border bg-white" style={{ borderRadius: 12, borderColor: "rgba(0,0,0,0.1)" }}>
                    <div className="relative aspect-video overflow-hidden">
                      {ev.thumbnailUrl
                        ? <Image src={ev.thumbnailUrl} alt={ev.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                        : <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
                      }
                    </div>
                    <div className="p-5">
                      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#ff4c00" }}>{ev.type}</span>
                      <h3 className="mt-1 font-semibold" style={{ color: "#000" }}>{ev.title}</h3>
                      <p className="mt-2 text-sm flex items-center gap-1.5" style={{ color: "#919499" }}>
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(ev.date).toLocaleDateString("en-UG", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                  </Link>
                </RevealItem>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
