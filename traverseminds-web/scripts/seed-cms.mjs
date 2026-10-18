// Seeds Sanity with every piece of site content that used to be hard-coded: Site Settings (home
// hero, page images), partners, security services, literacy programmes, Meet Christine
// organisations and the author photo. Images and files are uploaded from public/.
//
// Safe to re-run: documents are created only if missing (fixed IDs), so edits made in the Studio
// are never overwritten. Pass --force to reset them to the defaults in src/content/.
//
//   pnpm seed:cms --dry                 # build everything, upload nothing
//   pnpm seed:cms                       # needs an Editor token (see below)
//
// The token needs Editor rights. Without SANITY_WRITE_TOKEN the script reads `sanity_editor=` from
// the repository's root .env file (never printed).

import { createReadStream, readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import { SITE_DEFAULTS } from "../src/content/site.ts";
import { PARTNERS } from "../src/content/partners.ts";
import { SERVICES } from "../src/content/services.ts";
import { programmes as PROGRAMMES } from "../src/content/programmes.ts";
import { ORGANISATIONS } from "../src/content/organisations.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DRY = process.argv.includes("--dry");
const FORCE = process.argv.includes("--force");

function token() {
  if (process.env.SANITY_WRITE_TOKEN) return process.env.SANITY_WRITE_TOKEN.trim();
  const envFile = path.resolve(ROOT, "..", ".env");
  if (!existsSync(envFile)) return "";
  const line = readFileSync(envFile, "utf8").split(/\r?\n/).find((l) => /^\s*sanity_editor\s*=/.test(l));
  return line ? line.slice(line.indexOf("=") + 1).replace(/^[=\s"']+|["'\s]+$/g, "") : "";
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "f5v11nkd",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: DRY ? undefined : token(),
  useCdn: false,
});

// ── uploads ────────────────────────────────────────────────────────────────

const uploaded = new Map();
let uploads = 0;

/** Uploads public/<file> once per run (Sanity also de-duplicates identical files) and returns its asset id. */
async function asset(kind, publicPath) {
  if (uploaded.has(publicPath)) return uploaded.get(publicPath);
  const file = path.join(ROOT, "public", decodeURI(publicPath));
  if (!existsSync(file)) throw new Error(`Missing file: public${publicPath}`);
  let id = `${kind}-dry-${uploaded.size}`;
  if (!DRY) {
    const doc = await client.assets.upload(kind, createReadStream(file), { filename: path.basename(file) });
    id = doc._id;
  }
  uploads += 1;
  uploaded.set(publicPath, id);
  return id;
}

const image = async (publicPath, alt) => ({
  _type: "image",
  asset: { _type: "reference", _ref: await asset("image", publicPath) },
  ...(alt ? { alt } : {}),
});

const key = (i) => `k${i}`;

// ── documents ──────────────────────────────────────────────────────────────

async function buildDocuments() {
  const docs = [];

  docs.push({
    _id: "siteSettings",
    _type: "siteSettings",
    heroEyebrow: SITE_DEFAULTS.heroEyebrow,
    heroHeadline: SITE_DEFAULTS.heroHeadline,
    heroDek: SITE_DEFAULTS.heroDek,
    heroSlides: await Promise.all(
      SITE_DEFAULTS.heroSlides.map(async (p, i) => ({ ...(await image(p, `Traverse Minds Africa, photo ${i + 1}`)), _key: key(i) }))
    ),
    aboutImage: await image(SITE_DEFAULTS.aboutImage, "Traverse Minds team"),
    securityImage: await image(SITE_DEFAULTS.securityImage, "Traverse Minds team at work"),
    mediaImage: await image(SITE_DEFAULTS.mediaImage, "Traverse Media at work"),
    timelineImage: await image(SITE_DEFAULTS.timelineImage),
    eventsSpeakImage: await image(SITE_DEFAULTS.eventsSpeakImage, "Speaker at a Traverse Minds event"),
    eventsSponsorImage: await image(SITE_DEFAULTS.eventsSponsorImage, "Traverse Minds event audience"),
    christinePortrait: await image(SITE_DEFAULTS.christinePortrait, "Masiika Christine Thembo"),
    christineProfileImage: await image(SITE_DEFAULTS.christineProfileImage, "Masiika Christine Thembo"),
  });

  for (const [i, p] of PARTNERS.entries()) {
    const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    docs.push({ _id: `partner-${slug}`, _type: "partner", name: p.name, logo: await image(p.logo, p.name), isActive: true, sortOrder: i + 1 });
  }

  for (const s of SERVICES) {
    docs.push({
      _id: `service-${s.slug}`,
      _type: "service",
      title: s.title,
      slug: { _type: "slug", current: s.slug },
      shortDescription: s.description,
      image: await image(s.image, s.title),
      overview: s.overview,
      features: s.features.map((f, i) => ({ _type: "object", _key: key(i), title: f.title, description: f.description })),
      benefits: s.benefits,
      isActive: true,
      sortOrder: s.sortOrder,
    });
  }

  for (const [i, p] of PROGRAMMES.entries()) {
    docs.push({
      _id: `programme-${p.slug}`,
      _type: "programme",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      audience: p.audience,
      format: p.format,
      duration: p.duration,
      description: p.description,
      longDescription: p.longDescription,
      topics: p.topics,
      learningOutcomes: p.learningOutcomes,
      featuredImage: await image(p.image, p.title),
      secondaryImage: await image(p.secondaryImage, `${p.title}, training session`),
      isActive: true,
      sortOrder: i + 1,
    });
  }

  for (const o of ORGANISATIONS) {
    const slug = o.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    docs.push({
      _id: `organisation-${slug}`,
      _type: "organisation",
      name: o.name,
      role: o.role,
      description: o.description,
      ...(o.logo ? { logo: await image(o.logo, o.name) } : {}),
      ...(o.website ? { website: o.website } : {}),
      sortOrder: o.sortOrder,
    });
  }

  return docs;
}

// ── run ────────────────────────────────────────────────────────────────────

const docs = await buildDocuments();
const authorPhoto = await image(SITE_DEFAULTS.christinePortrait, "Masiika Christine Thembo");
// The three sample programmes from the first seed are not on the site; hide them (reversible in the Studio)
const legacy = ["prog-cyber-safety-schools", "prog-digital-security-smes", "prog-govt-cyber-awareness"];

const counts = docs.reduce((acc, d) => ({ ...acc, [d._type]: (acc[d._type] ?? 0) + 1 }), {});
console.log(`${DRY ? "[dry run] " : ""}${uploads} files ${DRY ? "would be " : ""}uploaded`);
console.log(`Documents (${FORCE ? "create or replace" : "create if missing"}):`, counts);

if (DRY) {
  console.log("Dry run: nothing was written.");
} else {
  // Patching a document that does not exist fails the whole transaction, so only patch what is there
  const existing = new Set(await client.fetch(`*[_id in $ids]._id`, { ids: [...legacy, "author-christine"] }));
  const tx = client.transaction();
  for (const doc of docs) {
    if (FORCE) tx.createOrReplace(doc);
    else tx.createIfNotExists(doc);
  }
  if (existing.has("author-christine")) tx.patch("author-christine", (p) => p.setIfMissing({ photo: authorPhoto }));
  // Fields added to Site Settings after its first seed are filled in only where still empty
  const settings = docs.find((d) => d._id === "siteSettings");
  const settingsFields = Object.fromEntries(Object.entries(settings).filter(([k]) => !k.startsWith("_")));
  tx.patch("siteSettings", (p) => p.setIfMissing(settingsFields));
  for (const id of legacy) if (existing.has(id)) tx.patch(id, (p) => p.set({ isActive: false }));
  await tx.commit();
  console.log("Seeded. Review it in the Studio: https://traverseminds.sanity.studio");
}
