import type { Metadata } from "next";
import Image from "next/image";
import { MissionStatement } from "@/components/about/MissionStatement";
import { Timeline } from "@/components/about/Timeline";
import { TeamGrid } from "@/components/about/TeamGrid";
import { CalendlyEmbed } from "@/components/about/CalendlyEmbed";
import { Check } from "lucide-react";

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

export default function AboutPage() {
  return (
    <>
      <MissionStatement />

      {/* The Model — One Company Six Divisions */}
      <section className="relative overflow-hidden bg-primary section-padding">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-accent/5 blur-[120px]" />

        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Image */}
            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-3xl">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
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

            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-4 py-1.5 mb-6">
                <div className="h-1 w-1 rounded-full bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/40">
                  Our Model
                </span>
              </div>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
                One Company, Six Divisions
              </h2>

              <p className="mt-4 text-base leading-relaxed text-white/40">
                Traverse Minds is one integrated organisation where every division
                strengthens the others. Security audits are informed by Think Tank
                research. Events build community for all divisions. Media amplifies
                research findings to a wider audience.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {divisions.map((d) => (
                  <div
                    key={d.name}
                    className="flex items-start gap-3 rounded-xl border border-white/6 bg-white/3 p-4 transition-colors hover:border-accent/20 hover:bg-white/5"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <div>
                      <p className="text-sm font-semibold text-white">{d.name}</p>
                      <p className="text-xs text-white/30">{d.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Timeline />
      <TeamGrid />

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

            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight">
              Company Details
            </h2>

            <div className="mt-8 inline-grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
              {[
                { label: "Registered Name", value: "Traverse Minds UG" },
                { label: "Registration No.", value: "[To be added]" },
                { label: "Registered Address", value: "Kampala, Uganda" },
                { label: "Contact", value: "hello@traverseminds.ug" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border-light bg-surface-elevated px-6 py-4"
                >
                  <p className="text-xs text-brand-muted">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold text-primary">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CalendlyEmbed />
    </>
  );
}
