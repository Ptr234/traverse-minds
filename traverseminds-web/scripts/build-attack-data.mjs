// Builds src/data/attack-sector-threats.json from MITRE ATT&CK Enterprise (STIX 2.1).
// The full bundle is ~55 MB, so we extract a small summary once and commit it.
//
//   node scripts/build-attack-data.mjs              # downloads the latest bundle
//   node scripts/build-attack-data.mjs ./local.json # or reads a local copy
//
// ATT&CK® is © The MITRE Corporation, reproduced and distributed with its permission.
// Terms of use: https://attack.mitre.org/resources/legal-and-branding/terms-of-use/

import fs from "node:fs";
import path from "node:path";

const SOURCE = "https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/enterprise-attack/enterprise-attack.json";
const OUT = path.resolve(import.meta.dirname, "../src/data/attack-sector-threats.json");

// Sectors that match Traverse Security's clients. Matched against MITRE's own group descriptions.
const SECTORS = {
  financial: /\b(financial|bank(s|ing)?|fintech|payment|SWIFT|ATM|cryptocurrenc)/i,
  government: /\b(government|ministr(y|ies)|diplomat|embass)/i,
};
const AFRICA = /\b(Africa|Uganda|Kenya|Tanzania|Rwanda|Nigeria|Ghana|Ethiopia|Egypt|South Africa|Morocco)\b/i;

const clean = (text = "") =>
  text
    .replace(/\(Citation:[^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // markdown links -> text
    .replace(/<code>|<\/code>/g, "")
    .replace(/\s+/g, " ")
    .trim();

const firstSentences = (text, max = 260) => {
  const s = clean(text);
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const end = cut.lastIndexOf(". ");
  return end > 80 ? cut.slice(0, end + 1) : `${cut.trimEnd()}…`;
};

const attackId = (obj) => obj.external_references?.find((r) => r.source_name === "mitre-attack");
const active = (o) => !o.revoked && !o.x_mitre_deprecated;

async function load() {
  const local = process.argv[2];
  if (local) return JSON.parse(fs.readFileSync(local, "utf8"));
  console.log("Downloading ATT&CK Enterprise bundle…");
  const res = await fetch(SOURCE);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

const bundle = await load();
const objects = bundle.objects;
const byId = new Map(objects.map((o) => [o.id, o]));
const version = objects.find((o) => o.type === "x-mitre-collection")?.x_mitre_version ?? "unknown";

const groups = objects.filter((o) => o.type === "intrusion-set" && active(o));
const uses = objects.filter((o) => o.type === "relationship" && o.relationship_type === "uses" && active(o));

const techniquesByGroup = new Map();
for (const rel of uses) {
  const target = byId.get(rel.target_ref);
  if (!target || target.type !== "attack-pattern" || !active(target)) continue;
  if (!techniquesByGroup.has(rel.source_ref)) techniquesByGroup.set(rel.source_ref, new Set());
  techniquesByGroup.get(rel.source_ref).add(target.id);
}

const sectorGroups = groups
  .map((g) => {
    const desc = g.description ?? "";
    const sectors = Object.entries(SECTORS).filter(([, re]) => re.test(desc)).map(([k]) => k);
    return { g, sectors, africa: AFRICA.test(desc) };
  })
  .filter((x) => x.sectors.length > 0);

// Rank techniques by how many sector-targeting groups use them
const techniqueCounts = new Map();
for (const { g } of sectorGroups) {
  for (const t of techniquesByGroup.get(g.id) ?? []) techniqueCounts.set(t, (techniqueCounts.get(t) ?? 0) + 1);
}

const topTechniques = [...techniqueCounts.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 12)
  .map(([id, count]) => {
    const t = byId.get(id);
    const ref = attackId(t);
    return {
      id: ref.external_id,
      name: t.name,
      url: ref.url,
      tactics: (t.kill_chain_phases ?? [])
        .filter((p) => p.kill_chain_name === "mitre-attack")
        .map((p) => p.phase_name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())),
      groupCount: count,
      summary: firstSentences(t.description, 200),
    };
  });

const groupList = sectorGroups
  .map(({ g, sectors, africa }) => {
    const ref = attackId(g);
    return {
      id: ref.external_id,
      name: g.name,
      aliases: (g.aliases ?? []).filter((a) => a !== g.name).slice(0, 3),
      url: ref.url,
      sectors,
      mentionsAfrica: africa,
      techniqueCount: techniquesByGroup.get(g.id)?.size ?? 0,
      summary: firstSentences(g.description),
    };
  })
  // Africa-relevant first, then the most capable groups
  .sort((a, b) => Number(b.mentionsAfrica) - Number(a.mentionsAfrica) || b.techniqueCount - a.techniqueCount);

const out = {
  source: "MITRE ATT&CK Enterprise",
  attackVersion: version,
  generatedAt: new Date().toISOString().slice(0, 10),
  totals: {
    groups: groups.length,
    sectorGroups: sectorGroups.length,
    financial: sectorGroups.filter((x) => x.sectors.includes("financial")).length,
    government: sectorGroups.filter((x) => x.sectors.includes("government")).length,
    africa: sectorGroups.filter((x) => x.africa).length,
  },
  topTechniques,
  groups: groupList.slice(0, 12),
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
console.log(`Wrote ${path.relative(process.cwd(), OUT)} — ATT&CK v${version}`, out.totals);
