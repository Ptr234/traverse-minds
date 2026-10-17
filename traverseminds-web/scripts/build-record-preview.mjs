// Builds src/data/public-record-preview.json — a sample of real Ugandan legislation and judgments
// for the Public Record search preview. Run occasionally, not on every build (Laws.Africa Sandbox
// allows 100 calls/day; this script uses 2 per topic).
//
//   LAWS_AFRICA_TOKEN=... node scripts/build-record-preview.mjs
//
// Records are short excerpts with links to the full text on ULII (search-style use: link + excerpt).
// Source: Laws.Africa Legal Knowledge Platform — https://laws.africa

import fs from "node:fs";
import path from "node:path";

const API = "https://api.laws.africa/ai/v1/knowledge-bases";
const OUT = path.resolve(import.meta.dirname, "../src/data/public-record-preview.json");
const TOKEN = process.env.LAWS_AFRICA_TOKEN;

// Topics people search public records for. Each runs once against legislation and once against judgments.
const TOPICS = [
  { topic: "Tax", query: "income tax assessment and penalties" },
  { topic: "Land", query: "land registration certificate of title" },
  { topic: "Elections", query: "electoral commission nomination of candidates election petition" },
  { topic: "Data protection", query: "personal data protection privacy consent" },
  { topic: "Companies", query: "company registration directors shareholders" },
  { topic: "Procurement", query: "public procurement bidding award of contracts" },
  { topic: "Employment", query: "termination of employment unfair dismissal" },
  { topic: "Corruption", query: "corruption bribery abuse of office" },
  { topic: "Cybercrime", query: "computer misuse unauthorised access electronic fraud" },
  { topic: "Banking", query: "financial institutions mobile money payment systems" },
];

const tidy = (text = "", max = 320) => {
  const clean = text.replace(/\s+/g, " ").replace(/\s+([,.;:)’])/g, "$1").replace(/([(‘])\s+/g, "$1").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
};

/** "Party v Party (Case No) [2023] UGCC 18 (9 March 2023)" -> { title, citation } */
const splitCase = (full) => {
  const m = full.match(/^(.*?)\s*\((?:[^()]|\([^()]*\))*\)\s*(\[\d{4}\]\s*[A-Za-z]+\s*\d+)/);
  return m ? { title: m[1].trim(), citation: m[2].replace(/\s+/g, " ") } : { title: full, citation: "" };
};

async function retrieve(kb, body) {
  const res = await fetch(`${API}/${kb}/retrieve`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) throw new Error(`${kb}: HTTP ${res.status} ${await res.text()}`);
  return (await res.json()).results ?? [];
}

if (!TOKEN) {
  console.error("Set LAWS_AFRICA_TOKEN");
  process.exit(1);
}

const records = new Map();
for (const { topic, query } of TOPICS) {
  const [laws, cases] = await Promise.all([
    retrieve("legislation-ug", { text: query, top_k: 5, filters: { principal: true, repealed: false } }),
    retrieve("judgments-ug", { text: query, top_k: 5 }),
  ]);

  for (const r of laws) {
    const m = r.metadata;
    const url = m.portion_public_url ?? m.public_url;
    if (records.has(url)) continue;
    const sec = (m.portion_title ?? "").match(/^(\d+[A-Z]?)\.\s*(.+)$/);
    records.set(url, {
      id: url,
      type: "Legislation",
      jurisdiction: "Uganda",
      topic,
      title: m.title,
      subtitle: sec ? `Section ${sec[1]}: ${sec[2]}` : m.portion_title ?? "",
      date: m.expression_date ?? "",
      snippet: tidy(r.content?.text),
      url,
      source: "ULII",
    });
  }

  for (const r of cases) {
    const m = r.metadata;
    if (records.has(m.public_url)) continue;
    const { title, citation } = splitCase(m.title);
    records.set(m.public_url, {
      id: m.public_url,
      type: "Judgment",
      jurisdiction: "Uganda",
      topic,
      title,
      subtitle: citation,
      date: m.expression_date ?? "",
      snippet: tidy(m.blurb || r.content?.text, 280),
      url: m.public_url,
      source: "ULII",
    });
  }
  console.log(`${topic}: ${laws.length} legislation, ${cases.length} judgments`);
}

const out = {
  source: "Laws.Africa Legal Knowledge Platform (Uganda legislation and judgments), full texts on ULII",
  generatedAt: new Date().toISOString().slice(0, 10),
  records: [...records.values()],
};
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
console.log(`Wrote ${out.records.length} records to ${path.relative(process.cwd(), OUT)}`);
