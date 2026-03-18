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
      <TrustLogoStrip variant="light" />
      <NewsletterSignup />
    </>
  );
}
