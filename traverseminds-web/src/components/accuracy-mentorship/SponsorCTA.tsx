"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Heart } from "lucide-react";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { SponsorshipForm } from "./SponsorshipForm";

export function SponsorCTA() {
  const [showForm, setShowForm] = useState(false);
  const sponsorshipLevels = [
    {
      level: "Partner",
      amount: "$1,000 - $5,000",
      benefits: [
        "Recognition on website",
        "Logo in program materials",
        "Impact report access",
      ],
    },
    {
      level: "Champion",
      amount: "$5,000 - $15,000",
      benefits: [
        "All Partner benefits",
        "Guest speaker opportunity",
        "Quarterly impact briefings",
        "Named scholarship slot",
      ],
    },
    {
      level: "Founder",
      amount: "$15,000+",
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
    <section
      style={{
        background: "#212429",
        paddingTop: 56,
        paddingBottom: 56,
      }}
      className="relative overflow-hidden"
    >
      <div className="container-max relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p
            className="eyebrow mb-4"
            style={{ color: "#ff4c00", fontSize: 14, fontWeight: 600 }}
          >
            SUPPORT THE PROGRAM
          </p>

          <TextReveal
            as="h2"
            variant="blur-in"
            className="font-display text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Sponsorship Levels
          </TextReveal>

          <TextReveal
            as="p"
            variant="fade-up"
            delay={0.2}
            className="text-lg text-white/70 mb-8"
          >
            Help us build a generation of young people who live with accuracy, intention, and integrity. Every sponsorship brings this vision closer to reality.
          </TextReveal>
        </div>

        <SectionReveal variant="fade-up" staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {sponsorshipLevels.map((level) => (
            <RevealItem key={level.level} variant="scale-fade">
              <div
                className="bg-white p-8"
                style={{
                  borderRadius: 8,
                  transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)"
                }}
              >
                <h3 className="font-display text-2xl font-bold mb-2" style={{ color: "#000" }}>
                  {level.level}
                </h3>
                <p className="text-2xl font-bold mb-6" style={{ color: "#ff4c00" }}>
                  {level.amount}
                </p>

                <ul className="space-y-3 mb-8">
                  {level.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div
                        className="h-4 w-4 mt-0.5 shrink-0 flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: "#ff4c00", borderRadius: 2 }}
                      >
                        +
                      </div>
                      <span className="text-sm" style={{ color: "#515459" }}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => setShowForm(true)}
                >
                  Become a Sponsor
                </Button>
              </div>
            </RevealItem>
          ))}
        </SectionReveal>

        {!showForm && (
          <div className="border p-8 text-center" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
            <div className="h-8 w-8 flex items-center justify-center mx-auto mb-4" style={{ background: "#ff4c00", borderRadius: 4 }}>
              <Heart className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-3">
              Custom Sponsorship Options
            </h3>
            <p className="text-white/70 mb-6">
              Have a unique way you'd like to support this work? We're open to creative partnerships and custom arrangements.
            </p>
            <Button
              variant="outline-dark"
              size="md"
              onClick={() => setShowForm(true)}
            >
              Get in Touch
            </Button>
          </div>
        )}

        {showForm && (
          <div className="max-w-2xl mx-auto bg-white p-8" style={{ borderRadius: 8 }}>
            <div className="mb-6">
              <h3 className="font-display text-2xl font-bold mb-2" style={{ color: "#000" }}>
                Sponsorship Inquiry Form
              </h3>
              <p style={{ color: "#515459" }}>
                Tell us about your sponsorship interests and how you'd like to support the Accuracy Mentorship Program.
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
