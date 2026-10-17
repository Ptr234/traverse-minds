import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextBlock } from "next-sanity";
import { sanityClient } from "@/sanity/client";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { CountdownTimer } from "@/components/events/CountdownTimer";
import { RsvpForm } from "@/components/events/RsvpForm";
import { SectionBar } from "@/components/magazine/SectionBar";
import { Kicker, SectionHeader, StoryCard } from "@/components/magazine/primitives";
import { ARTICLE_PROSE } from "@/components/magazine/Article";
import { getMagazineContent } from "@/lib/content";

interface EventDetail {
  title: string;
  type?: string;
  date: string;
  endDate?: string;
  location?: string;
  description?: PortableTextBlock[];
  thumbnailUrl?: string;
  capacity?: number;
  tagline?: string;
  price?: string;
  galleryUrls?: string[];
}

async function getEvent(slug: string): Promise<EventDetail | null> {
  try {
    return await sanityClient.fetch(
      `*[_type == "event" && slug.current == $slug][0]{
        title, type, date, endDate, location, description, capacity, tagline, price,
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
    const slugs: { slug: string }[] = await sanityClient.fetch(`*[_type == "event"]{ "slug": slug.current }`);
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return { title: "Event Not Found" };
  return {
    title: `${event.title.trim()} — Traverse Events`,
    description: event.tagline || `${event.title.trim()} — a Traverse Minds Africa event.`,
    openGraph: event.thumbnailUrl ? { images: [event.thumbnailUrl] } : undefined,
  };
}

const TZ = "Africa/Kampala";

// Static export: "past" is decided at build time and refreshed by each deploy; the countdown runs live in the browser
const hasStarted = (iso: string) => new Date(iso).getTime() < Date.now();

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [event, { upcomingEvents, pastEvents }] = await Promise.all([getEvent(slug), getMagazineContent()]);
  if (!event) notFound();

  const href = `/events/${slug}`;
  const title = event.title.trim();
  const start = new Date(event.date);
  const isPast = hasStarted(event.date);
  const format = event.type ? event.type.charAt(0).toUpperCase() + event.type.slice(1) : undefined;

  const facts = [
    { label: "Date", value: start.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: TZ }) },
    event.date.includes("T") ? { label: "Time", value: `${start.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: TZ })} EAT` } : null,
    event.location ? { label: "Venue", value: event.location } : null,
    format ? { label: "Format", value: format } : null,
    event.capacity ? { label: "Capacity", value: `${event.capacity} seats, by invitation` } : null,
    event.price ? { label: "Price", value: event.price } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const others = [...upcomingEvents, ...pastEvents].filter((e) => e.href !== href);

  return (
    <>
      <SectionBar />
      <article>
        <header className="container-max pt-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Events", href: "/events" }, { name: title, href }]} />
          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Kicker>{isPast ? "Past event" : "Upcoming event"}{format ? ` · ${format}` : ""}</Kicker>
              <h1 className="mt-3 font-serif text-[36px] font-semibold leading-[1.08] tracking-[-0.01em] text-black md:text-[52px]">{title}</h1>
              {event.tagline && <p className="mt-5 text-[21px] leading-relaxed text-gn-400">{event.tagline}</p>}
              <div className="mt-8">
                {isPast ? (
                  <p className="border-l-4 border-gn-600 pl-4 text-[15px] font-medium text-gn-400">This event has concluded.</p>
                ) : (
                  <div className="flex flex-wrap items-center gap-6">
                    <CountdownTimer targetDate={event.date} />
                    <Button variant="primary" size="lg" href="#rsvp">Reserve your seat</Button>
                  </div>
                )}
              </div>
            </div>

            {/* Fact box */}
            <aside className="lg:col-span-5" aria-label="Event details">
              <dl className="border-t-2 border-black">
                {facts.map((f) => (
                  <div key={f.label} className="grid grid-cols-[110px_1fr] gap-4 border-b border-black/10 py-3">
                    <dt className="text-[12px] font-bold uppercase tracking-wider text-gn-500">{f.label}</dt>
                    <dd className="text-[15px] text-black">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </header>

        {event.thumbnailUrl && (
          <figure className="container-max mt-10">
            <div className="relative aspect-[16/9] overflow-hidden bg-gn-800">
              <Image src={event.thumbnailUrl} alt={title} fill priority className="object-cover" sizes="(max-width: 1280px) 100vw, 1240px" />
            </div>
          </figure>
        )}

        {event.description?.length ? (
          <div className="container-max py-12">
            <div className="mx-auto max-w-[680px]">
              <h2 className="border-t-2 border-black pt-3 font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-black">About this event</h2>
              <div className={`mt-6 ${ARTICLE_PROSE}`}>
                <PortableText value={event.description} />
              </div>
            </div>
          </div>
        ) : null}

        {event.galleryUrls && event.galleryUrls.length > 0 && (
          <section className="container-max pb-12">
            <SectionHeader title="Photos" />
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {event.galleryUrls.map((url, i) => (
                <div key={url} className="relative aspect-square overflow-hidden bg-gn-800">
                  <Image src={url} alt={`${title}, photo ${i + 1}`} fill className="object-cover transition-transform duration-500 hover:scale-[1.03]" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                </div>
              ))}
            </div>
          </section>
        )}

        {!isPast && (
          <section id="rsvp" className="border-t border-black/10 bg-gn-900">
            <div className="container-max py-14">
              <div className="mx-auto max-w-xl">
                <SectionHeader title="Reserve your seat" />
                <p className="text-[15px] leading-relaxed text-gn-400">
                  {event.capacity ? `Spaces are limited to ${event.capacity} guests.` : "Spaces are limited."} We&apos;ll confirm within 48 hours.
                </p>
                <div className="mt-8">
                  <RsvpForm eventTitle={title} />
                </div>
              </div>
            </div>
          </section>
        )}
      </article>

      {others.length > 0 && (
        <section className="border-t border-black/10 bg-white">
          <div className="container-max py-12">
            <SectionHeader title="More events" href="/events" />
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {others.slice(0, 3).map((s) => (
                <StoryCard key={s.href} story={s} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
