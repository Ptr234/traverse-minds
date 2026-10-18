// Editable content from Sanity, with the defaults in src/content/ as the fallback. Every loader
// returns the default copy when Sanity is unreachable or a document has not been created yet, so a
// build never breaks and nothing disappears from the site before it is seeded.

import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "@/sanity/client";
import { SITE_DEFAULTS, type SiteSettings } from "@/content/site";
import { PARTNERS, type Partner } from "@/content/partners";
import { SERVICES, type ServiceContent } from "@/content/services";
import { programmes as PROGRAMMES, type Programme } from "@/content/programmes";
import { ORGANISATIONS, type OrganisationContent } from "@/content/organisations";
import { TEAM, type TeamContent } from "@/content/team";

const builder = imageUrlBuilder(sanityClient);
type ImageRef = Parameters<typeof builder.image>[0] & { asset?: { _ref?: string } };

/** Photo URL from Sanity, resized; local defaults are URL-encoded (some file names have spaces). */
function photo(image: ImageRef | null | undefined, width: number, fallback: string): string {
  if (image?.asset?._ref) return builder.image(image).width(width).auto("format").fit("max").url();
  return encodeURI(fallback);
}

const local = (path: string) => encodeURI(path);

/** Sanity reads, retried a couple of times so a brief API hiccup does not ship the fallback copy. */
async function query<T>(groq: string, params: Record<string, unknown> = {}): Promise<T | null> {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await sanityClient.fetch<T>(groq, params);
    } catch (err) {
      if (attempt === 3) {
        console.warn(`Sanity query failed, using defaults: ${(err as Error).message}`);
        return null;
      }
      await new Promise((r) => setTimeout(r, 500 * attempt));
    }
  }
  return null;
}

// ── Site settings ──────────────────────────────────────────────────────────

type SettingsDoc = Partial<Record<keyof SiteSettings, unknown>> & {
  heroSlides?: (ImageRef & { alt?: string })[];
};

export type ResolvedSettings = Omit<SiteSettings, "heroSlides"> & { heroSlides: string[] };

export async function getSiteSettings(): Promise<ResolvedSettings> {
  const doc = await query<SettingsDoc>(`*[_id == "siteSettings"][0]`);
  const text = (key: "heroEyebrow" | "heroHeadline" | "heroDek") =>
    typeof doc?.[key] === "string" && (doc[key] as string).trim() ? (doc[key] as string) : SITE_DEFAULTS[key];
  const slides = (doc?.heroSlides ?? []).filter((s) => s?.asset?._ref).map((s) => photo(s, 2000, ""));
  return {
    heroEyebrow: text("heroEyebrow"),
    heroHeadline: text("heroHeadline"),
    heroDek: text("heroDek"),
    heroSlides: slides.length ? slides : SITE_DEFAULTS.heroSlides.map(local),
    aboutImage: photo(doc?.aboutImage as ImageRef, 1400, SITE_DEFAULTS.aboutImage),
    securityImage: photo(doc?.securityImage as ImageRef, 1400, SITE_DEFAULTS.securityImage),
    timelineImage: photo(doc?.timelineImage as ImageRef, 2000, SITE_DEFAULTS.timelineImage),
    eventsSpeakImage: photo(doc?.eventsSpeakImage as ImageRef, 1400, SITE_DEFAULTS.eventsSpeakImage),
    eventsSponsorImage: photo(doc?.eventsSponsorImage as ImageRef, 1400, SITE_DEFAULTS.eventsSponsorImage),
    christinePortrait: photo(doc?.christinePortrait as ImageRef, 1400, SITE_DEFAULTS.christinePortrait),
    christineProfileImage: photo(doc?.christineProfileImage as ImageRef, 1000, SITE_DEFAULTS.christineProfileImage),
  };
}

// ── Partners ───────────────────────────────────────────────────────────────

export async function getPartners(): Promise<Partner[]> {
  // Logos use the original file so SVGs stay crisp
  const docs = await query<{ name: string; logo: string | null }[]>(
    `*[_type == "partner" && isActive != false && defined(logo)] | order(sortOrder asc, name asc){ name, "logo": logo.asset->url }`
  );
  const live = (docs ?? []).filter((p) => p.logo) as Partner[];
  return live.length ? live : PARTNERS.map((p) => ({ ...p, logo: local(p.logo) }));
}

// ── Security services ──────────────────────────────────────────────────────

type ServiceDoc = Omit<ServiceContent, "image" | "description"> & { image?: ImageRef; shortDescription: string };

const SERVICE_FIELDS = `"slug": slug.current, sortOrder, title, shortDescription, image, overview, features[]{title, description}, benefits`;

function toService(doc: ServiceDoc): ServiceContent {
  const fallback = SERVICES.find((s) => s.slug === doc.slug);
  return {
    slug: doc.slug,
    sortOrder: doc.sortOrder ?? fallback?.sortOrder ?? 99,
    title: doc.title,
    description: doc.shortDescription ?? fallback?.description ?? "",
    image: photo(doc.image, 1600, fallback?.image ?? SERVICES[0].image),
    overview: doc.overview ?? fallback?.overview ?? "",
    features: doc.features?.length ? doc.features : fallback?.features ?? [],
    benefits: doc.benefits?.length ? doc.benefits : fallback?.benefits ?? [],
  };
}

const localService = (s: ServiceContent): ServiceContent => ({ ...s, image: local(s.image) });

export async function getServices(): Promise<ServiceContent[]> {
  const docs = await query<ServiceDoc[]>(`*[_type == "service" && isActive != false] | order(sortOrder asc){ ${SERVICE_FIELDS} }`);
  return docs?.length ? docs.map(toService) : SERVICES.map(localService);
}

/** One service page. Each page has its own route, so an unknown slug falls back to the default copy. */
export async function getService(slug: string): Promise<ServiceContent> {
  const doc = await query<ServiceDoc | null>(`*[_type == "service" && slug.current == $slug][0]{ ${SERVICE_FIELDS} }`, { slug });
  if (doc) return toService(doc);
  const fallback = SERVICES.find((s) => s.slug === slug);
  if (!fallback) throw new Error(`Unknown service: ${slug}`);
  return localService(fallback);
}

// ── Literacy programmes ────────────────────────────────────────────────────

type ProgrammeDoc = Omit<Programme, "id" | "image" | "secondaryImage" | "color"> & {
  _id: string;
  featuredImage?: ImageRef;
  secondaryImage?: ImageRef;
};

function toProgramme(doc: ProgrammeDoc): Programme {
  const fallback = PROGRAMMES.find((p) => p.slug === doc.slug);
  return {
    id: doc._id,
    slug: doc.slug,
    title: doc.title,
    audience: doc.audience ?? fallback?.audience ?? "business",
    duration: doc.duration ?? fallback?.duration ?? "",
    format: doc.format ?? fallback?.format ?? "",
    description: doc.description ?? fallback?.description ?? "",
    longDescription: doc.longDescription ?? fallback?.longDescription ?? doc.description ?? "",
    topics: doc.topics?.length ? doc.topics : fallback?.topics ?? [],
    learningOutcomes: doc.learningOutcomes?.length ? doc.learningOutcomes : fallback?.learningOutcomes ?? [],
    image: photo(doc.featuredImage, 1600, fallback?.image ?? PROGRAMMES[0].image),
    secondaryImage: photo(doc.secondaryImage, 1200, fallback?.secondaryImage ?? PROGRAMMES[0].secondaryImage),
    color: fallback?.color ?? "#ff4c00",
  };
}

const localProgramme = (p: Programme): Programme => ({ ...p, image: local(p.image), secondaryImage: local(p.secondaryImage) });

// Sample programmes from the first CMS seed; they were never on the site (the seed also switches them off)
const SAMPLE_PROGRAMMES = ["prog-cyber-safety-schools", "prog-digital-security-smes", "prog-govt-cyber-awareness"];

export async function getProgrammes(): Promise<Programme[]> {
  const docs = await query<ProgrammeDoc[]>(
    `*[_type == "programme" && isActive != false && defined(slug.current) && !(_id in $samples)] | order(sortOrder asc, title asc){
      _id, "slug": slug.current, title, audience, duration, format, description, longDescription, topics,
      learningOutcomes, featuredImage, secondaryImage
    }`,
    { samples: SAMPLE_PROGRAMMES }
  );
  return docs?.length ? docs.map(toProgramme) : PROGRAMMES.map(localProgramme);
}

// ── Meet Christine: organisations ──────────────────────────────────────────

export async function getOrganisations(): Promise<OrganisationContent[]> {
  const docs = await query<(Omit<OrganisationContent, "logo"> & { logo: string | null })[]>(
    `*[_type == "organisation"] | order(sortOrder asc){ name, role, description, "logo": logo.asset->url, website, sortOrder }`
  );
  if (docs?.length) return docs.map((o) => ({ ...o, description: o.description ?? "", website: o.website ?? "", logo: o.logo ?? "" }));
  return ORGANISATIONS.map((o) => ({ ...o, logo: local(o.logo) }));
}

// ── Team ───────────────────────────────────────────────────────────────────

export async function getTeam(): Promise<TeamContent[]> {
  const docs = await query<(Omit<TeamContent, "photo"> & { photo?: ImageRef })[]>(
    `*[_type == "teamMember" && isActive != false] | order(sortOrder asc){ name, title, division, photo, linkedIn }`
  );
  if (docs?.length) {
    return docs.map((m) => {
      const fallback = TEAM.find((t) => t.name === m.name);
      return { ...m, division: m.division ?? "", photo: photo(m.photo, 800, fallback?.photo ?? TEAM[0].photo) };
    });
  }
  return TEAM.map((t) => ({ ...t, photo: local(t.photo) }));
}

/** Props for ServiceDetailLayout. */
export const serviceLayoutProps = (s: ServiceContent) => ({
  slug: s.slug,
  title: s.title,
  description: s.description,
  image: s.image,
  content: { overview: s.overview, features: s.features, benefits: s.benefits },
});

/** Page metadata for a service page. */
export const serviceMetadata = (s: ServiceContent) => ({ title: `${s.title} | Traverse Security`, description: s.description });

// ── Careers ────────────────────────────────────────────────────────────────

export type Job = { id: string; title: string; division: string; type: string; location: string; description: string; deadline: string };

/** Active listings whose deadline has not passed at build time (the page re-checks in the browser). */
export async function getJobs(): Promise<Job[]> {
  const today = new Date().toISOString().slice(0, 10);
  const docs = await query<Job[]>(
    `*[_type == "jobListing" && isActive != false && deadline >= $today] | order(deadline asc){
      "id": _id, title, division, type, location, description, deadline
    }`,
    { today }
  );
  return docs ?? [];
}
