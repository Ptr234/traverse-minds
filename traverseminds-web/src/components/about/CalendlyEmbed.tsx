"use client";

import { Button } from "@/components/ui/Button";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const CALENDLY_URL = "https://calendly.com/traverseminds/intro";

export function CalendlyEmbed() {
  return (
    <section style={{ background: "#f0f1f4", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
          className="mx-auto max-w-2xl"
        >
          <div className="border bg-white p-10 md:p-14 text-center" style={{ borderRadius: 16, borderColor: "rgba(0,0,0,0.1)", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1), 0 2px 2px 0 rgba(0,0,0,0.15), 0 1px 0 0 rgba(0,0,0,0.05)" }}>
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center bg-accent/10" style={{ borderRadius: 8 }}>
              <Calendar className="h-6 w-6 text-accent" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "#000" }}>
              Book an Intro Call
            </h2>
            <p className="mt-3 max-w-md mx-auto" style={{ color: "#515459" }}>
              Schedule a 30-minute introductory call with our team. No commitment,
              no sales pitch.
            </p>
            <div className="mt-8">
              <Button variant="primary" size="lg" href={CALENDLY_URL}>
                Schedule a Call
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-5 text-xs" style={{ color: "#919499" }}>
              Available Monday-Friday, 9:00 AM - 5:00 PM EAT
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
