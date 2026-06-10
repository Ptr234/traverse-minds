import { Metadata } from "next";
import { Hero } from "@/components/literacy/Hero";
import { ProgrammeListing } from "@/components/literacy/ProgrammeListing";
import { Button } from "@/components/ui/Button";
import { MapPin, Monitor, Layers, Building, ShieldCheck, Smartphone, FileText, AlertTriangle } from "lucide-react";
import { BulkTrainingQuoteButton } from "@/components/literacy/BulkTrainingQuoteButton";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { PageTransition } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Digital Literacy | Building a Cyber-Safe Generation in Africa",
  description: "Practical digital safety training for schools, SMEs, and government agencies.",
};

const deliveryFormats = [
  {
    icon: MapPin,
    title: "In-person",
    desc: "Face-to-face workshops and training sessions delivered at your premises or our training centres.",
  },
  {
    icon: Monitor,
    title: "Online",
    desc: "Live virtual sessions with interactive exercises, accessible from anywhere in Africa.",
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
    title: "Understand Data Rights",
    desc: "Know your rights and obligations under data protection laws like Uganda's PDPA 2019.",
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
        <section style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
          <div className="container-max relative z-10">
            <div className="text-center mb-16">
              <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Delivery</p>
              <TextReveal
                as="h2"
                variant="clip-up"
                className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000" }}
              >
                Delivery Formats
              </TextReveal>
              <p className="mt-3 max-w-xl mx-auto" style={{ color: "#515459" }}>
                Choose the training format that works best for your team and schedule.
              </p>
            </div>

            <SectionReveal variant="fade-up" staggerChildren={0.1}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
                {deliveryFormats.map((format) => (
                  <RevealItem key={format.title} variant="scale-fade">
                    <div className="group flex flex-col items-center text-center border bg-white p-8" style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1), 0 2px 2px 0 rgba(0,0,0,0.15), 0 1px 0 0 rgba(0,0,0,0.05)" }}>
                      <div className="mb-5 flex h-14 w-14 items-center justify-center bg-primary/5" style={{ borderRadius: 8, transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
                        <format.icon className="h-6 w-6" style={{ color: "#000" }} />
                      </div>
                      <h3 className="font-display text-lg font-bold" style={{ color: "#000" }}>{format.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed" style={{ color: "#515459" }}>{format.desc}</p>
                    </div>
                  </RevealItem>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section style={{ background: "#212429", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
          <div className="container-max relative z-10">
            <div className="text-center mb-14">
              <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Outcomes</p>
              <TextReveal
                as="h2"
                variant="blur-in"
                className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight"
              >
                Learning Outcomes
              </TextReveal>
              <p className="mt-3 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
                Every participant leaves with practical skills they can apply immediately.
              </p>
            </div>

            <SectionReveal variant="fade-up" staggerChildren={0.1}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
                {learningOutcomes.map((outcome) => (
                  <RevealItem key={outcome.title} variant="slide-up">
                    <div className="border border-white/6 bg-white/3 p-7" style={{ borderRadius: 8, transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center bg-white/6" style={{ borderRadius: 8 }}>
                        <outcome.icon className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="font-display text-base font-bold text-white">{outcome.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{outcome.desc}</p>
                    </div>
                  </RevealItem>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Organisation Booking */}
        <section style={{ background: "#f0f1f4", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
          <div className="container-max relative z-10">
            <div className="max-w-2xl">
              <TextReveal
                as="h2"
                variant="fade-up"
                className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight" style={{ color: "#000" }}
              >
                Train your entire organisation
              </TextReveal>
              <p className="mt-5 text-base leading-relaxed" style={{ color: "#515459" }}>
                Cybersecurity is a team effort. We provide tailored on-site
                training for government departments and corporate teams,
                focused on the specific threats relevant to your sector.
              </p>
              <SectionReveal variant="slide-up" delay={0.2}>
                <div className="mt-10">
                  <BulkTrainingQuoteButton />
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* Community Outreach */}
        <section style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
          <div className="container-max relative z-10 text-center">
            <TextReveal
              as="h2"
              variant="clip-up"
              className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000" }}
            >
              Community Outreach
            </TextReveal>
            <SectionReveal variant="fade-blur" delay={0.1}>
              <p className="mt-5 mx-auto max-w-2xl text-base leading-relaxed" style={{ color: "#515459" }}>
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
