import type { Metadata } from "next";
import Image from "next/image";
import { SecurityHero } from "@/components/security/Hero";
import { ServiceCards } from "@/components/security/ServiceCards";
import { EngagementProcess } from "@/components/security/EngagementProcess";
import { ComplianceFrameworks } from "@/components/security/ComplianceFrameworks";
import { EnquiryForm } from "@/components/security/EnquiryForm";
import { CapabilityDownload } from "@/components/security/CapabilityDownload";
import { Button } from "@/components/ui/Button";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Traverse Security — Cybersecurity for Banks & Government",
  description:
    "Cybersecurity services for East African institutions. Penetration testing, ISO 27001, Bank of Uganda audits, threat modelling, incident response, and regulatory advisory.",
};

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
                <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/40">
                  Why Traverse
                </span>
              </div>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
                Why choose a local cybersecurity partner
              </h2>

              <p className="mt-5 text-base leading-relaxed text-white/35">
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
                    <span className="text-sm text-white/40">{point}</span>
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
      <CapabilityDownload />
      <EnquiryForm />
    </>
  );
}
