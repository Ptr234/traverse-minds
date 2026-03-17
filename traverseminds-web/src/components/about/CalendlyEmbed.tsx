"use client";

import { Button } from "@/components/ui/Button";
import { Calendar } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/traverseminds/intro";

export function CalendlyEmbed() {
  return (
    <section className="bg-light-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border border-light-border bg-light-card p-8 text-center md:p-12">
          <Calendar className="mx-auto h-10 w-10 text-brand-amber" />
          <h2 className="mt-4 font-display text-2xl text-brand-green md:text-3xl">Book an Intro Call</h2>
          <p className="mt-3 text-brand-medium">
            Schedule a 30-minute introductory call with our team. No commitment, no sales pitch.
          </p>
          <div className="mt-8">
            <Button variant="primary" size="lg" href={CALENDLY_URL} className="inline-flex">Schedule a Call</Button>
          </div>
          <p className="mt-4 text-sm text-brand-muted">Available Monday–Friday, 9:00 AM – 5:00 PM EAT</p>
        </div>
      </div>
    </section>
  );
}
