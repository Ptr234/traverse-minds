// Seeds cited statistics into Sanity. Safe to re-run: fixed _ids are upserted.
// Run: SANITY_AUTH_TOKEN=... node scripts/seed-statistics.mjs
//
// Every figure below was checked against the source document at the page given in sourcePage
// (October 2026). Re-check against the source before relying on a figure, and update when a newer
// edition of the report is published.

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "f5v11nkd",
  dataset: "production",
  apiVersion: "2026-03-17",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

const VERIFIED = "Checked against source PDF by Claude (AI), Oct 2026 — please re-verify";

const SOURCES = {
  police: {
    sourceOrg: "Uganda Police Force",
    sourceTitle: "Annual Crime Report 2025",
    sourceUrl: "https://upf.go.ug/annual-crime-report-2025/",
  },
  interpol: {
    sourceOrg: "INTERPOL",
    sourceTitle: "African Cyberthreat Assessment Report 2026",
    sourceUrl: "https://www.interpol.int/content/download/24663/file/INTERPOL%20AFRICAN%20CYBERTHREAT%20ASSESSMENT%20REPORT%202026.pdf",
  },
  bou: {
    sourceOrg: "Bank of Uganda",
    sourceTitle: "Integrated Annual Report, 30 June 2025",
    sourceUrl: "https://bou.or.ug/uploads/Integrated_Annual_Report_2024_2025_9bfa4a9ed6.pdf",
  },
  ucc: {
    sourceOrg: "UCC",
    sourceTitle: "Market Report for Q2 2026",
    sourceUrl: "https://ucc.co.ug/wp-content/uploads/2026/08/UCC-Market-Report-for-Q2-2026-Jun-2026.pdf",
  },
  ubos: {
    sourceOrg: "UBOS",
    sourceTitle: "National Population and Housing Census 2024, Final Report Vol. I (Main)",
    sourceUrl: "https://statistics.ubos.org/nphc/reports/National-Population-and-Housing-Census-2024-Final-Report-Volume-1-Main.pdf",
  },
  afro: {
    sourceOrg: "Afrobarometer",
    sourceTitle: "Summary of Results, Round 10 Survey in Uganda, 2024",
    sourceUrl: "https://www.afrobarometer.org/wp-content/uploads/2025/02/Summary-of-results-Uganda-Afrobarometer-R10-26feb25.pdf",
  },
};

const stats = [
  // ── Security: cybercrime ───────────────────────────────────────────────
  { id: "police-cyber-cases-2025", src: "police", order: 1, placements: ["security"],
    label: "Cybercrime cases reported to Police", value: 412, context: "down from 474 in 2024",
    period: "2025", asOf: "2025-12-31", sourcePage: "s. 1.4.9, p. 55" },
  { id: "police-cyber-convictions-2025", src: "police", order: 2, placements: ["security"],
    label: "Convictions secured", value: 26, context: "from 101 cybercrime cases taken to court",
    period: "2025", asOf: "2025-12-31", sourcePage: "s. 1.4.9, p. 55" },
  { id: "interpol-africa-losses-2025", src: "interpol", order: 3, placements: ["security"],
    label: "Cybercrime losses across Africa", value: 484, prefix: "USD ", suffix: "M", context: "up from USD 192M in 2024",
    period: "2025", asOf: "2025-12-31", sourcePage: "p. 11" },
  { id: "interpol-ai-share-2025", src: "interpol", order: 4, placements: ["security"],
    label: "Of African cybercrime cases involved AI", value: 55, suffix: "%", context: "per INTERPOL member survey",
    period: "2025", asOf: "2025-12-31", sourcePage: "p. 24" },

  // ── Bank of Uganda audit: financial system ─────────────────────────────
  { id: "bou-emoney-value-fy2425", src: "bou", order: 1, placements: ["bou-audit", "home"],
    label: "Moved through mobile money in a year", value: 326.3, prefix: "UGX ", suffix: "T", decimals: 1,
    context: "326.3 trillion shillings, up 28.6%", period: "FY 2024/25", asOf: "2025-06-30", sourcePage: "p. 61" },
  { id: "bou-emoney-volume-fy2425", src: "bou", order: 2, placements: ["bou-audit"],
    label: "Electronic money transactions", value: 8.4, suffix: " billion", decimals: 1,
    context: "up from 7 billion", period: "FY 2024/25", asOf: "2025-06-30", sourcePage: "p. 61" },
  { id: "bou-agents-fy2425", src: "bou", order: 3, placements: ["bou-audit"],
    label: "Mobile money agents", value: 1016914, context: "up 27% from 775,294",
    period: "June 2025", asOf: "2025-06-30", sourcePage: "p. 61" },
  { id: "ucc-mobile-money-q2-2026", src: "ucc", order: 4, placements: ["bou-audit"],
    label: "Active mobile money subscriptions", value: 37.8, suffix: "M", decimals: 1,
    period: "Q2 2026", asOf: "2026-06-30", sourcePage: "p. 17" },

  // ── Literacy: the skills gap ───────────────────────────────────────────
  { id: "ubos-literacy-2024", src: "ubos", order: 1, placements: ["literacy"],
    label: "Can read and write (age 10+)", value: 74, suffix: "%", context: "up from 72% in 2014",
    period: "Census 2024", asOf: "2024-05-31", sourcePage: "Executive Summary" },
  { id: "ubos-phone-ownership-2024", src: "ubos", order: 2, placements: ["literacy"],
    label: "Own a mobile phone (age 10+)", value: 43.3, suffix: "%", decimals: 1,
    period: "Census 2024", asOf: "2024-05-31", sourcePage: "p. 48" },
  { id: "ubos-computer-use-2024", src: "ubos", order: 3, placements: ["literacy"],
    label: "Have ever used a computer (age 10+)", value: 3.9, suffix: "%", decimals: 1,
    period: "Census 2024", asOf: "2024-05-31", sourcePage: "p. 48" },
  { id: "afro-phone-internet-2024", src: "afro", order: 4, placements: ["literacy"],
    label: "Of adults have internet on their phone", value: 29.9, suffix: "%", decimals: 1,
    context: "47.7% urban, 22.3% rural", period: "2024 survey", asOf: "2024-02-01", sourcePage: "Q90H, p. 10" },

  // ── Think Tank: national data ──────────────────────────────────────────
  { id: "ubos-internet-use-2024", src: "ubos", order: 1, placements: ["think-tank", "home"],
    label: "Have used the internet (age 10+)", value: 8.9, suffix: "%", decimals: 1,
    context: "Kampala 40.3%, Karamoja 3.2%", period: "Census 2024", asOf: "2024-05-31", sourcePage: "p. 51" },
  { id: "ucc-mobile-internet-q2-2026", src: "ucc", order: 2, placements: ["think-tank"],
    label: "Active mobile internet subscriptions", value: 19.7, suffix: "M", decimals: 1,
    context: "of 49.0M active mobile subscriptions", period: "Q2 2026", asOf: "2026-06-30", sourcePage: "p. 17" },
  { id: "ucc-smartphones-q2-2026", src: "ucc", order: 3, placements: ["think-tank"],
    label: "Smartphones in use", value: 20.5, suffix: "M", decimals: 1,
    context: "plus 38.4M basic and feature phones", period: "Q2 2026", asOf: "2026-06-30", sourcePage: "p. 17" },
  { id: "afro-women-phone-internet-2024", src: "afro", order: 4, placements: ["think-tank"],
    label: "Of women have internet on their phone", value: 24.4, suffix: "%", decimals: 1,
    context: "vs 35.1% of men", period: "2024 survey", asOf: "2024-02-01", sourcePage: "Q90H, p. 10" },

  // ── Homepage ───────────────────────────────────────────────────────────
  { id: "ubos-population-2024", src: "ubos", order: 0, placements: ["home"],
    label: "People in Uganda", value: 45.9, suffix: "M", decimals: 1,
    context: "45,905,417 counted", period: "Census 2024", asOf: "2024-05-31", sourcePage: "s. 2.1, p. 13" },
  { id: "ucc-mobile-subs-q2-2026", src: "ucc", order: 2, placements: ["home"],
    label: "Active mobile subscriptions", value: 49.0, suffix: "M", decimals: 1,
    period: "Q2 2026", asOf: "2026-06-30", sourcePage: "p. 17" },
];

if (!process.env.SANITY_AUTH_TOKEN) {
  console.error("Set SANITY_AUTH_TOKEN (a Sanity token with Editor/write access).");
  process.exit(1);
}

const tx = client.transaction();
for (const { id, src, ...fields } of stats) {
  tx.createOrReplace({
    _id: `statistic-${id}`,
    _type: "statistic",
    usage: "quoted",
    verifiedBy: VERIFIED,
    ...SOURCES[src],
    ...fields,
  });
}
const result = await tx.commit();
console.log(`Upserted ${result.results.length} statistics.`);
