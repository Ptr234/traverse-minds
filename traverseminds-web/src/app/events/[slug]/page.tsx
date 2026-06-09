import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Users, Tag, ArrowLeft, Utensils } from "lucide-react";
import { sanityClient } from "@/sanity/client";
import { PageTransition } from "@/components/ui/PageTransition";
import { Button } from "@/components/ui/Button";
import { Particles } from "@/components/ui/Particles";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { CountdownTimer } from "@/components/events/CountdownTimer";
import { RsvpForm } from "@/components/events/RsvpForm";

interface EventDetail {
  _id: string;
  title: string;
  slug: string;
  type?: string;
  date: string;
  endDate?: string;
  location?: string;
  description?: { _type: string; children?: { text: string }[] }[];
  thumbnailUrl?: string;
  capacity?: number;
  tagline?: string;
  price?: string;
  galleryUrls?: string[];
  isFeatured?: boolean;
  isPast?: boolean;
}

async function getEvent(slug: string): Promise<EventDetail | null> {
  try {
    return await sanityClient.fetch(
      `*[_type == "event" && slug.current == $slug][0]{
        _id, title, "slug": slug.current, type, date, endDate, location,
        description, capacity, tagline, price, isFeatured, isPast,
        "thumbnailUrl": thumbnail.asset->url,
        "galleryUrls": galleryImages[].asset->url
      }`,
      { slug }
    );
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const slugs: { slug: string }[] = await sanityClient.fetch(
      `*[_type == "event"]{ "slug": slug.current }`
    );
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return { title: "Event Not Found" };
  return {
    title: `${event.title} — Traverse Events`,
    description: event.tagline || `${event.title} — a Traverse Minds Africa event.`,
  };
}

function plainText(blocks?: EventDetail["description"]): string {
  if (!blocks) return "";
  return blocks
    .flatMap((b) => b.children?.map((c) => c.text) ?? [])
    .join(" ");
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  const details = [
    { icon: Calendar, label: "Date", val: new Date(event.date).toLocaleDateString("en-UG", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) + (event.date.includes("T") ? `, ${new Date(event.date).toLocaleTimeString("en-UG", { hour: "2-digit", minute: "2-digit", timeZoneName: "short" })}` : "") },
    event.location ? { icon: MapPin, label: "Venue", val: event.location } : null,
    event.capacity ? { icon: Users, label: "Capacity", val: `${event.capacity} seats (curated)` } : null,
    event.type ? { icon: Utensils, label: "Format", val: event.type } : null,
    event.price ? { icon: Tag, label: "Price", val: event.price } : null,
  ].filter(Boolean) as { icon: React.ElementType; label: string; val: string }[];

  const descText = plainText(event.description);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          {event.thumbnailUrl ? (
            <Image src={event.thumbnailUrl} alt="" fill className="object-cover" />
          ) : (
            <div className="absolute inset-0" style={{ background: "#0a0a0a" }} />
          )}
          <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/85 to-white/40" />
          <div className="absolute inset-0 bg-linear-to-b from-light-surface/60 via-transparent to-light-surface/80" />
        </div>
        <Particles />
        <div className="relative mx-auto flex min-h-[80vh] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl py-20 lg:py-28">
            <SectionReveal variant="fade-up" delay={0}>
              <div className="mb-6">
                <Button variant="ghost" href="/events" className="inline-flex items-center gap-2 text-sm" style={{ color: "#515459" }}>
                  <ArrowLeft className="h-4 w-4" /> Back to Events
                </Button>
              </div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber">Traverse Events</p>
            </SectionReveal>
            <SectionReveal variant="fade-blur" delay={0.1}>
              <h1 className="font-display text-4xl uppercase leading-[1.1] tracking-tight text-brand-charcoal md:text-5xl lg:text-6xl">
                {event.title}
              </h1>
            </SectionReveal>
            {event.tagline && (
              <SectionReveal variant="slide-up" delay={0.2}>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-brand-medium">{event.tagline}</p>
              </SectionReveal>
            )}
            <SectionReveal variant="scale-fade" delay={0.3}>
              <div className="mt-8"><CountdownTimer targetDate={event.date} /></div>
              {!event.isPast && (
                <div className="mt-8"><Button variant="primary" size="lg" href="#rsvp">Reserve Your Seat</Button></div>
              )}
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="bg-light-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <TextReveal as="h2" variant="blur-in" className="font-display text-2xl text-brand-green md:text-3xl">
              About This Event
            </TextReveal>
            {descText && (
              <SectionReveal variant="fade-up" delay={0.1}>
                <p className="mt-4 leading-relaxed text-brand-medium">{descText}</p>
              </SectionReveal>
            )}
            <SectionReveal variant="fade-up" staggerChildren={0.1} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {details.map((d) => {
                const Icon = d.icon;
                return (
                <RevealItem key={d.label} variant="slide-up">
                  <div className="card-hover group flex items-start gap-3 rounded-xl border border-light-border bg-light-card p-4">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
                    <div>
                      <p className="text-sm font-semibold text-brand-charcoal">{d.label}</p>
                      <p className="text-sm text-brand-medium">{d.val}</p>
                    </div>
                  </div>
                </RevealItem>
                );
              })}
            </SectionReveal>
          </div>
          {event.thumbnailUrl && (
            <SectionReveal variant="clip-left">
              <div className="relative aspect-4/3 overflow-hidden rounded-xl">
                <Image src={event.thumbnailUrl} alt={event.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </SectionReveal>
          )}
        </div>
      </section>

      {/* Gallery */}
      {event.galleryUrls && event.galleryUrls.length > 0 && (
        <section className="bg-light-surface px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionReveal variant="fade-up">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber">Gallery</span>
            </SectionReveal>
            <TextReveal as="h2" variant="clip-up" className="mt-3 font-display text-2xl text-brand-green md:text-3xl">
              Event Photos
            </TextReveal>
            <SectionReveal variant="fade-up" staggerChildren={0.06} className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {event.galleryUrls.map((url, i) => (
                <RevealItem key={url} variant="scale-fade">
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image src={url} alt={`${event.title} photo ${i + 1}`} fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                  </div>
                </RevealItem>
              ))}
            </SectionReveal>
          </div>
        </section>
      )}

      {/* RSVP */}
      {!event.isPast && (
        <section id="rsvp" className="bg-light-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-xl text-center">
            <SectionReveal variant="slide-up">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber">Register</span>
            </SectionReveal>
            <TextReveal as="h2" variant="fade-up" className="mt-3 font-display text-2xl text-brand-green md:text-3xl">
              Reserve Your Seat
            </TextReveal>
            <SectionReveal variant="mask-wipe" delay={0.1}>
              <p className="mt-3 text-brand-medium">
                {event.capacity ? `Spaces limited to ${event.capacity} guests.` : "Spaces are limited."} We&apos;ll confirm within 48 hours.
              </p>
            </SectionReveal>
            <SectionReveal variant="clip-inset" delay={0.2}>
              <div className="mt-8 text-left">
                <RsvpForm eventTitle={event.title} />
              </div>
            </SectionReveal>
          </div>
        </section>
      )}
    </PageTransition>
  );
}
