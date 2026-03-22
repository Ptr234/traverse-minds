"use client";

import Image from "next/image";
import { ScanEye, ShieldCheck, FileCheck2, AlertTriangle, Siren, Scale, ArrowRight } from "lucide-react";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";

const services = [
  { icon: ScanEye, title: "Penetration Testing", description: "Simulated attacks on your networks, applications, and infrastructure to identify vulnerabilities before real attackers do.", image: "/cyber/cyber_image_02.jpg" },
  { icon: ShieldCheck, title: "ISO 27001 Compliance", description: "End-to-end support for achieving and maintaining ISO 27001 certification — gap analysis, documentation, and audit preparation.", image: "/cyber/cyber_image_08.jpg" },
  { icon: FileCheck2, title: "Bank of Uganda Audit", description: "Cybersecurity assessments aligned with Bank of Uganda regulatory requirements for supervised financial institutions.", image: "/cyber/cyber_image_14.jpg" },
  { icon: AlertTriangle, title: "Threat Modelling", description: "Systematic identification of threats to your systems and data, with prioritised mitigation strategies.", image: "/cyber/cyber_image_21.jpg" },
  { icon: Siren, title: "Incident Response", description: "Rapid containment, investigation, and recovery when a breach occurs. 24-hour response commitment.", image: "/cyber/cyber_image_01.jpg" },
  { icon: Scale, title: "Regulatory Advisory", description: "Expert guidance on Uganda PDPA 2019, NIST, and East African data protection frameworks.", image: "/cyber/cyber_image_20.jpg" },
];

export function ServiceCards() {
  return (
    <section className="relative bg-white section-padding overflow-hidden">
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <SectionReveal variant="fade-blur">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">Our Expertise</span>
            </div>
          </SectionReveal>
          <TextReveal
            as="h2"
            variant="blur-in"
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight max-w-3xl mx-auto"
          >
            Robust cybersecurity for today&apos;s threats
          </TextReveal>
          <SectionReveal variant="fade-up" delay={0.15}>
            <p className="mt-4 text-brand-medium/60 max-w-2xl mx-auto text-base">
              Six core capabilities designed for East African banks, government agencies, and enterprises.
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
              <div className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated min-h-70 flex flex-col">
                <Image src={svc.image} alt={svc.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-linear-to-t from-primary/95 via-primary/70 to-primary/40 group-hover:from-primary/90 group-hover:via-primary/60 transition-colors duration-500" />

                <div className="relative z-10 flex flex-col flex-1 p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-accent transition-all duration-500 group-hover:scale-110">
                    <svc.icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold text-white group-hover:text-accent transition-colors duration-300">
                    {svc.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/45 leading-relaxed flex-1">{svc.description}</p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-white/50 transition-all duration-300 group-hover:text-accent group-hover:gap-3">
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
