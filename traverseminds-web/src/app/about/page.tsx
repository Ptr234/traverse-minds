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

      {/* The Model — One Company Six Divisions */}
      <section className="relative overflow-hidden bg-primary section-padding">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-accent/5 blur-[120px]" />

        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Image */}
            <SectionReveal variant="clip-inset">
              <div className="relative">
                <div className="relative aspect-square overflow-hidden rounded-3xl">
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
                <div className="absolute -bottom-5 -right-3 rounded-2xl border border-white/10 bg-white p-5 shadow-elevated md:-right-6">
                  <p className="font-display text-4xl font-bold text-accent">6</p>
                  <p className="text-xs text-brand-medium mt-0.5">
                    Integrated<br />Divisions
                  </p>
                </div>
              </div>
            </SectionReveal>

            {/* Content */}
            <SectionReveal variant="clip-right" delay={0.2}>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-4 py-1.5 mb-6">
                  <div className="h-1 w-1 rounded-full bg-accent" />
                  <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/55">
                    Our Model
                  </span>
                </div>

                <TextReveal
                  as="h2"
                  variant="blur-in"
                  className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight"
                >
                  One Company, Six Divisions
                </TextReveal>

                <p className="mt-4 text-base leading-relaxed text-white/55">
                  Traverse Minds is one integrated organisation where every division
                  strengthens the others. Security audits are informed by Think Tank
                  research. Events build community for all divisions. Media amplifies
                  research findings to a wider audience.
                </p>

                <SectionReveal variant="fade-up" staggerChildren={0.08} className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {divisions.map((d) => (
                    <RevealItem key={d.name} variant="scale-fade">
                      <div
                        className="flex items-start gap-3 rounded-xl border border-white/6 bg-white/3 p-4 transition-colors hover:border-accent/20 hover:bg-white/5"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <div>
                          <p className="text-sm font-semibold text-white">{d.name}</p>
                          <p className="text-xs text-white/50">{d.desc}</p>
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
      <section className="relative bg-white section-padding-sm overflow-hidden">
        <div className="absolute inset-0 dot-grid-light opacity-30 pointer-events-none" />

        <div className="container-max relative z-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
            <div className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">
              Regional Reach
            </span>
          </div>

          <TextReveal
            as="h2"
            variant="fade-up"
            className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight"
          >
            Serving the East African Community
          </TextReveal>
          <p className="mt-3 text-brand-medium/60 max-w-xl mx-auto">
            Our work spans all five EAC member states, building a safer digital future across the region.
          </p>

          <SectionReveal variant="fade-up" staggerChildren={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-5 sm:gap-8 md:gap-14">
            {eacCountries.map((country) => (
              <RevealItem key={country.code} variant="scale-fade">
                <div className="flex flex-col items-center gap-3 group">
                  <div className="h-14 w-20 overflow-hidden rounded-lg border border-border-light shadow-sm transition-all duration-300 group-hover:shadow-card group-hover:-translate-y-1">
                    <Image
                      src={`https://flagcdn.com/w80/${country.code}.png`}
                      alt={`${country.name} flag`}
                      width={80}
                      height={56}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-semibold text-primary/70">{country.name}</span>
                </div>
              </RevealItem>
            ))}
          </SectionReveal>
        </div>
      </section>

      <Timeline />
      <TeamGrid />

      {/* Partners & Affiliations */}
      <section className="relative bg-surface-elevated section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid-light opacity-40 pointer-events-none" />

        <div className="container-max relative z-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
            <div className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">
              Partners
            </span>
          </div>

          <TextReveal
            as="h2"
            variant="clip-up"
            className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight"
          >
            Partners & Affiliations
          </TextReveal>

          <SectionReveal variant="clip-inset" className="mt-10">
            <div className="rounded-3xl border-2 border-dashed border-border-light py-16 max-w-2xl mx-auto">
              <Handshake className="mx-auto h-10 w-10 text-brand-muted/30 mb-4" />
              <p className="text-lg font-semibold text-primary">Coming Soon</p>
              <p className="mt-2 text-brand-medium/60 max-w-md mx-auto">
                Partner logos will appear here as relationships are established.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Legal / Registration */}
      <section className="relative overflow-hidden bg-white section-padding-sm">
        <div className="absolute inset-0 dot-grid-light opacity-30 pointer-events-none" />

        <div className="container-max relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">
                Legal
              </span>
            </div>

            <TextReveal
              as="h2"
              variant="fade-up"
              className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight"
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
                    className="rounded-2xl border border-border-light bg-surface-elevated px-6 py-4"
                  >
                    <p className="text-xs text-brand-muted">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold text-primary">{item.value}</p>
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
