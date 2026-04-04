"use client";

import Image from "next/image";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";

const frameworks = [
  { name: "ISO 27001", description: "International information security management standard", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" },
  { name: "Bank of Uganda Guidelines", description: "Cybersecurity requirements for supervised financial institutions", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop" },
  { name: "NIST CSF", description: "US National Institute of Standards and Technology Cybersecurity Framework", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop" },
  { name: "Uganda PDPA 2019", description: "Personal Data Protection Act -- Uganda's data privacy law", image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=2070&auto=format&fit=crop" },
  { name: "PCI DSS", description: "Payment Card Industry Data Security Standard for card processing", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop" },
  { name: "COBIT", description: "IT governance and management framework for enterprise systems", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop" },
];

export function ComplianceFrameworks() {
  return (
    <section style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <SectionReveal variant="fade-blur">
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Compliance</p>
          </SectionReveal>
          <TextReveal
            as="h2"
            variant="clip-up"
            className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000" }}
          >
            Frameworks we support
          </TextReveal>
          <SectionReveal variant="fade-up" delay={0.15}>
            <p className="mt-3 max-w-xl mx-auto" style={{ color: "#515459" }}>
              We assess and audit against the standards that matter most to East African institutions.
            </p>
          </SectionReveal>
        </div>

        <SectionReveal
          variant="fade-up"
          staggerChildren={0.08}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          margin="-40px"
        >
          {frameworks.map((fw) => (
            <RevealItem
              key={fw.name}
              variant="clip-up"
            >
              <div className="group relative overflow-hidden min-h-36" style={{ borderRadius: 8, transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
                <Image src={fw.image} alt={fw.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-primary/80" style={{ transition: "background 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }} />

                <div className="relative z-10 p-6 flex items-start gap-4">
                  <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accent/50" style={{ transition: "background 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }} />
                  <div>
                    <h3 className="font-display font-bold text-white">{fw.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{fw.description}</p>
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
