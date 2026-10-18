import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionBar } from "@/components/magazine/SectionBar";
import { PageHeader } from "@/components/magazine/PageHeader";
import { Diary } from "@/components/magazine/Diary";
import { StorySection } from "@/components/magazine/StorySection";
import { SectionHeader } from "@/components/magazine/primitives";
import { getMagazineContent } from "@/lib/content";
import { getSiteSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Events",
  description: "Luncheons, conferences, hackathons and workshops curated for Africa's cybersecurity decision-makers.",
};

const TAKE_PART = [
  {
    title: "Speak at our events",
    text: "Share your expertise with Africa's cybersecurity, policy and technology community at the Cyber Luncheon and our forums.",
    img: "eventsSpeakImage" as const,
    label: "Propose a talk",
    href: "/contact?subject=speaking",
  },
  {
    title: "Sponsor an event",
    text: "Put your organisation in front of the banks, regulators and agencies shaping digital security in the region.",
    img: "eventsSponsorImage" as const,
    label: "Sponsorship enquiry",
    href: "/contact?subject=sponsorship",
  },
];

export default async function EventsPage() {
  const [{ upcomingEvents, pastEvents }, settings] = await Promise.all([getMagazineContent(), getSiteSettings()]);

  return (
    <>
      <SectionBar />
      <PageHeader
        crumbs={[{ name: "Home", href: "/" }, { name: "Events", href: "/events" }]}
        kicker="Traverse Events"
        title="Events"
        dek="Luncheons, conferences, hackathons and workshops curated for Africa's cybersecurity decision-makers."
      />

      {upcomingEvents.length === 0 && (
        <div className="container-max">
          <p className="border-y border-black/15 py-4 text-[15px] text-gn-400">
            No events are scheduled right now.{" "}
            <Link href="/#newsletter" className="font-medium text-black underline underline-offset-4 hover:text-accent">Subscribe to the briefing</Link>{" "}
            to hear about the next Cyber Luncheon first.
          </p>
        </div>
      )}

      <Diary
        upcoming={upcomingEvents}
        past={pastEvents}
        total={upcomingEvents.length + 6}
        title={upcomingEvents.length ? "Coming up & recent" : "Recent events"}
      />
      <StorySection title="From past events" stories={pastEvents} background="paper" />

      <section className="bg-white">
        <div className="container-max py-12">
          <SectionHeader title="Take part" />
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
            {TAKE_PART.map((c) => (
              <article key={c.title} className="group">
                <div className="tech-card relative aspect-[16/9] overflow-hidden bg-gn-800">
                  <Image src={settings[c.img]} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <h3 className="mt-5 font-serif text-[24px] font-semibold text-black">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-gn-400">{c.text}</p>
                <div className="mt-5">
                  <Button variant="outline" size="sm" href={c.href}>{c.label}</Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
