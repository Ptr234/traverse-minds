"use client";

import Image from "next/image";
import { SectionBar } from "@/components/magazine/SectionBar";
import { PageHeader } from "@/components/magazine/PageHeader";
import { 
  ScanEye, 
  ShieldCheck, 
  FileCheck2, 
  AlertTriangle, 
  Siren, 
  Scale,

  ArrowRight, 
  MessageCircle, 
  Check,
  LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageTransition } from "@/components/ui/PageTransition";
import { SectionReveal } from "@/components/ui/SectionReveal";

const ICON_MAP: Record<string, LucideIcon> = {
  "Penetration Testing": ScanEye,
  "ISO 27001 Compliance": ShieldCheck,
  "Bank of Uganda Audit": FileCheck2,
  "Threat Modelling": AlertTriangle,
  "Incident Response": Siren,
  "Regulatory Advisory": Scale,
};

interface ServiceDetailLayoutProps {
  title: string;
  description: string;
  image: string;
  content: {
    overview: string;
    features: { title: string; description: string }[];
    benefits: string[];
  };
  /** Extra sections rendered between the service content and the enquiry CTA */
  children?: React.ReactNode;
}

const WHATSAPP_NUMBER = "+256775692334";

export function ServiceDetailLayout({
  title,
  description,
  image,
  content,
  children,
}: ServiceDetailLayoutProps) {
  const WHATSAPP_MESSAGE = `Hello Traverse Security, I'd like to enquire about your ${title} services.`;
  const Icon = ICON_MAP[title] || ShieldCheck;

  return (
    <PageTransition>
      {/* Magazine header + wide photo */}
      <SectionBar />
      <PageHeader
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Security", href: "/security" },
          // Service page slugs match their titles, e.g. "ISO 27001 Compliance" -> /security/iso-27001-compliance
          { name: title, href: `/security/${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}` },
        ]}
        kicker="Traverse Security"
        title={title}
        dek={description}
      >
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button variant="primary" size="lg" href="#enquiry">
            Request a consultation
            <ArrowRight className="h-4 w-4" />
          </Button>
          <span className="inline-flex items-center gap-2 text-[14px] text-gn-400">
            <Icon className="h-5 w-5 text-accent" aria-hidden /> Kampala-based team
          </span>
        </div>
      </PageHeader>
      <figure className="container-max">
        <div className="relative aspect-[21/9] overflow-hidden bg-gn-800">
          <Image src={image} alt={title} fill priority className="object-cover" sizes="(max-width: 1280px) 100vw, 1240px" />
        </div>
      </figure>

      {/* Content Section */}
      <section className="py-24 bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <SectionReveal variant="fade-up">
                <h2 className="font-display text-3xl font-bold mb-6 text-black">Overview</h2>
                <div className="prose prose-lg max-w-none text-black/70">
                  <p>{content.overview}</p>
                </div>
              </SectionReveal>

              <div className="mt-16">
                <h2 className="font-display text-3xl font-bold mb-8 text-black">Key Capabilities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {content.features.map((feature, idx) => (
                    <SectionReveal key={feature.title} variant="fade-up" delay={idx * 0.1}>
                      <div className="p-6 border border-black/5 bg-black/2" style={{ borderRadius: 0 }}>
                        <h3 className="font-display text-lg font-bold mb-3 text-black">{feature.title}</h3>
                        <p className="text-sm text-black/60 leading-relaxed">{feature.description}</p>
                      </div>
                    </SectionReveal>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <SectionReveal variant="clip-inset">
                  <div className="bg-primary p-8 md:p-10 text-white" style={{ borderRadius: 0 }}>
                    <h3 className="font-display text-2xl font-bold mb-6">Why Traverse?</h3>
                    <ul className="space-y-4">
                      {content.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                          <span className="text-white/80">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-10 pt-10 border-t border-white/10">
                      <p className="text-sm text-white/50 mb-6">
                        Ready to secure your infrastructure? Speak with our security experts today.
                      </p>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 bg-[#25D366] px-6 py-4 text-base font-semibold text-white transition-transform active:scale-[0.98]"
                        style={{ borderRadius: 0 }}
                      >
                        <MessageCircle className="h-5 w-5" />
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                </SectionReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {children}

      {/* CTA Section */}
      <section id="enquiry" className="py-24 bg-[#f0f1f4]">
        <div className="container-max text-center">
          <SectionReveal variant="fade-blur">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-black">Start Your Security Journey</h2>
            <p className="text-black/60 max-w-2xl mx-auto mb-10">
              Get in touch for a confidential discussion about your organisation&apos;s security requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" href="/contact">
                Contact Us
              </Button>
              <Button variant="outline" size="lg" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}>
                Speak to an Expert
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}
