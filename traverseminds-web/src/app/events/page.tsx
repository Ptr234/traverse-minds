import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Particles } from "@/components/ui/Particles";
import { Calendar, MapPin, ArrowRight, Users, Mic } from "lucide-react";

export const metadata: Metadata = {
  title: "Events — Traverse Minds",
  description: "Cybersecurity events, luncheons, hackathons, and workshops in Kampala and across East Africa.",
};

const upcomingEvents = [
  { title: "Cyber Luncheon Kampala — May 2026", type: "Luncheon", date: "15 May 2026", location: "Kampala, Uganda", slug: "/events/cyber-luncheon", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", featured: true },
];

export default function EventsPage() {
  return (
    <>
      {/* Hero with bg image */}
      <section className="relative min-h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&q=80" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-light-surface/60 via-transparent to-light-surface/80" />
        </div>
        <Particles />
        <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl py-20 lg:py-28">
            <div className="hero-bar" />
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber">Traverse Events</p>
            <h1 className="font-display text-4xl uppercase leading-[1.1] tracking-tight text-brand-charcoal md:text-5xl lg:text-6xl">
              Where leaders<br /><span className="text-brand-amber">connect</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-brand-medium">
              Luncheons, conferences, hackathons, and workshops — curated for East Africa&apos;s cybersecurity decision-makers.
            </p>
          </div>
        </div>
      </section>

      {/* Featured event */}
      <section className="bg-light-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-2xl text-brand-green md:text-3xl">Upcoming Events</h2>
          <div className="mt-8">
            {upcomingEvents.map((ev) => (
              <Link key={ev.slug} href={ev.slug} className="card-hover group block overflow-hidden rounded-2xl border border-light-border bg-light-card">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative aspect-video md:aspect-auto md:min-h-[360px]">
                    <Image src={ev.image} alt={ev.title} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/80 hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent md:hidden" />
                    {ev.featured && <span className="absolute left-4 top-4 rounded-full bg-brand-amber px-4 py-1.5 text-xs font-semibold text-white shadow-lg">Featured</span>}
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-amber">{ev.type}</span>
                    <h3 className="mt-3 font-display text-2xl text-brand-charcoal md:text-3xl">{ev.title}</h3>
                    <p className="mt-3 text-brand-medium">An intimate, curated lunch for East Africa&apos;s cybersecurity leaders. 30 seats. Real conversations, no sales pitches.</p>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-brand-muted">
                      <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{ev.date}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{ev.location}</span>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand-teal transition-all duration-300 group-hover:gap-3">
                      View Details & RSVP <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsor / Speak */}
      <section className="bg-light-surface px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            { icon: Mic, title: "Speak at Our Events", desc: "Share your expertise with East Africa's cybersecurity community.", img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=60" },
            { icon: Users, title: "Sponsor an Event", desc: "Put your brand in front of top cybersecurity decision-makers.", img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=60" },
          ].map((c) => (
            <div key={c.title} className="card-hover group overflow-hidden rounded-2xl border border-light-border bg-light-card">
              <div className="relative h-40">
                <Image src={c.img} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-white" />
                <div className="absolute bottom-4 left-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-teal/10 backdrop-blur-sm">
                    <c.icon className="h-5 w-5 text-brand-teal" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-brand-charcoal">{c.title}</h3>
                <p className="mt-2 text-sm text-brand-medium">{c.desc}</p>
                <div className="mt-4"><Button variant="outline" size="md" href="/contact">Enquire</Button></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
