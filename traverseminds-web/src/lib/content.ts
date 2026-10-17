// Content for the magazine layouts, fetched from Sanity at build time.

import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "@/sanity/client";

const builder = imageUrlBuilder(sanityClient);
type ImageSource = Parameters<typeof builder.image>[0];
const img = (source: ImageSource | null | undefined, width: number) =>
  source ? builder.image(source).width(width).auto("format").fit("max").url() : null;

export type Story = {
  kind: "post" | "report" | "event";
  title: string;
  href: string;
  date: string;
  kicker: string;
  dek?: string;
  image?: string | null;
  imageAlt?: string;
  author?: string;
  readTime?: string;
  location?: string;
};

type PostRow = { title: string; slug: string; excerpt?: string; division?: string; publishedAt: string; readTime?: string; featuredImage?: ImageSource & { alt?: string }; author?: string };
type ReportRow = { title: string; slug?: string; abstract?: string; topics?: string[]; publicationDate: string; featuredImage?: ImageSource & { alt?: string }; authors?: string[] };
type EventRow = { title: string; slug: string; date: string; location?: string; type?: string; tagline?: string; thumbnail?: ImageSource };

const firstParagraph = (text = "") => text.split(/\n\n+/)[0].trim();

export async function getMagazineContent() {
  try {
    const { posts, reports, events } = await sanityClient.fetch<{ posts: PostRow[]; reports: ReportRow[]; events: EventRow[] }>(`{
      "posts": *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...12]{
        title, "slug": slug.current, excerpt, division, publishedAt, readTime, featuredImage, "author": author->name
      },
      "reports": *[_type == "report"] | order(publicationDate desc)[0...8]{
        title, "slug": slug.current, abstract, topics, publicationDate, featuredImage, "authors": authors[]->name
      },
      "events": *[_type == "event" && defined(slug.current)] | order(date desc)[0...8]{
        title, "slug": slug.current, date, location, type, tagline, thumbnail
      }
    }`);

    const postStories: Story[] = posts.map((p) => ({
      kind: "post",
      title: p.title.trim(),
      href: `/blog/${p.slug}`,
      date: p.publishedAt,
      kicker: p.division ?? "analysis",
      dek: p.excerpt,
      image: img(p.featuredImage, 1600),
      imageAlt: p.featuredImage?.alt ?? p.title,
      author: p.author,
      readTime: p.readTime,
    }));

    const reportStories: Story[] = reports.map((r) => ({
      kind: "report",
      // Some titles were entered in capitals in the CMS; magazines set headlines in sentence/title case
      title: /^[^a-z]+$/.test(r.title.trim()) ? r.title.trim().toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase()) : r.title.trim(),
      href: r.slug ? `/think-tank/${r.slug}` : "/think-tank",
      date: r.publicationDate,
      kicker: r.topics?.[0] ?? "thinktank",
      dek: firstParagraph(r.abstract),
      image: img(r.featuredImage, 1200),
      imageAlt: r.featuredImage?.alt ?? r.title,
      author: r.authors?.filter(Boolean).join(", "),
    }));

    const eventStories: Story[] = events.map((e) => ({
      kind: "event",
      title: e.title.trim(),
      href: `/events/${e.slug}`,
      date: e.date,
      kicker: e.type ?? "events",
      dek: e.tagline,
      image: img(e.thumbnail, 1200),
      imageAlt: e.title,
      location: e.location,
    }));

    const now = Date.now();
    return {
      posts: postStories,
      reports: reportStories,
      upcomingEvents: eventStories.filter((e) => new Date(e.date).getTime() >= now).sort((a, b) => a.date.localeCompare(b.date)),
      pastEvents: eventStories.filter((e) => new Date(e.date).getTime() < now),
      // Everything, newest first, for "Latest" rails
      latest: [...postStories, ...reportStories, ...eventStories]
        .filter((s) => new Date(s.date).getTime() <= now)
        .sort((a, b) => b.date.localeCompare(a.date)),
    };
  } catch (error) {
    console.warn("Magazine content unavailable:", error);
    return { posts: [], reports: [], upcomingEvents: [], pastEvents: [], latest: [] };
  }
}

export const formatStoryDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Kampala" });
