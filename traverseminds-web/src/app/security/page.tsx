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

export const metadata: Metadata = {
  title: "Traverse Security — Cybersecurity for Banks & Government",
  description:
    "Cybersecurity services for East African institutions. Penetration testing, ISO 27001, Bank of Uganda audits, threat modelling, incident response, and regulatory advisory.",
};

const WHATSAPP_NUMBER = "256700000000";
const WHATSAPP_MESSAGE = "Hello Traverse Security, I'd like to enquire about your cybersecurity services.";

export default function SecurityPage() {
  return (
    <>
      <SecurityHero />
      <ServiceCards />

      {/* Why Choose Us */}
      <section className="relative bg-primary section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-emerald/5 blur-[120px]" />

        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-4 py-1.5 mb-6">
                <div className="h-1 w-1 rounded-full bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/55">
                  Why Traverse
                </span>
              </div>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
                Why choose a local cybersecurity partner
              </h2>

              <p className="mt-5 text-base leading-relaxed text-white/50">
                East African institutions face unique regulatory requirements
                and threat landscapes. We combine deep local knowledge of
                Bank of Uganda mandates and Uganda PDPA with international
                security standards.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "Local expertise — we understand Bank of Uganda requirements and Uganda PDPA firsthand",
                  "On-the-ground response — our team is based in Kampala, not flying in from overseas",
                  "Integrated intelligence — our Think Tank research feeds directly into assessments",
                  "Confidentiality-first — strict NDAs and international ethical standards",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                    <span className="text-sm text-white/55">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Button variant="primary" size="lg" href="#enquiry">
                  Request Consultation
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="relative aspect-4/3 min-h-80 overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80"
                alt="Team working on cybersecurity in an office"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/40 to-transparent" />
            </div>
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
            <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-4 py-1.5 mb-5">
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/55">
                Self Assessment
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
              How secure is your organisation?
            </h2>
            <p className="mt-3 text-white/50 max-w-xl mx-auto">
              Answer five quick questions to get an instant assessment of your cybersecurity posture.
            </p>
          </div>

          <SelfAssessment />
        </div>
      </section>

      {/* Certifications & Memberships */}
      <section className="relative bg-white section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid-light opacity-30 pointer-events-none" />

        <div className="container-max relative z-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
            <div className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">
              Certifications
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
            Certifications & Memberships
          </h2>

          <div className="mt-10 rounded-3xl border-2 border-dashed border-border-light py-16 max-w-2xl mx-auto">
            <Award className="mx-auto h-10 w-10 text-brand-muted/30 mb-4" />
            <p className="text-lg font-semibold text-primary">Coming Soon</p>
            <p className="mt-2 text-brand-medium/60 max-w-md mx-auto">
              Certifications will be displayed here as they are obtained.
            </p>
          </div>
        </div>
      </section>

      <CapabilityDownload />

      {/* Enquiry with WhatsApp */}
      <section id="enquiry" className="relative bg-surface-elevated section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid-light opacity-40 pointer-events-none" />

        <div className="container-max relative z-10">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
                <div className="h-1 w-1 rounded-full bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">
                  Quick Enquiry
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
                Prefer to chat directly?
              </h2>
              <p className="mt-4 text-brand-medium/60">
                Reach our security team instantly on WhatsApp for a quick conversation about your needs.
              </p>
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
            </div>

            <div className="w-full max-w-md">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
