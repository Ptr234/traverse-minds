import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { StatsCounter } from "@/components/home/StatsCounter";
import { FeaturedDivision } from "@/components/home/FeaturedDivision";
import { PublicRecordTeaser } from "@/components/home/PublicRecordTeaser";
import { TrustLogoStrip } from "@/components/ui/TrustLogoStrip";
import { PageTransition } from "@/components/ui/PageTransition";

const ThinkTankPreview = dynamic(() =>
  import("@/components/home/ThinkTankPreview").then((m) => m.ThinkTankPreview)
);
const UpcomingEvent = dynamic(() =>
  import("@/components/home/UpcomingEvent").then((m) => m.UpcomingEvent)
);
const PodcastPreview = dynamic(() =>
  import("@/components/home/PodcastPreview").then((m) => m.PodcastPreview)
);
const AfricaMapReveal = dynamic(() =>
  import("@/components/home/AfricaMapReveal").then((m) => m.AfricaMapReveal)
);
const AfricaMap = dynamic(() =>
  import("@/components/ui/AfricaMap").then((m) => m.AfricaMap)
);
const NewsletterSignup = dynamic(() =>
  import("@/components/home/NewsletterSignup").then((m) => m.NewsletterSignup)
);

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
