"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CountdownTimer } from "@/components/events/CountdownTimer";
import { Button } from "@/components/ui/Button";
import { Calendar, MapPin, Ticket, ArrowRight, Users, ShieldCheck } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { FloatingOrbs } from "@/components/ui/FloatingOrbs";
import { MouseGlow } from "@/components/ui/MouseGlow";

const EVENT_DATE = "2026-05-15T12:00:00+03:00";

const highlights = [
  { icon: Users, text: "30 Seats Only" },
  { icon: ShieldCheck, text: "Chatham House Rule" },
];

export function UpcomingEvent() {
  return (
    <section className="relative overflow-hidden section-padding">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/cyber/cyber_image_25.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/88" />
      </div>
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 h-100 w-100 translate-x-1/3 -translate-y-1/3 rounded-full bg-accent/8 blur-[140px]" />
      <FloatingOrbs variant="mixed" />
      <MouseGlow color="249, 115, 22" size={500} intensity={0.06} />

      <div className="container-max relative z-10">
        {/* Centered header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 mb-6"
          >
            <Ticket className="h-3 w-3 text-accent" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
              Exclusive Event
            </span>
          </motion.div>

          <TextReveal
            as="h2"
            variant="blur-in"
            staggerSpeed={0.06}
            delay={0.1}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05]"
          >
            Cyber Luncheon Kampala
          </TextReveal>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-5 text-base md:text-lg text-white/60 leading-relaxed max-w-xl mx-auto"
          >
            An intimate executive lunch for East Africa&apos;s CISO and policy leaders.
          </motion.p>

          {/* Highlight pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            {highlights.map((h) => (
              <div
                key={h.text}
                className="flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-4 py-2 backdrop-blur-sm transition-all duration-500 hover:border-accent/20 hover:bg-accent/8"
              >
                <h.icon className="h-3.5 w-3.5 text-accent" />
                <span className="text-xs font-semibold text-white/70">{h.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Card — 3 columns: Date/Venue | Countdown | CTA */}
        <SectionReveal
          variant="clip-inset"
          delay={0.25}
          className="overflow-hidden rounded-3xl border border-white/8 bg-surface-dark-elevated hover-glow-accent transition-all duration-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Left — Date & Venue */}
            <div className="p-8 md:p-10 flex flex-col justify-center gap-5 border-b md:border-b-0 md:border-r border-white/6">
              {[
                { icon: Calendar, label: "Date", value: "15 May 2026" },
                { icon: MapPin, label: "Venue", value: "Kampala, Uganda" },
              ].map((info) => (
                <div key={info.label} className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 transition-all duration-500 hover:bg-accent/20 hover:scale-105">
                    <info.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-white/40 font-semibold">
                      {info.label}
                    </span>
                    <span className="text-base font-bold text-white font-mono">
                      {info.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Center — Countdown */}
            <div className="p-8 md:p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/6">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-6">
                Registration Closes In
              </p>
              <CountdownTimer targetDate={EVENT_DATE} />
            </div>

            {/* Right — CTA */}
            <div className="p-8 md:p-10 flex flex-col items-center justify-center">
              <div className="w-full max-w-xs">
                <Button
                  variant="primary"
                  size="lg"
                  href="/events/cyber-luncheon"
                  className="w-full justify-center"
                >
                  Reserve Your Seat
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="mt-4 text-center text-[11px] text-white/30">
                  *Vetting required for attendance.
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
