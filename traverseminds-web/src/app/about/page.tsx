import type { Metadata } from "next";
import Image from "next/image";
import { MissionStatement } from "@/components/about/MissionStatement";
import { Timeline } from "@/components/about/Timeline";
import { TeamGrid } from "@/components/about/TeamGrid";
import { CalendlyEmbed } from "@/components/about/CalendlyEmbed";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "About Traverse Minds",
  description: "Uganda's integrated civic-tech company. Learn about our mission, team, and six interconnected divisions serving East Africa.",
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

      {/* The Model — One Company Six Divisions — brand-green dark section */}
      <section className="bg-brand-green px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Image side */}
            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Team collaboration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-green/70 via-brand-teal/10 to-transparent" />
              </div>
              {/* Floating division count */}
              <div className="absolute -bottom-6 -right-4 rounded-xl border border-white/10 bg-white/95 px-6 py-4 shadow-2xl md:-right-8">
                <p className="font-display text-3xl text-brand-teal">6</p>
                <p className="text-xs text-brand-medium">Integrated<br />Divisions</p>
              </div>
            </div>

            {/* Content side */}
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber">Our Model</span>
              <h2 className="mt-3 font-display text-2xl text-white md:text-3xl">
                One Company, Six Divisions
              </h2>
              <p className="mt-4 leading-relaxed text-white/70">
                Traverse Minds is not six separate companies — it is one integrated
                organisation where every division strengthens the others. Security
                audits are informed by Think Tank research. Events generate leads
                for consulting services. The podcast amplifies published reports.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {divisions.map((d) => (
                  <div key={d.name} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-amber" />
                    <div>
                      <p className="text-sm font-semibold text-white">{d.name}</p>
                      <p className="text-xs text-white/50">{d.desc}</p>
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
      <section className="relative overflow-hidden bg-light-bg px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=60"
            alt=""
            fill
            className="object-cover opacity-5"
          />
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber">Legal</span>
          <h2 className="mt-3 font-display text-xl text-brand-green md:text-2xl">Company Details</h2>
          <div className="mt-6 inline-grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
            {[
              { label: "Registered Name", value: "Traverse Minds UG" },
              { label: "Registration No.", value: "[To be added]" },
              { label: "Registered Address", value: "Kampala, Uganda" },
              { label: "Contact", value: "hello@traverseminds.ug" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-light-border bg-light-card px-5 py-3">
                <p className="text-xs text-brand-muted">{item.label}</p>
                <p className="mt-0.5 text-sm font-medium text-brand-charcoal">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CalendlyEmbed />
    </>
  );
}
