"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CountdownTimer } from "@/components/events/CountdownTimer";
import { Button } from "@/components/ui/Button";
import { Calendar, MapPin, ArrowRight, Users, ShieldCheck, Tag } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";
import { SectionReveal } from "@/components/ui/SectionReveal";

export interface SanityUpcomingEvent {
  _id: string;
  title: string;
  slug: string;
  date: string;
  location?: string;
  capacity?: number;
  thumbnailUrl?: string;
  tagline?: string;
  price?: string;
}

const DEFAULT_BG = "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop";
const gnEase = [0.215, 0.61, 0.355, 1] as const;

export function UpcomingEvent({ event }: { event: SanityUpcomingEvent | null }) {
  if (!event) return null;

  const highlights = [
    event.capacity ? { icon: Users, text: `${event.capacity} Seats Only` } : null,
    { icon: ShieldCheck, text: "Chatham House Rule" },
    event.price ? { icon: Tag, text: event.price } : null,
  ].filter(Boolean) as { icon: React.ElementType; text: string }[];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={event.thumbnailUrl || DEFAULT_BG}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "rgba(33,36,41,0.88)" }} />
      </div>

      <div className="relative z-10" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px" }}>
        <div className="text-center" style={{ marginBottom: 48 }}>
          <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Exclusive Event</p>

          <TextReveal
            as="h2"
            variant="fade-up"
            staggerSpeed={0.03}
            delay={0.1}
            className="font-display"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 500, lineHeight: "125%", letterSpacing: "-1.92px", color: "#fff" }}
          >
            {event.title}
          </TextReveal>

          {event.tagline && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.35, ease: gnEase }}
              style={{ marginTop: 16, fontSize: 16, lineHeight: "125%", color: "rgba(255,255,255,0.5)", maxWidth: 500, margin: "16px auto 0" }}
            >
              {event.tagline}
            </motion.p>
          )}

          {highlights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.35, ease: gnEase }}
              className="flex flex-wrap items-center justify-center gap-2"
              style={{ marginTop: 24 }}
            >
              {highlights.map((h) => (
                <div key={h.text} className="flex items-center gap-2" style={{ padding: "8px 12px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 4 }}>
                  <h.icon className="h-3.5 w-3.5" style={{ color: "#ff4c00" }} />
                  <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>{h.text}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        <SectionReveal variant="fade-up" delay={0.25}>
          <div className="editorial-card-dark overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="flex flex-col justify-center gap-5 border-b md:border-b-0 md:border-r" style={{ padding: "32px 40px", borderColor: "rgba(255,255,255,0.08)" }}>
                {[
                  { icon: Calendar, label: "Date", value: new Date(event.date).toLocaleDateString("en-UG", { day: "numeric", month: "long", year: "numeric" }) },
                  event.location ? { icon: MapPin, label: "Venue", value: event.location } : null,
                ].filter(Boolean).map((info) => {
                  const Icon = info!.icon;
                  return (
                    <div key={info!.label} className="flex items-center gap-4">
                      <Icon className="h-5 w-5 shrink-0" style={{ color: "#ff4c00" }} />
                      <div>
                        <span className="block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)" }}>
                          {info!.label}
                        </span>
                        <span className="block font-mono" style={{ fontSize: 16, fontWeight: 500, color: "#fff" }}>
                          {info!.value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r" style={{ padding: "32px 40px", borderColor: "rgba(255,255,255,0.08)" }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>
                  Registration Closes In
                </p>
                <CountdownTimer targetDate={event.date} />
              </div>

              <div className="flex flex-col items-center justify-center" style={{ padding: "32px 40px" }}>
                <div style={{ width: "100%", maxWidth: 260 }}>
                  <Button variant="outline-dark" size="lg" href={`/events/${event.slug}`} className="w-full justify-center">
                    Reserve Your Seat <ArrowRight className="h-4 w-4" />
                  </Button>
                  <p className="text-center" style={{ marginTop: 16, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                    *Vetting required for attendance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
