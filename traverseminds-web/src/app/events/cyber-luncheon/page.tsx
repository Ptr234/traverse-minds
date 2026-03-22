import type { Metadata } from "next";
import Image from "next/image";
import { CountdownTimer } from "@/components/events/CountdownTimer";
import { RsvpForm } from "@/components/events/RsvpForm";
import { Button } from "@/components/ui/Button";
import { Particles } from "@/components/ui/Particles";
import { PageTransition } from "@/components/ui/PageTransition";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { MapPin, Calendar, Users, Utensils } from "lucide-react";

export const metadata: Metadata = {
  title: "Cyber Luncheon Kampala — Traverse Events",
  description: "An intimate lunch discussion about cyber threats facing East African institutions.",
};

const EVENT_DATE = "2026-05-15T12:00:00+03:00";
const EVENT_TITLE = "Cyber Luncheon Kampala — May 2026";

export default function CyberLuncheonPage() {
  return (
    <PageTransition>
      {/* Hero with bg image */}
      <section className="relative min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/cyber/cyber_image_25.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-light-surface/60 via-transparent to-light-surface/80" />
        </div>
        <Particles />
        <div className="relative mx-auto flex min-h-[80vh] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl py-20 lg:py-28">
            <div className="hero-bar" />
            <SectionReveal variant="fade-up" delay={0}>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber">Traverse Events</p>
            </SectionReveal>
            <SectionReveal variant="fade-blur" delay={0.1}>
              <h1 className="font-display text-4xl uppercase leading-[1.1] tracking-tight text-brand-charcoal md:text-5xl lg:text-6xl">
                Cyber Luncheon<br /><span className="text-brand-amber">Kampala</span>
              </h1>
            </SectionReveal>
            <SectionReveal variant="slide-up" delay={0.2}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-brand-medium">
                An intimate, curated lunch for East Africa&apos;s cybersecurity leaders. Real conversations, no sales pitches.
              </p>
            </SectionReveal>
            <SectionReveal variant="scale-fade" delay={0.3}>
              <div className="mt-8"><CountdownTimer targetDate={EVENT_DATE} /></div>
              <div className="mt-8"><Button variant="primary" size="lg" href="#rsvp">Reserve Your Seat</Button></div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="bg-light-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <TextReveal
              as="h2"
              variant="blur-in"
              className="font-display text-2xl text-brand-green md:text-3xl"
            >
              What is the Cyber Luncheon?
            </TextReveal>
            <SectionReveal variant="fade-up" delay={0.1}>
              <p className="mt-4 leading-relaxed text-brand-medium">
                A quarterly, invitation-quality event that brings together CISOs, tech leads, regulators, and founders for structured, off-the-record conversations about real cyber threats.
              </p>
              <p className="mt-4 leading-relaxed text-brand-medium">
                No keynotes. No vendor booths. Just 20–30 decision-makers around a table, sharing what they&apos;re actually seeing.
              </p>
            </SectionReveal>
            <SectionReveal variant="fade-up" staggerChildren={0.1} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: Calendar, label: "Date", val: "15 May 2026, 12:00 PM EAT" },
                { icon: MapPin, label: "Venue", val: "Kampala, Uganda (TBC)" },
                { icon: Users, label: "Capacity", val: "30 seats (curated)" },
                { icon: Utensils, label: "Format", val: "Lunch + structured discussion" },
              ].map((d) => (
                <RevealItem key={d.label} variant="slide-up">
                  <div className="card-hover group flex items-start gap-3 rounded-xl border border-light-border bg-light-card p-4">
                    <d.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
                    <div><p className="text-sm font-semibold text-brand-charcoal">{d.label}</p><p className="text-sm text-brand-medium">{d.val}</p></div>
                  </div>
                </RevealItem>
              ))}
            </SectionReveal>
          </div>
          <SectionReveal variant="clip-left">
            <div className="relative aspect-4/3 overflow-hidden rounded-xl">
              <Image src="/cyber/cyber_image_25.jpg" alt="Professional networking" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Who should attend */}
      <section className="bg-light-surface px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <SectionReveal variant="fade-up">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber">Audience</span>
          </SectionReveal>
          <TextReveal
            as="h2"
            variant="clip-up"
            className="mt-3 font-display text-2xl text-brand-green md:text-3xl"
          >
            Who Should Attend
          </TextReveal>
          <SectionReveal variant="fade-up" staggerChildren={0.06} className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {["CISOs & IT Security Managers", "Bank CTOs & Tech Leads", "Government IT Directors", "Telecom Security Officers", "Data Protection Officers", "Cybersecurity Regulators", "Startup Founders (fintech, healthtech)", "International Development Tech Leads"].map((role) => (
              <RevealItem key={role} variant="scale-fade">
                <div className="flex items-center gap-3 rounded-lg border border-light-border bg-light-card px-4 py-3 text-left">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-brand-amber" />
                  <span className="text-sm text-brand-charcoal">{role}</span>
                </div>
              </RevealItem>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="bg-light-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-xl text-center">
          <SectionReveal variant="slide-up">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber">Register</span>
          </SectionReveal>
          <TextReveal
            as="h2"
            variant="fade-up"
            className="mt-3 font-display text-2xl text-brand-green md:text-3xl"
          >
            Reserve Your Seat
          </TextReveal>
          <SectionReveal variant="mask-wipe" delay={0.1}>
            <p className="mt-3 text-brand-medium">Spaces limited to 30 guests. We&apos;ll confirm within 48 hours.</p>
          </SectionReveal>
          <SectionReveal variant="clip-inset" delay={0.2}>
            <div className="mt-8 text-left"><RsvpForm eventTitle={EVENT_TITLE} /></div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}
