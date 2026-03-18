"use client";

import { motion } from "framer-motion";
import { CountdownTimer } from "@/components/events/CountdownTimer";
import { Button } from "@/components/ui/Button";
import { Calendar, MapPin, Ticket, ArrowRight } from "lucide-react";

const EVENT_DATE = "2026-05-15T12:00:00+03:00";

export function UpcomingEvent() {
  return (
    <section className="relative overflow-hidden bg-primary section-padding">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 h-100 w-100 translate-x-1/3 -translate-y-1/3 rounded-full bg-accent/5 blur-[140px]" />

      <div className="container-max relative z-10">
        <div className="overflow-hidden rounded-3xl border border-white/6 bg-surface-dark-elevated">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Event Info */}
            <div className="p-8 md:p-12 lg:p-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 mb-8">
                  <Ticket className="h-3 w-3 text-accent" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
                    Exclusive Event
                  </span>
                </div>

                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]">
                  Cyber Luncheon{" "}
                  <span className="text-gradient-accent">Kampala</span>
                </h2>

                <p className="mt-5 text-base text-white/50 leading-relaxed max-w-md">
                  An intimate, Chatham House Rule executive lunch for East
                  Africa&apos;s CISO and policy leaders. 30 seats only.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    { icon: Calendar, label: "Date", value: "15 May 2026" },
                    { icon: MapPin, label: "Venue", value: "Kampala, Uganda" },
                  ].map((info) => (
                    <div
                      key={info.label}
                      className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/3 px-4 py-3"
                    >
                      <info.icon className="h-4 w-4 text-accent" />
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-white/25">
                          {info.label}
                        </span>
                        <span className="text-sm font-semibold text-white/80 font-mono">
                          {info.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Countdown */}
            <div className="border-t border-white/6 lg:border-t-0 lg:border-l">
              <motion.div
                className="flex h-full flex-col items-center justify-center p-8 md:p-12"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/60 mb-8">
                  Registration Closes In
                </p>

                <CountdownTimer targetDate={EVENT_DATE} />

                <div className="mt-10 w-full max-w-sm">
                  <Button
                    variant="primary"
                    size="lg"
                    href="/events/cyber-luncheon"
                    className="w-full justify-center"
                  >
                    Reserve Your Seat
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <p className="mt-4 text-center text-[11px] text-white/20">
                    *Vetting required for attendance.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
