"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  ScanEye, 
  ShieldCheck, 
  FileCheck2, 
  AlertTriangle, 
  Siren, 
  Scale, 
  ArrowRight,
  LucideIcon 
} from "lucide-react";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";

const ICON_MAP: Record<string, LucideIcon> = {
  "penetration-testing": ScanEye,
  "iso-27001-compliance": ShieldCheck,
  "bank-of-uganda-audit": FileCheck2,
  "threat-modelling": AlertTriangle,
  "incident-response": Siren,
  "regulatory-advisory": Scale,
};


/** Service cards; the services and their images are edited in Sanity. */
export function ServiceCards({ services }: { services: { title: string; slug: string; description: string; image: string }[] }) {
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
          className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
          margin="-50px"
        >
          {services.map((svc) => {
            const Icon = ICON_MAP[svc.slug] || ShieldCheck;
            return (
              <RevealItem
                key={svc.title}
                variant="scale-fade"
              >
                <Link href={`/security/${svc.slug}`} className="group flex h-full flex-col">
                  <div className="relative overflow-hidden h-56" style={{ borderRadius: 0 }}>
                    <Image src={svc.image} alt={svc.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <Icon className="h-5 w-5 shrink-0 text-accent" />
                    <h3 className="font-display text-lg font-bold" style={{ color: "#000" }}>
                      {svc.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed flex-1" style={{ color: "#515459" }}>{svc.description}</p>

                  <div className="mt-3 flex items-center gap-2 text-xs font-semibold" style={{ color: "#212429" }}>
                    <span className="group-hover:text-accent transition-colors">Learn more</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </SectionReveal>
      </div>
    </section>
  );
}
