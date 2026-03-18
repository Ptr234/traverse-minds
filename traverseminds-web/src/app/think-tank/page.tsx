import { Metadata } from "next";
import { Hero } from "@/components/think-tank/Hero";
import { ResearchAreas } from "@/components/think-tank/ResearchAreas";
import { Publications } from "@/components/think-tank/Publications";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Think Tank | Evidence-Driven Digital Policy Research in East Africa",
  description: "Bridging the gap between technology and policy. We provide independent research on data protection, AI governance, and digital rights.",
};

export default function ThinkTankPage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ResearchAreas />
      <Publications />

      {/* Gated Content */}
      <section className="relative bg-primary section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/3 translate-y-1/3 rounded-full bg-accent/5 blur-[120px]" />

        <div className="container-max relative z-10">
          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
                Get the <span className="text-gradient-accent">State of Digital Rights</span> Report
              </h2>
              <p className="mt-5 text-base text-white/50 leading-relaxed">
                Our annual comprehensive analysis of the digital policy landscape
                across Uganda, Kenya, and Tanzania. Free for registered organisations.
              </p>
            </div>

            <div className="w-full max-w-sm rounded-3xl border border-white/6 bg-surface-dark-elevated p-8">
              <h3 className="font-display text-lg font-bold text-white">Download the Report</h3>
              <form className="mt-6 space-y-4">
                <input
                  type="email"
                  placeholder="Your work email"
                  className="w-full rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-accent/40 transition-colors"
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
          </div>
        </div>
      </section>

      {/* Commission Research */}
      <section id="commission" className="relative bg-white section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid-light opacity-30 pointer-events-none" />

        <div className="container-max relative z-10 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
            Commission Research
          </h2>
          <p className="mt-5 mx-auto max-w-2xl text-base text-brand-medium/60 leading-relaxed">
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
        </div>
      </section>
    </div>
  );
}
