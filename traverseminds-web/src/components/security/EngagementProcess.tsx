"use client";

import Image from "next/image";
import { Search, ClipboardCheck, FileText, Wrench } from "lucide-react";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";

const steps = [
  { icon: Search, step: "01", title: "Discovery", description: "We learn your systems, regulatory obligations, and risk appetite through a structured briefing session.", image: "/imagestouse/eventslide/stud (3).jpg" },
  { icon: ClipboardCheck, step: "02", title: "Assessment", description: "Our team conducts the agreed testing or audit -- penetration tests, compliance reviews, or threat assessments.", image: "/imagestouse/div-cybersecurity.jpeg" },
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
              A clear, structured approach -- no surprises, no ambiguity.
            </p>
          </SectionReveal>
        </div>

        <SectionReveal
          variant="fade-up"
          staggerChildren={0.12}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          margin="-40px"
        >
          {steps.map((item) => (
            <RevealItem
              key={item.step}
              variant="slide-up"
            >
              <div className="group relative overflow-hidden min-h-52" style={{ borderRadius: 8, transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
                <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-primary/80" style={{ transition: "background 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }} />

                <div className="relative z-10 p-7 flex items-start gap-5">
                  <div className="shrink-0 flex h-12 w-12 items-center justify-center bg-white/10 text-accent" style={{ borderRadius: 8 }}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-display text-2xl font-bold text-accent/40" style={{ transition: "color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>{item.step}</span>
                    <h3 className="mt-1 font-display text-lg font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item.description}</p>
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
