import type { Metadata } from "next";
import Image from "next/image";
import { SecurityHero } from "@/components/security/Hero";
import { ServiceCards } from "@/components/security/ServiceCards";
import { EngagementProcess } from "@/components/security/EngagementProcess";
import { ComplianceFrameworks } from "@/components/security/ComplianceFrameworks";
import { SelfAssessment } from "@/components/security/SelfAssessment";
import { EnquiryForm } from "@/components/security/EnquiryForm";
import { CapabilityDownload } from "@/components/security/CapabilityDownload";
import { Button } from "@/components/ui/Button";
import { Check, ArrowRight, Award, MessageCircle } from "lucide-react";
import { PageTransition } from "@/components/ui/PageTransition";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";

export const metadata: Metadata = {
  title: "Traverse Security — Cybersecurity for Banks & Government",
  description:
    "Cybersecurity services for East African institutions. Penetration testing, ISO 27001, Bank of Uganda audits, threat modelling, incident response, and regulatory advisory.",
};

const WHATSAPP_NUMBER = "256700000000";
const WHATSAPP_MESSAGE = "Hello Traverse Security, I'd like to enquire about your cybersecurity services.";

export default function SecurityPage() {
  return (
    <PageTransition>
      <SecurityHero />
      <ServiceCards />

      {/* Why Choose Us */}
      <section className="relative bg-primary section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-emerald/5 blur-[120px]" />

        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <SectionReveal variant="clip-left">
              <div>
                <SectionReveal variant="fade-blur" delay={0.1}>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-4 py-1.5 mb-6">
                    <div className="h-1 w-1 rounded-full bg-accent" />
                    <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/55">
                      Why Traverse
                    </span>
                  </div>
                </SectionReveal>

                <TextReveal
                  as="h2"
                  variant="blur-in"
                  className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight"
                >
                  Why choose a local cybersecurity partner
                </TextReveal>

                <SectionReveal variant="fade-up" delay={0.15}>
                  <p className="mt-5 text-base leading-relaxed text-white/50">
                    East African institutions face unique regulatory requirements
                    and threat landscapes. We combine deep local knowledge of
                    Bank of Uganda mandates and Uganda PDPA with international
                    security standards.
                  </p>
                </SectionReveal>

                <SectionReveal variant="fade-up" staggerChildren={0.1} as="div">
                  <ul className="mt-8 space-y-4">
                    {[
                      "Local expertise — we understand Bank of Uganda requirements and Uganda PDPA firsthand",
                      "On-the-ground response — our team is based in Kampala, not flying in from overseas",
                      "Integrated intelligence — our Think Tank research feeds directly into assessments",
                      "Confidentiality-first — strict NDAs and international ethical standards",
                    ].map((point) => (
                      <RevealItem key={point} variant="slide-up">
                        <li className="flex items-start gap-3">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                          <span className="text-sm text-white/55">{point}</span>
                        </li>
                      </RevealItem>
                    ))}
                  </ul>
                </SectionReveal>

                <SectionReveal variant="fade-up" delay={0.4}>
                  <div className="mt-10">
                    <Button variant="primary" size="lg" href="#enquiry">
                      Request Consultation
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </SectionReveal>
              </div>
            </SectionReveal>

            <SectionReveal variant="clip-inset" delay={0.2}>
              <div className="relative aspect-4/3 min-h-80 overflow-hidden rounded-3xl">
                <Image
                  src="/cyber/cyber_image_13.jpg"
                  alt="Team working on cybersecurity in an office"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/40 to-transparent" />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <EngagementProcess />
      <ComplianceFrameworks />

      {/* Self Assessment */}
      <section className="relative bg-primary section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/3 translate-y-1/3 rounded-full bg-accent/5 blur-[120px]" />

        <div className="container-max relative z-10">
          <div className="text-center mb-14">
            <SectionReveal variant="fade-blur">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-4 py-1.5 mb-5">
                <div className="h-1 w-1 rounded-full bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/55">
                  Self Assessment
                </span>
              </div>
            </SectionReveal>
            <TextReveal
              as="h2"
              variant="fade-up"
              className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight"
            >
              How secure is your organisation?
            </TextReveal>
            <SectionReveal variant="fade-up" delay={0.15}>
              <p className="mt-3 text-white/50 max-w-xl mx-auto">
                Answer five quick questions to get an instant assessment of your cybersecurity posture.
              </p>
            </SectionReveal>
          </div>

          <SelfAssessment />
        </div>
      </section>

      {/* Certifications & Memberships */}
      <section className="relative bg-white section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid-light opacity-30 pointer-events-none" />

        <div className="container-max relative z-10 text-center">
          <SectionReveal variant="fade-blur">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">
                Certifications
              </span>
            </div>
          </SectionReveal>

          <TextReveal
            as="h2"
            variant="clip-up"
            className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight"
          >
            Certifications &amp; Memberships
          </TextReveal>

          <SectionReveal variant="scale-fade" delay={0.15}>
            <div className="mt-10 rounded-3xl border-2 border-dashed border-border-light py-16 max-w-2xl mx-auto">
              <Award className="mx-auto h-10 w-10 text-brand-muted/30 mb-4" />
              <p className="text-lg font-semibold text-primary">Coming Soon</p>
              <p className="mt-2 text-brand-medium/60 max-w-md mx-auto">
                Certifications will be displayed here as they are obtained.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      <CapabilityDownload />

      {/* Enquiry with WhatsApp */}
      <section id="enquiry" className="relative bg-surface-elevated section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid-light opacity-40 pointer-events-none" />

        <div className="container-max relative z-10">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <SectionReveal variant="clip-left" className="max-w-xl text-center lg:text-left">
              <SectionReveal variant="fade-blur" delay={0.1}>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
                  <div className="h-1 w-1 rounded-full bg-accent" />
                  <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">
                    Quick Enquiry
                  </span>
                </div>
              </SectionReveal>
              <TextReveal
                as="h2"
                variant="slide-up"
                className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight"
              >
                Prefer to chat directly?
              </TextReveal>
              <SectionReveal variant="fade-up" delay={0.15}>
                <p className="mt-4 text-brand-medium/60">
                  Reach our security team instantly on WhatsApp for a quick conversation about your needs.
                </p>
              </SectionReveal>
              <SectionReveal variant="fade-up" delay={0.25}>
                <div className="mt-8">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-2xl bg-[#25D366] px-8 py-4 text-base font-semibold text-white transition-all hover:bg-[#1da851] hover:shadow-md active:scale-[0.98]"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                </div>
              </SectionReveal>
            </SectionReveal>

            <SectionReveal variant="slide-up" delay={0.2} className="w-full max-w-md">
              <EnquiryForm />
            </SectionReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
