import { Hero } from "@/components/home/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { StatsCounter } from "@/components/home/StatsCounter";
import { FeaturedDivision } from "@/components/home/FeaturedDivision";
import { UpcomingEvent } from "@/components/home/UpcomingEvent";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsCounter />
      <WhatWeDo />
      <FeaturedDivision />
      <UpcomingEvent />
      <NewsletterSignup />
    </>
  );
}
