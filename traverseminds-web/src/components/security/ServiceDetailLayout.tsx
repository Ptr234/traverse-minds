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
  LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageTransition } from "@/components/ui/PageTransition";
import { SectionHeader } from "@/components/magazine/primitives";

const ICON_MAP: Record<string, LucideIcon> = {
  "Penetration Testing": ScanEye,
  "ISO 27001 Compliance": ShieldCheck,
  "Bank of Uganda Audit": FileCheck2,
  "Threat Modelling": AlertTriangle,
  "Incident Response": Siren,
  "Regulatory Advisory": Scale,
};

interface ServiceDetailLayoutProps {
  slug: string;
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
  slug,
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
          { name: title, href: `/security/${slug}` },
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

      {/* Overview, capabilities and why Traverse */}
      <section className="bg-white">
        <div className="container-max py-14 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeader title="Overview" />
              <p className="font-serif text-[clamp(19px,1.8vw,22px)] leading-relaxed text-gn-200">{content.overview}</p>

              <div className="mt-14">
                <SectionHeader title="Key capabilities" />
                <ol className="grid sm:grid-cols-2">
                  {content.features.map((feature, i) => (
                    <li key={feature.title} className="border-b border-black/15 py-6 sm:pr-8 sm:odd:border-r sm:even:pl-8">
                      <span className="font-mono text-[12px] font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="mt-2 font-serif text-[21px] font-semibold leading-snug text-black">{feature.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-gn-400">{feature.description}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="relative overflow-hidden bg-bg-dark p-8 text-white lg:sticky lg:top-28 lg:p-10">
                <div className="tech-grid-dark absolute inset-0" aria-hidden />
                <div className="relative">
                  <p className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.14em]">
                    <span className="h-2 w-2 bg-accent" aria-hidden /> Why Traverse
                  </p>
                  <ol className="mt-5 border-t border-white/20">
                    {content.benefits.map((benefit, i) => (
                      <li key={benefit} className="grid grid-cols-[32px_1fr] border-b border-white/15 py-3.5">
                        <span className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-[15px] leading-relaxed text-white/80">{benefit}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-8 text-[15px] text-white/60">Ready to secure your infrastructure? Speak with our security team today.</p>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-3 border border-white/25 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:border-[#25D366]"
                  >
                    <MessageCircle className="h-5 w-5 text-[#25D366]" aria-hidden />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {children}

      {/* Enquiry */}
      <section id="enquiry" className="scroll-mt-24 bg-bg-light">
        <div className="container-max py-14 lg:py-20">
          <SectionHeader title="Start a conversation" />
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] text-black">Start your security journey.</h2>
              <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-gn-400">
                Get in touch for a confidential discussion about your organisation&apos;s {title.toLowerCase()} needs.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button variant="primary" size="lg" href="/contact">
                Contact us
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}>
                Speak to an expert
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
