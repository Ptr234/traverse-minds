"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/magazine/primitives";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/TextReveal";
import { SponsorshipForm } from "./SponsorshipForm";

export function SponsorCTA() {
  const [showForm, setShowForm] = useState(false);
  const sponsorshipLevels = [
    {
      level: "Partner",
      benefits: [
        "Recognition on website",
        "Logo in program materials",
        "Impact report access",
      ],
    },
    {
      level: "Champion",
      benefits: [
        "All Partner benefits",
        "Guest speaker opportunity",
        "Quarterly impact briefings",
        "Named scholarship slot",
      ],
    },
    {
      level: "Founder",
      benefits: [
        "All Champion benefits",
        "Naming rights for program tier",
        "Exclusive mentee access",
        "Annual recognition event",
        "Custom impact reporting",
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden bg-bg-dark text-white py-14 lg:py-20">
      <div className="container-max relative z-10">
        <SectionHeader title="Support the programme" dark />
        <div className="mb-10 max-w-3xl">
          <TextReveal
            as="h2"
            variant="blur-in"
            className="mb-5 font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] text-white"
          >
            Sponsorship Levels
          </TextReveal>

          <TextReveal
            as="p"
            variant="fade-up"
            delay={0.2}
            className="mb-8 text-[17px] leading-relaxed text-white/70"
          >
            Help us build a generation of young people who live with accuracy, intention, and integrity. Every sponsorship brings this vision closer to reality.
          </TextReveal>
        </div>

        <ol className="mb-12 grid gap-px border-t-2 border-white/80 bg-white/15 md:grid-cols-3">
          {sponsorshipLevels.map((level, i) => (
            <li key={level.level} className="flex flex-col bg-bg-dark px-1 py-8 md:px-7">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">Tier {String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-serif text-[30px] font-semibold leading-tight text-white">{level.level}</h3>
              <ul className="mt-5 flex-1 space-y-2.5 border-t border-white/15 pt-5">
                {level.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-[15px] text-white/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button variant="primary" size="md" className="w-full" onClick={() => setShowForm(true)}>
                  Become a sponsor
                </Button>
              </div>
            </li>
          ))}
        </ol>

        {!showForm && (
          <div className="flex flex-wrap items-center justify-between gap-6 border border-white/15 p-7">
            <div className="max-w-2xl">
              <h3 className="font-serif text-[22px] font-semibold text-white">Custom sponsorship options</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-white/70">
                Have a unique way you&apos;d like to support this work? We&apos;re open to creative partnerships and custom arrangements.
              </p>
            </div>
            <Button variant="outline-dark" size="md" onClick={() => setShowForm(true)}>
              Get in touch
            </Button>
          </div>
        )}

        {showForm && (
          <div className="max-w-2xl bg-white p-6 text-black lg:p-8">
            <div className="mb-6">
              <h3 className="mb-2 font-serif text-[clamp(24px,2.8vw,32px)] font-semibold leading-tight text-black">
                Sponsorship enquiry
              </h3>
              <p className="text-[15px] leading-relaxed text-gn-400">
                Tell us about your sponsorship interests and how you&apos;d like to support the Accuracy Mentorship Program.
              </p>
            </div>
            <SponsorshipForm />
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 text-sm underline"
              style={{ color: "#515459" }}
            >
              Back to sponsorship levels
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
