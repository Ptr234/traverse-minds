import type { MetadataRoute } from "next";
import { sanityClient } from "@/sanity/client";
import { programmes } from "@/lib/programmes";

export const dynamic = "force-static";

const SITE_URL = "https://traverseminds.com";

// trailingSlash is enabled in next.config.ts, so canonical URLs end in "/"
const url = (path: string) => `${SITE_URL}${path === "/" ? "/" : `${path}/`}`;

type Freq = MetadataRoute.Sitemap[number]["changeFrequency"];

const staticRoutes: { path: string; changeFrequency: Freq; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/meet-christine", changeFrequency: "monthly", priority: 0.7 },
  { path: "/security", changeFrequency: "monthly", priority: 0.9 },
  { path: "/security/penetration-testing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/security/incident-response", changeFrequency: "monthly", priority: 0.8 },
  { path: "/security/iso-27001-compliance", changeFrequency: "monthly", priority: 0.8 },
  { path: "/security/bank-of-uganda-audit", changeFrequency: "monthly", priority: 0.8 },
  { path: "/security/regulatory-advisory", changeFrequency: "monthly", priority: 0.8 },
  { path: "/security/threat-modelling", changeFrequency: "monthly", priority: 0.8 },
  { path: "/literacy", changeFrequency: "monthly", priority: 0.8 },
  { path: "/accuracy-mentorship", changeFrequency: "monthly", priority: 0.8 },
  { path: "/events", changeFrequency: "weekly", priority: 0.8 },
  { path: "/think-tank", changeFrequency: "monthly", priority: 0.8 },
  { path: "/think-tank/archive", changeFrequency: "monthly", priority: 0.6 },
  { path: "/public-record", changeFrequency: "monthly", priority: 0.8 },
  { path: "/media", changeFrequency: "weekly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/careers", changeFrequency: "weekly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
];

type SanityEntry = { slug: string; updatedAt: string };

async function fetchSlugs(type: string): Promise<SanityEntry[]> {
  try {
    const entries = await sanityClient.fetch<SanityEntry[]>(
      `*[_type == $type && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }`,
      { type }
    );
    return entries ?? [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, events, reports] = await Promise.all([
    fetchSlugs("post"),
    fetchSlugs("event"),
    fetchSlugs("report"),
  ]);

  const toEntries = (base: string, entries: SanityEntry[], priority: number): MetadataRoute.Sitemap =>
    entries.map((e) => ({
      url: url(`${base}/${e.slug}`),
      lastModified: new Date(e.updatedAt),
      changeFrequency: "monthly",
      priority,
    }));

  return [
    ...staticRoutes.map((r) => ({
      url: url(r.path),
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...programmes.map((p) => ({
      url: url(`/literacy/${p.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...toEntries("/blog", posts, 0.6),
    ...toEntries("/events", events, 0.6),
    ...toEntries("/think-tank", reports, 0.7),
  ];
}
