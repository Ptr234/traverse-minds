import { Metadata } from "next";
import { Hero } from "@/components/literacy/Hero";
import { ProgrammeListing } from "@/components/literacy/ProgrammeListing";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MapPin, Monitor, Layers, Building, ShieldCheck, Smartphone, FileText, AlertTriangle } from "lucide-react";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { PageTransition } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Digital Literacy | Building a Cyber-Safe Generation in Uganda",
  description: "Practical digital safety training for schools, SMEs, and government agencies.",
};

const deliveryFormats = [
  {
    icon: MapPin,
    title: "In-person (Kampala)",
    desc: "Face-to-face workshops and training sessions delivered at your premises or our Kampala training centre.",
  },
  {
    icon: Monitor,
    title: "Online",
    desc: "Live virtual sessions with interactive exercises, accessible from anywhere in East Africa.",
  },
  {
    icon: Layers,
    title: "Hybrid",
    desc: "Combine in-person and online delivery for maximum flexibility and reach across your organisation.",
  },
  {
    icon: Building,
    title: "Custom On-site",
    desc: "Tailored programmes delivered at your location, adapted to your sector-specific threats and needs.",
  },
];

const learningOutcomes = [
  {
    icon: AlertTriangle,
    title: "Identify Phishing",
    desc: "Recognise phishing emails, SMS scams, and social engineering attacks before they cause damage.",
  },
  {
    icon: Smartphone,
    title: "Secure Devices",
    desc: "Apply practical device security measures including strong passwords, 2FA, and safe browsing habits.",
  },
  {
    icon: ShieldCheck,
    title: "Understand PDPA Rights",
    desc: "Know your rights and obligations under the Uganda Personal Data Protection Act 2019.",
  },
  {
    icon: FileText,
    title: "Create Incident Response Plan",
    desc: "Develop a practical incident response plan for your organisation or personal digital life.",
  },
];

export default function LiteracyPage() {
  return (
    <div className="flex flex-col">
      <PageTransition>
        <Hero />
        <ProgrammeListing />

        {/* Delivery Formats */}
        <section className="relative bg-white section-padding overflow-hidden border-t border-border-light">
          <div className="absolute inset-0 dot-grid-light opacity-30 pointer-events-none" />

          <div className="container-max relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
                <div className="h-1 w-1 rounded-full bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">Delivery</span>
              </div>
              <TextReveal
                as="h2"
                variant="clip-up"
                className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight"
              >
                Delivery Formats
              </TextReveal>
              <p className="mt-3 text-brand-medium/60 max-w-xl mx-auto">
                Choose the training format that works best for your team and schedule.
              </p>
            </div>

            <SectionReveal variant="fade-up" staggerChildren={0.1}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
                {deliveryFormats.map((format) => (
                  <RevealItem key={format.title} variant="scale-fade">
                    <div className="group flex flex-col items-center text-center rounded-2xl border border-border-light bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated hover:border-accent/15">
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:scale-110">
                        <format.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-primary">{format.title}</h3>
                      <p className="mt-3 text-sm text-brand-medium/60 leading-relaxed">{format.desc}</p>
                    </div>
                  </RevealItem>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="relative bg-primary section-padding overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
          <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-accent/5 blur-[120px]" />

          <div className="container-max relative z-10">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-4 py-1.5 mb-5">
                <div className="h-1 w-1 rounded-full bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/55">Outcomes</span>
              </div>
              <TextReveal
                as="h2"
                variant="blur-in"
                className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight"
              >
                Learning Outcomes
              </TextReveal>
              <p className="mt-3 text-white/50 max-w-xl mx-auto">
                Every participant leaves with practical skills they can apply immediately.
              </p>
            </div>

            <SectionReveal variant="fade-up" staggerChildren={0.1}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
                {learningOutcomes.map((outcome) => (
                  <RevealItem key={outcome.title} variant="slide-up">
                    <div className="rounded-2xl border border-white/6 bg-white/3 p-7 transition-all duration-300 hover:border-accent/20 hover:bg-white/5">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/6">
                        <outcome.icon className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="font-display text-base font-bold text-white">{outcome.title}</h3>
                      <p className="mt-2 text-sm text-white/45 leading-relaxed">{outcome.desc}</p>
                    </div>
                  </RevealItem>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Organisation Booking */}
        <section className="relative bg-surface-elevated section-padding overflow-hidden">
          <div className="absolute inset-0 dot-grid-light opacity-40 pointer-events-none" />
          <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 h-96 w-96 rounded-full border-40 border-primary/3 pointer-events-none" />

          <div className="container-max relative z-10">
            <div className="max-w-2xl">
              <TextReveal
                as="h2"
                variant="fade-up"
                className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight"
              >
                Train your entire organisation
              </TextReveal>
              <p className="mt-5 text-base text-brand-medium/60 leading-relaxed">
                Cybersecurity is a team effort. We provide tailored on-site
                training for government departments and corporate teams,
                focused on the specific threats relevant to your sector.
              </p>
              <SectionReveal variant="slide-up" delay={0.2}>
                <div className="mt-10">
                  <Button variant="primary" size="lg" href="/contact?subject=literacy-org">
                    Request Bulk Training Quote
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* Community Outreach */}
        <section className="relative bg-white section-padding overflow-hidden">
          <div className="absolute inset-0 dot-grid-light opacity-30 pointer-events-none" />

          <div className="container-max relative z-10 text-center">
            <TextReveal
              as="h2"
              variant="clip-up"
              className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight"
            >
              Community Outreach
            </TextReveal>
            <SectionReveal variant="fade-blur" delay={0.1}>
              <p className="mt-5 mx-auto max-w-2xl text-base text-brand-medium/60 leading-relaxed">
                As part of our civic mission, we run free digital safety workshops
                in local languages for community groups and senior citizens.
                Want us to visit your community?
              </p>
              <div className="mt-10">
                <Button variant="outline" size="lg" href="/contact?subject=community-outreach">
                  Invite Us to Your Community
                </Button>
              </div>
            </SectionReveal>
          </div>
        </section>
      </PageTransition>
    </div>
  );
}
