"use client";

import Image from "next/image";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";

const frameworks = [
  { name: "ISO 27001", description: "International information security management standard", image: "/cyber/cyber_image_21.jpg" },
  { name: "Bank of Uganda Guidelines", description: "Cybersecurity requirements for supervised financial institutions", image: "/cyber/cyber_image_14.jpg" },
  { name: "NIST CSF", description: "US National Institute of Standards and Technology Cybersecurity Framework", image: "/cyber/cyber_image_08.jpg" },
  { name: "Uganda PDPA 2019", description: "Personal Data Protection Act — Uganda's data privacy law", image: "/cyber/cyber_image_20.jpg" },
  { name: "PCI DSS", description: "Payment Card Industry Data Security Standard for card processing", image: "/cyber/cyber_image_34.jpg" },
  { name: "COBIT", description: "IT governance and management framework for enterprise systems", image: "/cyber/cyber_image_11.jpg" },
];

export function ComplianceFrameworks() {
  return (
    <section className="relative bg-white section-padding overflow-hidden">
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <SectionReveal variant="fade-blur">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">Compliance</span>
            </div>
          </SectionReveal>
          <TextReveal
            as="h2"
            variant="clip-up"
            className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight"
          >
            Frameworks we support
          </TextReveal>
          <SectionReveal variant="fade-up" delay={0.15}>
            <p className="mt-3 text-brand-medium/60 max-w-xl mx-auto">
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
              <div className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated min-h-36">
                <Image src={fw.image} alt={fw.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-primary/80 group-hover:bg-primary/70 transition-colors duration-500" />

                <div className="relative z-10 p-6 flex items-start gap-4">
                  <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accent/50 group-hover:bg-accent transition-colors" />
                  <div>
                    <h3 className="font-display font-bold text-white">{fw.name}</h3>
                    <p className="mt-1 text-sm text-white/55 leading-relaxed">{fw.description}</p>
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
