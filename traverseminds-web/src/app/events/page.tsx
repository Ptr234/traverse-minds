import type { Metadata } from "next";
import Image from "next/image";
import { Mic, Users } from "lucide-react";
import { sanityClient } from "@/sanity/client";
import { PageTransition } from "@/components/ui/PageTransition";
import { Button } from "@/components/ui/Button";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { EventsHero } from "@/components/events/EventsHero";
import { EventsGrid } from "@/components/events/EventsGrid";
import type { SanityEvent } from "@/components/events/EventsGrid";

export const metadata: Metadata = {
  title: "Events — Traverse Minds Africa",
  description: "Luncheons, conferences, hackathons, and workshops curated for Africa's cybersecurity decision-makers.",
};


async function getEvents(): Promise<SanityEvent[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "event"] | order(date asc) {
        _id, title, "slug": slug.current, type, date, location,
        isFeatured, isPast, tagline, price, capacity,
        "thumbnailUrl": thumbnail.asset->url
      }`
    );
  } catch {
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <PageTransition>
      {/* Hero */}
      <EventsHero />

      {/* Events grid with filter — client component */}
      <EventsGrid events={events} />

      {/* Sponsor / Speak */}
      <section style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
        <SectionReveal variant="fade-up" staggerChildren={0.12} className="container-max relative z-10 max-w-4xl mx-auto grid grid-cols-1 gap-5 md:grid-cols-2">
          {[
            { icon: Mic, title: "Speak at Our Events", desc: "Share your expertise with Africa's cybersecurity community.", img: "/imagestouse/eventslide/stud (2).jpg" },
            { icon: Users, title: "Sponsor an Event", desc: "Put your brand in front of top cybersecurity decision-makers.", img: "/imagestouse/div-events.jpeg" },
          ].map((c) => (
            <RevealItem key={c.title} variant="scale-fade">
              <div className="group overflow-hidden border bg-white" style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1), 0 2px 2px 0 rgba(0,0,0,0.15), 0 1px 0 0 rgba(0,0,0,0.05)" }}>
                <div className="relative h-40 overflow-hidden">
                  <Image src={c.img} alt="" fill className="object-cover" />
                  <div className="absolute inset-0 bg-linear-to-b from-transparent to-white" />
                  <div className="absolute bottom-4 left-4">
                    <div className="flex h-10 w-10 items-center justify-center bg-accent/10" style={{ borderRadius: 8 }}>
                      <c.icon className="h-5 w-5 text-accent" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold" style={{ color: "#000" }}>{c.title}</h3>
                  <p className="mt-2 text-sm" style={{ color: "#515459" }}>{c.desc}</p>
                  <div className="mt-5">
                    <Button variant="outline" size="sm" href="/contact">Enquire</Button>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </SectionReveal>
      </section>
    </PageTransition>
  );
}
