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
import { AfricaMap } from "@/components/ui/AfricaMap";
import { AfricaMapReveal } from "@/components/home/AfricaMapReveal";
import { PageTransition } from "@/components/ui/PageTransition";

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <StatsCounter />
      <WhatWeDo />
      <FeaturedDivision />
      <PublicRecordTeaser />
      <ThinkTankPreview />
      <UpcomingEvent />
      <PodcastPreview />
      {/* African Coverage */}
      <AfricaMapReveal>
        <AfricaMap />
      </AfricaMapReveal>

      <section className="section-padding-sm overflow-hidden">
        <TrustLogoStrip variant="light" />
      </section>
      <NewsletterSignup />
    </PageTransition>
  );
}
