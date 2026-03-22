"use client";

import Image from "next/image";
import { Search, ClipboardCheck, FileText, Wrench } from "lucide-react";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";

const steps = [
  { icon: Search, step: "01", title: "Discovery", description: "We learn your systems, regulatory obligations, and risk appetite through a structured briefing session.", image: "/cyber/cyber_image_07.jpg" },
  { icon: ClipboardCheck, step: "02", title: "Assessment", description: "Our team conducts the agreed testing or audit — penetration tests, compliance reviews, or threat assessments.", image: "/cyber/cyber_image_18.jpg" },
  { icon: FileText, step: "03", title: "Report", description: "You receive a detailed report with findings, risk ratings, evidence, and actionable remediation steps.", image: "/cyber/cyber_image_45.jpg" },
  { icon: Wrench, step: "04", title: "Remediation", description: "We support your team through fixing identified issues and verify each remediation has been implemented correctly.", image: "/cyber/cyber_image_01.jpg" },
];

export function EngagementProcess() {
  return (
    <section className="relative bg-surface-elevated section-padding overflow-hidden">
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <SectionReveal variant="fade-blur">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">How We Work</span>
            </div>
          </SectionReveal>
          <TextReveal
            as="h2"
            variant="slide-up"
            className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight"
          >
            Our four-step engagement process
          </TextReveal>
          <SectionReveal variant="fade-up" delay={0.15}>
            <p className="mt-3 text-brand-medium/60 max-w-xl mx-auto">
              A clear, structured approach — no surprises, no ambiguity.
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
              <div className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated min-h-52">
                <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-primary/80 group-hover:bg-primary/70 transition-colors duration-500" />

                <div className="relative z-10 p-7 flex items-start gap-5">
                  <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-accent transition-all duration-500 group-hover:scale-110">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-display text-2xl font-bold text-accent/40 group-hover:text-accent transition-colors">{item.step}</span>
                    <h3 className="mt-1 font-display text-lg font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{item.description}</p>
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
