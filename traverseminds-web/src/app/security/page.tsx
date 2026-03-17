import type { Metadata } from "next";
import Image from "next/image";
import { SecurityHero } from "@/components/security/Hero";
import { ServiceCards } from "@/components/security/ServiceCards";
import { EngagementProcess } from "@/components/security/EngagementProcess";
import { ComplianceFrameworks } from "@/components/security/ComplianceFrameworks";
import { EnquiryForm } from "@/components/security/EnquiryForm";
import { CapabilityDownload } from "@/components/security/CapabilityDownload";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Traverse Security — Cybersecurity for Banks & Government",
  description:
    "Uganda's most trusted cybersecurity partner. Penetration testing, ISO 27001, Bank of Uganda audits, threat modelling, incident response, and regulatory advisory.",
};

export default function SecurityPage() {
  return (
    <>
      <SecurityHero />
      <ServiceCards />

      {/* Why Choose Us */}
      <section className="bg-light-surface px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber">
                Cyber Security Experts
              </span>
              <h2 className="mt-3 font-display text-2xl text-brand-green md:text-3xl">
                Defending East African Institutions With Expertise And Innovation
              </h2>
              <p className="mt-4 leading-relaxed text-brand-medium">
                We provide comprehensive cybersecurity solutions tailored for
                organisations of all sizes. From proactive threat monitoring to
                advanced incident response, our dedicated team keeps your digital
                assets safe and resilient.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Local expertise — we understand Bank of Uganda requirements and Uganda PDPA firsthand",
                  "On-the-ground response — our team is based in Kampala, not flying in from overseas",
                  "Integrated intelligence — our Think Tank research feeds directly into assessments",
                  "Confidentiality-first — strict NDAs and international ethical standards",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
                    <span className="text-brand-medium">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button variant="primary" size="lg" href="#enquiry">
                  Request Consultation
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&q=80"
                alt="Cybersecurity professional"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
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
