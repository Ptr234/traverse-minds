import { Metadata } from "next";
import { Hero } from "@/components/think-tank/Hero";
import { ResearchAreas } from "@/components/think-tank/ResearchAreas";
import { Publications } from "@/components/think-tank/Publications";
import { Button } from "@/components/ui/Button";
import { PageTransition } from "@/components/ui/PageTransition";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { ArrowRight, FileText, Filter } from "lucide-react";

export const metadata: Metadata = {
  title: "Think Tank | Evidence-Driven Digital Policy Research in East Africa",
  description: "Bridging the gap between technology and policy. We provide independent research on data protection, AI governance, and digital rights.",
};

export default function ThinkTankPage() {
  return (
    <div className="flex flex-col">
      <PageTransition>
      <Hero />
      <ResearchAreas />
      <Publications />

      {/* Evidence Briefs */}
      <section style={{ background: "#f0f1f4", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
        <div className="container-max relative z-10 text-center">
          <SectionReveal variant="fade-up">
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Evidence Briefs</p>
          </SectionReveal>

          <TextReveal variant="clip-up" className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000" }}>
            Evidence Briefs
          </TextReveal>

          <SectionReveal variant="scale-fade" delay={0.15}>
            <div className="mt-10 border-2 border-dashed py-16 max-w-2xl mx-auto" style={{ borderRadius: 16, borderColor: "rgba(0,0,0,0.1)" }}>
              <FileText className="mx-auto h-10 w-10 mb-4" style={{ color: "#919499" }} />
              <p className="text-lg font-semibold" style={{ color: "#000" }}>Coming Soon</p>
              <p className="mt-2 max-w-md mx-auto" style={{ color: "#515459" }}>
                Short-form rapid summaries of our key research findings. Coming soon.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Gated Content */}
      <section style={{ background: "#212429", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
        <div className="container-max relative z-10">
          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
            <SectionReveal variant="clip-left" className="max-w-2xl text-center lg:text-left">
              <TextReveal variant="blur-in" className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
                Get the State of Digital Rights Report
              </TextReveal>
              <p className="mt-5 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Our annual comprehensive analysis of the digital policy landscape
                across Uganda, Kenya, and Tanzania. Free for registered organisations.
              </p>
            </SectionReveal>

            <SectionReveal variant="slide-up" delay={0.2} className="w-full max-w-sm">
              <div className="border border-white/6 bg-surface-dark-elevated p-8" style={{ borderRadius: 16 }}>
                <h3 className="font-display text-lg font-bold text-white">Download the Report</h3>
                <form className="mt-6 space-y-4">
                  <input
                    type="email"
                    placeholder="Your work email"
                    className="w-full border border-white/8 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none"
                    style={{ borderRadius: 8, transition: "border-color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                    required
                  />
                  <Button variant="primary" className="w-full">
                    Send me the PDF
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <p className="text-[11px] text-center text-white/20">
                    By downloading, you agree to join our research mailing list.
                  </p>
                </form>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Commission Research */}
      <section id="commission" style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
        <div className="container-max relative z-10 text-center">
          <TextReveal variant="fade-up" className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000" }}>
            Commission Research
          </TextReveal>
          <SectionReveal variant="fade-blur" delay={0.1}>
            <p className="mt-5 mx-auto max-w-2xl text-base leading-relaxed" style={{ color: "#515459" }}>
              Need deep-dive analysis on a specific digital policy or civic-tech topic?
              Our researchers are available for commissioned projects, gap analyses,
              and impact assessments.
            </p>
            <div className="mt-10">
              <Button variant="primary" size="lg" href="/contact?subject=research">
                Enquire About Research Services
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Research Filter Placeholder */}
      <section style={{ background: "#f0f1f4", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
        <div className="container-max relative z-10 text-center">
          <SectionReveal variant="mask-wipe">
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Archive</p>
          </SectionReveal>

          <TextReveal variant="slide-up" className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000" }}>
            Research Archive
          </TextReveal>

          <SectionReveal variant="clip-inset" delay={0.15}>
            <div className="mt-10 border-2 border-dashed py-16 max-w-2xl mx-auto" style={{ borderRadius: 16, borderColor: "rgba(0,0,0,0.1)" }}>
              <Filter className="mx-auto h-10 w-10 mb-4" style={{ color: "#919499" }} />
              <p className="text-lg font-semibold" style={{ color: "#000" }}>Coming Soon</p>
              <p className="mt-2 max-w-md mx-auto" style={{ color: "#515459" }}>
                Full research archive with topic, country, and year filtering -- coming with our first publications.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>
      </PageTransition>
    </div>
  );
}
