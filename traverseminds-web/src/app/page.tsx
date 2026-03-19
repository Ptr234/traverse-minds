import { Hero } from "@/components/home/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { StatsCounter } from "@/components/home/StatsCounter";
import { FeaturedDivision } from "@/components/home/FeaturedDivision";
import { PublicRecordTeaser } from "@/components/home/PublicRecordTeaser";
import { ThinkTankPreview } from "@/components/home/ThinkTankPreview";
import { UpcomingEvent } from "@/components/home/UpcomingEvent";
import { PodcastPreview } from "@/components/home/PodcastPreview";
import { TrustLogoStrip } from "@/components/ui/TrustLogoStrip";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import { EACMap } from "@/components/ui/EACMap";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsCounter />
      <WhatWeDo />
      <FeaturedDivision />
      <PublicRecordTeaser />
      <ThinkTankPreview />
      <UpcomingEvent />
      <PodcastPreview />
      {/* EAC Coverage */}
      <section className="relative bg-white section-padding overflow-hidden border-t border-border-light">
        <div className="container-max">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">Coverage</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Operating Across East Africa
            </h2>
            <p className="mt-3 text-brand-medium/60 max-w-lg mx-auto">
              Headquartered in Kampala, serving all five EAC member states.
            </p>
          </div>
          <EACMap />
        </div>
      </section>

      <section className="section-padding-sm overflow-hidden">
        <TrustLogoStrip variant="light" />
      </section>
      <NewsletterSignup />
    </>
  );
}
