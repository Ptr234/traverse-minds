import type { Metadata } from "next";
import Image from "next/image";
import { MissionStatement } from "@/components/about/MissionStatement";
import { Timeline } from "@/components/about/Timeline";
import { TeamGrid } from "@/components/about/TeamGrid";
import { CalendlyEmbed } from "@/components/about/CalendlyEmbed";
import { Check, Handshake } from "lucide-react";
import { PageTransition } from "@/components/ui/PageTransition";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";

export const metadata: Metadata = {
  title: "About Traverse Minds",
  description:
    "Uganda's integrated civic-tech company. Learn about our mission, team, and six interconnected divisions serving East Africa.",
};

const divisions = [
  { name: "Traverse Security", desc: "Cybersecurity for banks and government" },
  { name: "Traverse Events", desc: "Cyber Luncheon, conferences, workshops" },
  { name: "Public Record EA", desc: "AI-powered public document platform" },
  { name: "Digital Literacy", desc: "Cyber safety for schools, SMEs, government" },
  { name: "Traverse Media", desc: "Facts & Figures Podcast, data journalism" },
  { name: "Think Tank", desc: "Data protection, AI governance, OGP research" },
];

const eacCountries = [
  { code: "ug", name: "Uganda" },
  { code: "ke", name: "Kenya" },
  { code: "tz", name: "Tanzania" },
  { code: "rw", name: "Rwanda" },
  { code: "bi", name: "Burundi" },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <MissionStatement />

      {/* The Model -- One Company Six Divisions */}
      <section style={{ background: "#212429", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Image */}
            <SectionReveal variant="clip-inset">
              <div className="relative">
                <div className="relative aspect-square overflow-hidden" style={{ borderRadius: 16 }}>
                  <Image
                    src="/cyber/cyber_image_44.jpg"
                    alt="Team collaboration"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-tr from-primary/70 via-primary/10 to-transparent" />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-5 -right-3 border border-white/10 bg-white p-5 md:-right-6" style={{ borderRadius: 8, boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1), 0 2px 2px 0 rgba(0,0,0,0.15), 0 1px 0 0 rgba(0,0,0,0.05)" }}>
                  <p className="font-display text-4xl font-bold" style={{ color: "#ff4c00" }}>6</p>
                  <p className="text-xs mt-0.5" style={{ color: "#515459" }}>
                    Integrated<br />Divisions
                  </p>
                </div>
              </div>
            </SectionReveal>

            {/* Content */}
            <SectionReveal variant="clip-right" delay={0.2}>
              <div>
                <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Our Model</p>

                <TextReveal
                  as="h2"
                  variant="blur-in"
                  className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight"
                >
                  One Company, Six Divisions
                </TextReveal>

                <p className="mt-4 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Traverse Minds is one integrated organisation where every division
                  strengthens the others. Security audits are informed by Think Tank
                  research. Events build community for all divisions. Media amplifies
                  research findings to a wider audience.
                </p>

                <SectionReveal variant="fade-up" staggerChildren={0.08} className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {divisions.map((d) => (
                    <RevealItem key={d.name} variant="scale-fade">
                      <div
                        className="flex items-start gap-3 border border-white/6 bg-white/3 p-4"
                        style={{ borderRadius: 8, transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <div>
                          <p className="text-sm font-semibold text-white">{d.name}</p>
                          <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{d.desc}</p>
                        </div>
                      </div>
                    </RevealItem>
                  ))}
                </SectionReveal>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* EAC Country Flags */}
      <section style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
        <div className="container-max relative z-10 text-center">
          <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Regional Reach</p>

          <TextReveal
            as="h2"
            variant="fade-up"
            className="font-display text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "#000" }}
          >
            Serving the East African Community
          </TextReveal>
          <p className="mt-3 max-w-xl mx-auto" style={{ color: "#515459" }}>
            Our work spans all five EAC member states, building a safer digital future across the region.
          </p>

          <SectionReveal variant="fade-up" staggerChildren={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-5 sm:gap-8 md:gap-14">
            {eacCountries.map((country) => (
              <RevealItem key={country.code} variant="scale-fade">
                <div className="flex flex-col items-center gap-3 group">
                  <div className="h-14 w-20 overflow-hidden border shadow-sm" style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
                    <Image
                      src={`https://flagcdn.com/w80/${country.code}.png`}
                      alt={`${country.name} flag`}
                      width={80}
                      height={56}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: "#313439" }}>{country.name}</span>
                </div>
              </RevealItem>
            ))}
          </SectionReveal>
        </div>
      </section>

      <Timeline />
      <TeamGrid />

      {/* Partners & Affiliations */}
      <section style={{ background: "#f0f1f4", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
        <div className="container-max relative z-10 text-center">
          <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Partners</p>

          <TextReveal
            as="h2"
            variant="clip-up"
            className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000" }}
          >
            Partners & Affiliations
          </TextReveal>

          <SectionReveal variant="clip-inset" className="mt-10">
            <div className="border-2 border-dashed py-16 max-w-2xl mx-auto" style={{ borderRadius: 16, borderColor: "rgba(0,0,0,0.1)" }}>
              <Handshake className="mx-auto h-10 w-10 mb-4" style={{ color: "#919499" }} />
              <p className="text-lg font-semibold" style={{ color: "#000" }}>Coming Soon</p>
              <p className="mt-2 max-w-md mx-auto" style={{ color: "#515459" }}>
                Partner logos will appear here as relationships are established.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Legal / Registration */}
      <section style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
        <div className="container-max relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Legal</p>

            <TextReveal
              as="h2"
              variant="fade-up"
              className="font-display text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "#000" }}
            >
              Company Details
            </TextReveal>

            <SectionReveal variant="fade-up" staggerChildren={0.1} className="mt-8 inline-grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
              {[
                { label: "Registered Name", value: "Traverse Minds UG" },
                { label: "Registration No.", value: "[To be added]" },
                { label: "Registered Address", value: "Kampala, Uganda" },
                { label: "Contact", value: "hello@traverseminds.ug" },
              ].map((item) => (
                <RevealItem key={item.label} variant="slide-up">
                  <div
                    className="border px-6 py-4"
                    style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", background: "#f0f1f4" }}
                  >
                    <p className="text-xs" style={{ color: "#919499" }}>{item.label}</p>
                    <p className="mt-1 text-sm font-semibold" style={{ color: "#000" }}>{item.value}</p>
                  </div>
                </RevealItem>
              ))}
            </SectionReveal>
          </div>
        </div>
      </section>

      <CalendlyEmbed />
    </PageTransition>
  );
}
