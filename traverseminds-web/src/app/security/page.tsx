import type { Metadata } from "next";
import Image from "next/image";
import { SectionBar } from "@/components/magazine/SectionBar";
import { PageHeader } from "@/components/magazine/PageHeader";
import { ServiceCards } from "@/components/security/ServiceCards";
import { getServices, getSiteSettings } from "@/lib/cms";
import { EngagementProcess } from "@/components/security/EngagementProcess";
import { ComplianceFrameworks } from "@/components/security/ComplianceFrameworks";
import { SelfAssessment } from "@/components/security/SelfAssessment";
import { EnquiryForm } from "@/components/security/EnquiryForm";
import { CapabilityDownload } from "@/components/security/CapabilityDownload";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { PageTransition } from "@/components/ui/PageTransition";
import { SectionHeader } from "@/components/magazine/primitives";
import { ThreatWatch } from "@/components/security/ThreatWatch";
import { getThreatWatch } from "@/lib/cisa";
import { CitedStats } from "@/components/ui/CitedStats";
import { getStatistics } from "@/lib/statistics";

export const metadata: Metadata = {
  title: "Traverse Security | Cybersecurity for Banks & Government",
  description:
    "Cybersecurity services for African institutions. Penetration testing, ISO 27001, Bank of Uganda audits, threat modelling, incident response, and regulatory advisory.",
};

const WHATSAPP_NUMBER = "+256775692334";
const WHATSAPP_MESSAGE = "Hello Traverse Security, I'd like to enquire about your cybersecurity services.";

const REASONS = [
  { title: "Local expertise", desc: "We understand Bank of Uganda requirements and Uganda's data protection law first-hand." },
  { title: "On-the-ground response", desc: "Our team is based in Kampala, not flying in from overseas." },
  { title: "Integrated intelligence", desc: "Our Think Tank research feeds directly into assessments." },
  { title: "Confidentiality first", desc: "Strict NDAs and international ethical standards." },
];

export default async function SecurityPage() {
  const [threatWatch, stats, services, settings] = await Promise.all([getThreatWatch(), getStatistics("security", 4), getServices(), getSiteSettings()]);
  return (
    <PageTransition>
      <SectionBar />
      <PageHeader
        crumbs={[{ name: "Home", href: "/" }, { name: "Security", href: "/security" }]}
        kicker="Traverse Security"
        title="Cybersecurity for banks and government in Africa"
        dek="Penetration testing, ISO 27001 compliance, Bank of Uganda audits, threat modelling, incident response and regulatory advisory, from a Kampala-based team."
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="primary" href="#enquiry">Request a consultation</Button>
          <Button variant="outline" href="#capability">Capability statement</Button>
        </div>
      </PageHeader>
      <ServiceCards services={services} />

      {/* Why a local partner */}
      <section className="relative overflow-hidden bg-bg-dark text-white">
        <div className="tech-grid-dark absolute inset-0" aria-hidden />
        <div className="container-max relative py-14 lg:py-20">
          <SectionHeader title="Why Traverse" dark />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1]">Why choose a local cybersecurity partner.</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-white/65">
                African institutions face unique regulatory requirements and threat landscapes. We combine deep local knowledge of Bank of
                Uganda mandates and Uganda&apos;s data protection law with international security standards.
              </p>
              <div className="relative mt-8 hidden aspect-[16/10] overflow-hidden bg-white/5 lg:block">
                <Image src={settings.securityImage} alt="The Traverse Security team at work" fill className="object-cover" sizes="40vw" />
              </div>
            </div>
            <div>
              <ol className="border-t-2 border-white/80">
                {REASONS.map((r, i) => (
                  <li key={r.title} className="grid grid-cols-[48px_1fr] border-b border-white/15 py-6 sm:grid-cols-[64px_1fr]">
                    <span className="font-mono text-[28px] font-semibold leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-serif text-[22px] font-semibold">{r.title}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-white/65">{r.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-8">
                <Button variant="primary" size="lg" href="#enquiry">
                  Request a consultation
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EngagementProcess />
      <ComplianceFrameworks />
      {threatWatch && <ThreatWatch data={threatWatch} />}
      <CitedStats stats={stats} eyebrow="Closer To Home" title="Cybercrime in Uganda" />

      {/* Self-assessment */}
      <section className="relative overflow-hidden bg-bg-dark text-white">
        <div className="tech-grid-dark absolute inset-0" aria-hidden />
        <div className="container-max relative py-14 lg:py-20">
          <SectionHeader title="Self-assessment" dark />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1]">How secure is your organisation?</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-white/65">
                Answer five quick questions to get an instant read on your cybersecurity posture and a recommended next step.
              </p>
            </div>
            <SelfAssessment />
          </div>
        </div>
      </section>

      <CapabilityDownload />

      {/* Enquiry */}
      <section id="enquiry" className="scroll-mt-24 bg-bg-light">
        <div className="container-max py-14 lg:py-20">
          <SectionHeader title="Enquiry" />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <div>
              <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] text-black">Talk to our security team.</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-gn-400">
                Send an enquiry and we will respond within one working day, or reach the team straight away on WhatsApp.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 border border-black/15 bg-white px-6 py-4 text-[15px] font-semibold text-black transition-colors hover:border-[#25D366]"
              >
                <MessageCircle className="h-5 w-5 text-[#128C7E]" aria-hidden />
                Chat on WhatsApp
              </a>
            </div>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
