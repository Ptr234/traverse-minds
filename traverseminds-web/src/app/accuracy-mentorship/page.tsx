import type { Metadata } from "next";
import { AccuracyMentorshipHero } from "@/components/accuracy-mentorship/Hero";
import { ModulesShowcase } from "@/components/accuracy-mentorship/ModulesShowcase";
import { RegistrationSections } from "@/components/accuracy-mentorship/RegistrationSections";
import { SponsorCTA } from "@/components/accuracy-mentorship/SponsorCTA";
import { TextReveal } from "@/components/ui/TextReveal";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { Target, Heart, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Accuracy Mentorship Program",
  description:
    "Prepare young people to live with vigour, meaning, and self-sufficiency. A Traverse Minds Africa initiative for ages 14–25.",
};

export default function AccuracyMentorshipPage() {
  return (
    <>
      <AccuracyMentorshipHero />

      {/* Why This Program */}
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
              className="eyebrow"
              style={{ color: "#ff4c00", marginBottom: 16 }}
            >
              WHY THIS PROGRAM EXISTS
            </p>

            <TextReveal
              as="h2"
              variant="blur-in"
              className="font-display text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Building a Self-Sufficient Generation
            </TextReveal>
          </div>

          <SectionReveal
            variant="fade-up"
            staggerChildren={0.1}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <RevealItem variant="scale-fade">
              <div className="bg-white/5 border border-white/10 rounded-lg p-8">
                <Target className="h-8 w-8 text-accent mb-4" />
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Young People with Meaning
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  76% of Uganda's population is under 30. Right now, too many are
                  moving through their most formative years without ever being asked
                  serious questions about who they want to be or what they're
                  building. Meaning isn't discovered—it's constructed, deliberately.
                </p>
              </div>
            </RevealItem>

            <RevealItem variant="scale-fade">
              <div className="bg-white/5 border border-white/10 rounded-lg p-8">
                <Heart className="h-8 w-8 text-accent mb-4" />
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Reducing Entitlement
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Among 18–30-year-olds, 41% are neither in employment, education,
                  nor training. But it's not just jobs—it's readiness. Entitlement
                  grows where effort, consequence, and ownership are never installed.
                  This program corrects that by design.
                </p>
              </div>
            </RevealItem>

            <RevealItem variant="scale-fade">
              <div className="bg-white/5 border border-white/10 rounded-lg p-8">
                <Lightbulb className="h-8 w-8 text-accent mb-4" />
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Self-Sustainable Futures
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Government programmes reach only a fraction of those who need them.
                  This programme builds internal infrastructure—habits, judgment,
                  financial literacy, resilience—that makes a young person capable of
                  generating their own stability.
                </p>
              </div>
            </RevealItem>
          </SectionReveal>
        </div>
      </section>

      {/* Program Objectives */}
      <section
        style={{
          background: "#ffffff",
          borderTop: "1px solid rgba(0,0,0,0.3)",
          paddingTop: 56,
          paddingBottom: 56,
        }}
        className="relative overflow-hidden"
      >
        <div className="container-max relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p
              className="eyebrow"
              style={{ color: "#ff4c00", marginBottom: 16 }}
            >
              WHAT YOU'LL GAIN
            </p>

            <TextReveal
              as="h2"
              variant="blur-in"
              className="font-display text-4xl md:text-5xl font-bold  mb-6"
            >
              Program Outcomes
            </TextReveal>
          </div>

          <SectionReveal
            variant="fade-up"
            staggerChildren={0.08}
            className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              "Articulate a personal identity and set of values independent of external validation",
              "Apply structured thinking and problem-solving to real situations",
              "Make decisions with understanding of consequence, risk, and long-term cost",
              "Demonstrate financial literacy—budgeting, saving, investing, entrepreneurship",
              "Build personal habits and systems that hold up without external supervision",
              "Navigate family relationships with maturity and healthy boundaries",
              "Exercise positive influence among peers, online and offline",
              "Reflect honestly on mortality and legacy to produce urgency and gratitude",
            ].map((outcome, idx) => (
              <RevealItem key={idx} variant="scale-fade">
                <div className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                    ✓
                  </div>
                  <p className=" text-sm leading-relaxed">
                    {outcome}
                  </p>
                </div>
              </RevealItem>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* Modules */}
      <ModulesShowcase />

      {/* How It Works */}
      <section
        style={{
          background: "#ffffff",
          borderTop: "1px solid rgba(0,0,0,0.3)",
          paddingTop: 56,
          paddingBottom: 56,
        }}
        className="relative overflow-hidden"
      >
        <div className="container-max relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p
              className="eyebrow"
              style={{ color: "#ff4c00", marginBottom: 16 }}
            >
              HOW IT WORKS
            </p>

            <TextReveal
              as="h2"
              variant="blur-in"
              className="font-display text-4xl md:text-5xl font-bold mb-6"
              style={{ color: "#000" }}
            >
              Delivery & Graduation
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <SectionReveal variant="clip-right">
              <div>
                <h3 className="font-display text-2xl font-bold mb-6" style={{ color: "#000" }}>
                  How We Deliver
                </h3>
                <div className="space-y-6">
                  <div>
                    <p
                      className="font-semibold mb-2"
                      style={{ color: "#ff4c00" }}
                    >
                      Cohorts
                    </p>
                    <p className="text-sm" style={{ color: "#515459" }}>
                      10–12 week cycles, 15–20 participants per cohort. Tier 1 (14–18) and Tier 2 (19–25) run separately.
                    </p>
                  </div>
                  <div>
                    <p
                      className="font-semibold mb-2"
                      style={{ color: "#ff4c00" }}
                    >
                      Sessions
                    </p>
                    <p className="text-sm" style={{ color: "#515459" }}>
                      20–30 minute mentor input, guided discussion, practical exercises. Low-lecture, high-practice.
                    </p>
                  </div>
                  <div>
                    <p
                      className="font-semibold mb-2"
                      style={{ color: "#ff4c00" }}
                    >
                      The Accuracy Journal
                    </p>
                    <p className="text-sm" style={{ color: "#515459" }}>
                      A private, ongoing self-audit completed between sessions. Where the core discipline—doing the work when no one is watching—is actually practised.
                    </p>
                  </div>
                  <div>
                    <p
                      className="font-semibold mb-2"
                      style={{ color: "#ff4c00" }}
                    >
                      Mentorship
                    </p>
                    <p className="text-sm" style={{ color: "#515459" }}>
                      Each participant paired with a trained mentor, ideally carried through both tiers. Guides, not lecturers.
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal variant="clip-left">
              <div>
                <h3 className="font-display text-2xl font-bold mb-6" style={{ color: "#000" }}>
                  Graduation Criteria
                </h3>
                <div className="space-y-6">
                  <div>
                    <p
                      className="font-semibold mb-2"
                      style={{ color: "#ff4c00" }}
                    >
                      Not Exam-Based
                    </p>
                    <p className="text-sm" style={{ color: "#515459" }}>
                      Graduation is earned through demonstrated consistency over time, not a single test or presentation.
                    </p>
                  </div>
                  <div>
                    <p
                      className="font-semibold mb-2"
                      style={{ color: "#ff4c00" }}
                    >
                      Module Completion
                    </p>
                    <p className="text-sm" style={{ color: "#515459" }}>
                      All 10 modules must be attended and engaged with at the appropriate depth for your tier.
                    </p>
                  </div>
                  <div>
                    <p
                      className="font-semibold mb-2"
                      style={{ color: "#ff4c00" }}
                    >
                      Journal Consistency
                    </p>
                    <p className="text-sm" style={{ color: "#515459" }}>
                      Minimum 80% of journal entries completed across the term, reviewed for consistency of practice.
                    </p>
                  </div>
                  <div>
                    <p
                      className="font-semibold mb-2"
                      style={{ color: "#ff4c00" }}
                    >
                      Capstone Project
                    </p>
                    <p className="text-sm" style={{ color: "#515459" }}>
                      Level 1: A small, real commitment kept over 4+ weeks. Level 2: A real, executed commitment (business, financial plan, community initiative).
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Sponsor CTA */}
      <SponsorCTA />

      {/* Registration */}
      <div id="apply">
        <RegistrationSections />
      </div>

      {/* Final CTA */}
      <section
        style={{
          background: "#212429",
          paddingTop: 56,
          paddingBottom: 56,
        }}
        className="relative overflow-hidden"
      >
        <div className="container-max relative z-10 text-center">
          <TextReveal
            as="h2"
            variant="blur-in"
            className="font-display text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to Begin?
          </TextReveal>
          <TextReveal
            as="p"
            variant="fade-up"
            delay={0.2}
            className="text-xl text-white/70 mb-8 max-w-2xl mx-auto"
          >
            Whether you're ready to commit to your own formation, support your school's students, or invest in this work, there's a role for you.
          </TextReveal>
          <TextReveal
            as="p"
            variant="fade-up"
            delay={0.3}
            className="text-base text-white/50"
          >
            Accuracy is the quiet discipline of getting it right when no one's watching.
          </TextReveal>
        </div>
      </section>
    </>
  );
}
