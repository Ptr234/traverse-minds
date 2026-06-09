
"use client";

import { Mail, MapPin, Clock, Newspaper } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { WhatsAppButton } from "@/components/contact/WhatsAppButton";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { AfricaMap } from "@/components/ui/AfricaMap";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { PageTransition } from "@/components/ui/PageTransition";

const contactHeroImages = [
  "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?q=80&w=2020&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1557426272-fc759fbb7a8d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=2069&auto=format&fit=crop",
];

export default function ContactPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-44 lg:pb-36">
        <ImageSlideshow images={contactHeroImages} overlay="bg-primary/70" />

        <div className="container-max relative z-10 px-6 lg:px-8">
          <div className="max-w-2xl">
            <SectionReveal variant="fade-blur">
              <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Contact</p>
            </SectionReveal>
            <TextReveal
              as="h1"
              variant="slide-up"
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05]"
            >
              Get in touch
            </TextReveal>
            <SectionReveal variant="fade-up" delay={0.3}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Whether you need a security assessment, want to attend an event, or have a research partnership in mind.
              </p>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section style={{ background: "#f0f1f4", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <SectionReveal variant="fade-up" className="lg:col-span-2">
              <div className="border bg-white p-8 pb-12 md:p-10" style={{ borderRadius: 16, borderColor: "rgba(0,0,0,0.1)", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1), 0 2px 2px 0 rgba(0,0,0,0.15), 0 1px 0 0 rgba(0,0,0,0.05)" }}>
                <h2 className="font-display text-2xl font-bold tracking-tight" style={{ color: "#000" }}>
                  Send Us a Message
                </h2>
                <p className="mt-2" style={{ color: "#515459" }}>
                  Fill out the form and we&apos;ll respond within 1 business day.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </SectionReveal>

            <SectionReveal variant="fade-up" staggerChildren={0.1}>
              <div className="space-y-5">
                {/* WhatsApp Card */}
                <RevealItem variant="slide-up">
                  <div className="group overflow-hidden border bg-white" style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
                    <div className="p-6">
                      <h3 className="font-display text-lg font-bold" style={{ color: "#000" }}>Prefer WhatsApp?</h3>
                      <p className="mt-2 text-sm" style={{ color: "#515459" }}>
                        The fastest way to reach us in Africa.
                      </p>
                      <div className="mt-4">
                        <WhatsAppButton />
                      </div>
                    </div>
                  </div>
                </RevealItem>

                {/* Email Card */}
                <RevealItem variant="slide-up">
                  <div className="group border bg-white p-5" style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent/10" style={{ borderRadius: 8 }}>
                        <Mail className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold" style={{ color: "#000" }}>Email</h3>
                        <a
                          href="mailto:traversemindsug@gmail.com"
                          className="mt-0.5 block text-sm text-accent font-medium underline underline-offset-2"
                          style={{ transition: "color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                        >
                          traversemindsug@gmail.com
                        </a>
                        <p className="mt-1 text-xs" style={{ color: "#919499" }}>For formal enquiries and proposals</p>
                      </div>
                    </div>
                  </div>
                </RevealItem>

                {/* Location Card */}
                <RevealItem variant="slide-up">
                  <div className="group border bg-white p-5" style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent/10" style={{ borderRadius: 8 }}>
                        <MapPin className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold" style={{ color: "#000" }}>Location</h3>
                        <p className="mt-0.5 text-sm font-medium" style={{ color: "#313439" }}>Kampala, Uganda</p>
                        <p className="mt-1 text-xs" style={{ color: "#919499" }}>Serving all African countries</p>
                      </div>
                    </div>
                  </div>
                </RevealItem>

                {/* Response Time Card */}
                <RevealItem variant="slide-up">
                  <div className="group border bg-white p-5" style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-emerald/10" style={{ borderRadius: 8 }}>
                        <Clock className="h-5 w-5 text-emerald" />
                      </div>
                      <div>
                        <h3 className="font-semibold" style={{ color: "#000" }}>Response Time</h3>
                        <p className="mt-0.5 text-sm text-emerald font-medium">Within 1 business day</p>
                        <p className="mt-1 text-xs" style={{ color: "#919499" }}>Urgent? Use WhatsApp</p>
                      </div>
                    </div>
                  </div>
                </RevealItem>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* African Coverage Map */}
      <section style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
        <div className="container-max">
          <div className="text-center mb-10">
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Coverage</p>
            <TextReveal
              as="h2"
              variant="fade-up"
              className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000" }}
            >
              Serving Africa
            </TextReveal>
            <p className="mt-3 max-w-lg mx-auto" style={{ color: "#515459" }}>
              Headquartered in Kampala, operating across all African countries.
            </p>
          </div>
          <SectionReveal variant="clip-inset">
            <AfricaMap />
          </SectionReveal>
        </div>
      </section>

      {/* Press & Media Enquiries */}
      <section style={{ background: "#f0f1f4", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
        <div className="container-max relative z-10">
          <div className="mx-auto max-w-2xl">
            <SectionReveal variant="scale-fade">
              <div className="border bg-white p-8 md:p-12 text-center" style={{ borderRadius: 16, borderColor: "rgba(0,0,0,0.1)", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1), 0 2px 2px 0 rgba(0,0,0,0.15), 0 1px 0 0 rgba(0,0,0,0.05)" }}>
                <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Press</p>

                <TextReveal
                  as="h2"
                  variant="blur-in"
                  className="font-display text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "#000" }}
                >
                  Press & Media Enquiries
                </TextReveal>

                <div className="mt-6 flex justify-center">
                  <div className="flex h-14 w-14 items-center justify-center bg-accent/10" style={{ borderRadius: 8 }}>
                    <Newspaper className="h-7 w-7 text-accent" />
                  </div>
                </div>

                <p className="mt-5 text-base leading-relaxed max-w-lg mx-auto" style={{ color: "#515459" }}>
                  For press enquiries, interview requests, or expert commentary:
                </p>

                <div className="mt-6">
                  <a
                    href="mailto:traversemindsug@gmail.com"
                    className="inline-flex items-center gap-2 border border-accent/20 bg-accent/5 px-6 py-3.5 text-base font-semibold text-accent"
                    style={{ borderRadius: 8, transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                  >
                    <Mail className="h-4 w-4" />
                    traversemindsug@gmail.com
                  </a>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

