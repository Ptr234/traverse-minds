import { Metadata } from "next";
import { CitedStats } from "@/components/ui/CitedStats";
import { getStatistics } from "@/lib/statistics";
import { SectionBar } from "@/components/magazine/SectionBar";
import { PageHeader } from "@/components/magazine/PageHeader";
import { ProgrammeListing } from "@/components/literacy/ProgrammeListing";
import { getProgrammes } from "@/lib/cms";
import { Button } from "@/components/ui/Button";
import { MapPin, Monitor, Layers, Building, ShieldCheck, Smartphone, FileText, AlertTriangle } from "lucide-react";
import { BulkTrainingQuoteButton } from "@/components/literacy/BulkTrainingQuoteButton";
import { SectionHeader } from "@/components/magazine/primitives";
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

export default async function LiteracyPage() {
  const [stats, programmes] = await Promise.all([getStatistics("literacy", 4), getProgrammes()]);
  return (
    <div className="flex flex-col">
      <PageTransition>
        <SectionBar />
        <PageHeader
          crumbs={[{ name: "Home", href: "/" }, { name: "Literacy", href: "/literacy" }]}
          kicker="Digital Literacy"
          title="Digital safety for every Ugandan"
          dek="Practical, language-accessible digital safety training for schools, small businesses, government agencies and NGOs across Uganda."
        />
        <ProgrammeListing programmes={programmes} />
        <CitedStats stats={stats} eyebrow="Why It Matters" title="The skills gap, in numbers" background="#f0f1f4" />

        {/* Delivery formats */}
        <section className="bg-white">
          <div className="container-max py-14 lg:py-20">
            <SectionHeader title="Delivery" />
            <div className="grid gap-10 lg:grid-cols-[1fr_2.4fr] lg:gap-14">
              <div>
                <h2 className="font-serif text-[clamp(26px,3vw,36px)] font-semibold leading-tight text-black">Four ways to train.</h2>
                <p className="mt-4 text-[16px] leading-relaxed text-gn-400">Choose the format that works best for your team and schedule.</p>
              </div>
              <ol className="grid border-t border-black/15 sm:grid-cols-2">
                {deliveryFormats.map((format, i) => (
                  <li key={format.title} className="border-b border-black/15 py-6 sm:pr-8 sm:odd:border-r sm:even:pl-8">
                    <div className="flex items-center justify-between">
                      <format.icon className="h-5 w-5 text-accent" aria-hidden />
                      <span className="font-mono text-[12px] text-gn-500">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="mt-4 font-serif text-[21px] font-semibold text-black">{format.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-gn-400">{format.desc}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Learning outcomes */}
        <section className="relative overflow-hidden bg-bg-dark text-white">
          <div className="tech-grid-dark absolute inset-0" aria-hidden />
          <div className="container-max relative py-14 lg:py-20">
            <SectionHeader title="Outcomes" dark />
            <h2 className="max-w-2xl font-serif text-[clamp(26px,3vw,36px)] font-semibold leading-tight">
              Every participant leaves with skills they can use the same day.
            </h2>
            <ol className="mt-10 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {learningOutcomes.map((outcome, i) => (
                <li key={outcome.title} className="bg-bg-dark p-6 lg:p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center border border-white/15 text-accent">
                      <outcome.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="font-mono text-[12px] text-white/35">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-6 font-serif text-[20px] font-semibold leading-snug">{outcome.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/60">{outcome.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Organisations and communities */}
        <section id="booking" className="bg-bg-light">
          <div className="container-max py-14 lg:py-20">
            <SectionHeader title="Work with us" />
            <div className="grid gap-px border border-black/10 bg-black/10 lg:grid-cols-2">
              <div className="flex flex-col bg-white p-8 lg:p-10">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">Organisations</p>
                <h2 className="mt-3 font-serif text-[clamp(24px,2.6vw,32px)] font-semibold leading-tight text-black">Train your entire organisation.</h2>
                <p className="mt-4 text-[16px] leading-relaxed text-gn-400">
                  Cybersecurity is a team effort. We provide tailored on-site training for government departments and corporate teams,
                  focused on the specific threats relevant to your sector.
                </p>
                <div className="mt-auto pt-8">
                  <BulkTrainingQuoteButton />
                </div>
              </div>
              <div className="flex flex-col bg-white p-8 lg:p-10">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">Communities</p>
                <h2 className="mt-3 font-serif text-[clamp(24px,2.6vw,32px)] font-semibold leading-tight text-black">Free workshops in local languages.</h2>
                <p className="mt-4 text-[16px] leading-relaxed text-gn-400">
                  As part of our civic mission, we run free digital safety workshops in local languages for community groups and
                  senior citizens. Want us to visit your community?
                </p>
                <div className="mt-auto pt-8">
                  <Button variant="outline" size="lg" href="/contact?subject=community-outreach">
                    Invite us to your community
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageTransition>
    </div>
  );
}
