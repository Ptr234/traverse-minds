"use client";

import { Button } from "@/components/ui/Button";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const CALENDLY_URL = "https://calendly.com/traverseminds/intro";

export function CalendlyEmbed() {
  return (
    <section className="relative bg-surface-elevated section-padding overflow-hidden">
      <div className="absolute inset-0 dot-grid-light opacity-40 pointer-events-none" />

      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <div className="rounded-3xl border border-border-light bg-white p-10 md:p-14 text-center shadow-card">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
              <Calendar className="h-6 w-6 text-accent" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight">
              Book an Intro Call
            </h2>
            <p className="mt-3 text-brand-medium/60 max-w-md mx-auto">
              Schedule a 30-minute introductory call with our team. No commitment,
              no sales pitch.
            </p>
            <div className="mt-8">
              <Button variant="primary" size="lg" href={CALENDLY_URL}>
                Schedule a Call
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-5 text-xs text-brand-muted/50">
              Available Monday–Friday, 9:00 AM – 5:00 PM EAT
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
