"use client";

import Image from "next/image";
import { ScanEye, ShieldCheck, FileCheck2, AlertTriangle, Siren, Scale, ArrowRight } from "lucide-react";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";

const services = [
  { icon: ScanEye, title: "Penetration Testing", description: "Simulated attacks on your networks, applications, and infrastructure to identify vulnerabilities before real attackers do.", image: "https://images.unsplash.com/photo-1562813733-b31f71025d54?q=80&w=2069&auto=format&fit=crop" },
  { icon: ShieldCheck, title: "ISO 27001 Compliance", description: "End-to-end support for achieving and maintaining ISO 27001 certification -- gap analysis, documentation, and audit preparation.", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop" },
  { icon: FileCheck2, title: "Bank of Uganda Audit", description: "Cybersecurity assessments aligned with Bank of Uganda regulatory requirements for supervised financial institutions.", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop" },
  { icon: AlertTriangle, title: "Threat Modelling", description: "Systematic identification of threats to your systems and data, with prioritised mitigation strategies.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?q=80&w=2070&auto=format&fit=crop" },
  { icon: Siren, title: "Incident Response", description: "Rapid containment, investigation, and recovery when a breach occurs. 24-hour response commitment.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" },
  { icon: Scale, title: "Regulatory Advisory", description: "Expert guidance on Uganda PDPA 2019, NIST, and African data protection frameworks.", image: "https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=2069&auto=format&fit=crop" },
];

export function ServiceCards() {
  return (
    <section style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <SectionReveal variant="fade-blur">
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Our Expertise</p>
          </SectionReveal>
          <TextReveal
            as="h2"
            variant="blur-in"
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl mx-auto" style={{ color: "#000" }}
          >
            Robust cybersecurity for today&apos;s threats
          </TextReveal>
          <SectionReveal variant="fade-up" delay={0.15}>
            <p className="mt-4 max-w-2xl mx-auto text-base" style={{ color: "#515459" }}>
              Six core capabilities designed for African banks, government agencies, and enterprises.
            </p>
          </SectionReveal>
        </div>

        <SectionReveal
          variant="fade-up"
          staggerChildren={0.1}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          margin="-50px"
        >
          {services.map((svc) => (
            <RevealItem
              key={svc.title}
              variant="scale-fade"
            >
              <div className="group relative overflow-hidden min-h-70 flex flex-col" style={{ borderRadius: 8, transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
                <Image src={svc.image} alt={svc.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-linear-to-t from-primary/95 via-primary/70 to-primary/40" style={{ transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }} />

                <div className="relative z-10 flex flex-col flex-1 p-7">
                  <div className="flex h-12 w-12 items-center justify-center bg-white/10 text-accent" style={{ borderRadius: 8 }}>
                    <svc.icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold text-white" style={{ transition: "color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
                    {svc.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/45 leading-relaxed flex-1">{svc.description}</p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold" style={{ color: "rgba(255,255,255,0.5)", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
                    <span>Learn more</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}
