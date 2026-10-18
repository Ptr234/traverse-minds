"use client";

import Image from "next/image";
import { Search, ClipboardCheck, FileText, Wrench } from "lucide-react";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";

const steps = [
  { icon: Search, step: "01", title: "Discovery", description: "We learn your systems, regulatory obligations, and risk appetite through a structured briefing session.", image: "/imagestouse/eventslide/stud (3).jpg" },
  { icon: ClipboardCheck, step: "02", title: "Assessment", description: "Our team conducts the agreed testing or audit — penetration tests, compliance reviews, or threat assessments.", image: "/imagestouse/div-cybersecurity.jpeg" },
  { icon: FileText, step: "03", title: "Report", description: "You receive a detailed report with findings, risk ratings, evidence, and actionable remediation steps.", image: "/imagestouse/tec.jpg" },
  { icon: Wrench, step: "04", title: "Remediation", description: "We support your team through fixing identified issues and verify each remediation has been implemented correctly.", image: "/imagestouse/tec (1).jpg" },
];

export function EngagementProcess() {
  return (
    <section style={{ background: "#f0f1f4", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <SectionReveal variant="fade-blur">
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>How We Work</p>
          </SectionReveal>
          <TextReveal
            as="h2"
            variant="slide-up"
            className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000" }}
          >
            Our four-step engagement process
          </TextReveal>
          <SectionReveal variant="fade-up" delay={0.15}>
            <p className="mt-3 max-w-xl mx-auto" style={{ color: "#515459" }}>
              A clear, structured approach — no surprises, no ambiguity.
            </p>
          </SectionReveal>
        </div>

        <SectionReveal
          variant="fade-up"
          staggerChildren={0.12}
          className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2"
          margin="-40px"
        >
          {steps.map((item) => (
            <RevealItem
              key={item.step}
              variant="slide-up"
            >
              <div className="group">
                <div className="relative hidden h-56 overflow-hidden md:block" style={{ borderRadius: 0 }}>
                  <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="mt-5 flex items-start gap-4">
                  <span className="font-display text-2xl font-bold text-accent leading-none">{item.step}</span>
                  <div>
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 shrink-0 text-accent" />
                      <h3 className="font-display text-lg font-bold" style={{ color: "#000" }}>{item.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "#515459" }}>{item.description}</p>
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
