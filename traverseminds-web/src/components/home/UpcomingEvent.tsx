"use client";

import { motion } from "framer-motion";
import { CountdownTimer } from "@/components/events/CountdownTimer";
import { Button } from "@/components/ui/Button";
import { Calendar, MapPin } from "lucide-react";

const EVENT_DATE = "2026-05-15T12:00:00+03:00";

export function UpcomingEvent() {
  return (
    <section className="relative overflow-hidden bg-brand-green px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber">
            Next Event
          </span>
          <h2 className="mt-3 font-display text-2xl text-white md:text-3xl lg:text-4xl">
            Cyber Luncheon Kampala
          </h2>
          <p className="mt-3 text-white/70">
            An intimate lunch for East Africa&apos;s cybersecurity leaders. 30 seats. No sales pitches.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> 15 May 2026</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Kampala, Uganda</span>
          </div>

          <div className="mt-8 flex justify-center">
            <CountdownTimer targetDate={EVENT_DATE} />
          </div>

          <div className="mt-8">
            <Button variant="secondary" size="lg" href="/events/cyber-luncheon">
              Reserve Your Seat
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
