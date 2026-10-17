import { defineField, defineType } from "sanity";

// Where a figure can appear on the site. Keys are used by getStatistics() on each page.
export const STATISTIC_PLACEMENTS = [
  { title: "Homepage", value: "home" },
  { title: "Security (main page)", value: "security" },
  { title: "Security — Bank of Uganda Audit", value: "bou-audit" },
  { title: "Security — Regulatory Advisory", value: "regulatory-advisory" },
  { title: "Literacy", value: "literacy" },
  { title: "Think Tank", value: "think-tank" },
  { title: "Public Record", value: "public-record" },
];

export const STATISTIC_SOURCES = [
  { title: "UBOS — Uganda Bureau of Statistics", value: "UBOS" },
  { title: "UCC — Uganda Communications Commission", value: "UCC" },
  { title: "Bank of Uganda", value: "Bank of Uganda" },
  { title: "PDPO — Personal Data Protection Office", value: "PDPO" },
  { title: "NITA-U", value: "NITA-U" },
  { title: "Uganda Police Force", value: "Uganda Police Force" },
  { title: "INTERPOL", value: "INTERPOL" },
  { title: "Afrobarometer", value: "Afrobarometer" },
  { title: "GSMA", value: "GSMA" },
  { title: "CIPESA", value: "CIPESA" },
  { title: "Other (name it in Report title)", value: "Other" },
];

export const statistic = defineType({
  name: "statistic",
  title: "Statistic",
  type: "document",
  description: "A single cited figure from a published report. Every statistic must link to its source.",
  fields: [
    defineField({
      name: "label",
      title: "What it measures",
      type: "string",
      description: 'Short label shown under the number, e.g. "Active mobile money accounts".',
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "number",
      description: "The number only. Use the prefix/suffix fields for units (e.g. 41.2 with suffix \"M\").",
      validation: (r) => r.required(),
    }),
    defineField({ name: "prefix", title: "Prefix", type: "string", description: 'e.g. "UGX " or "$"' }),
    defineField({ name: "suffix", title: "Suffix", type: "string", description: 'e.g. "%", "M", " trillion"' }),
    defineField({
      name: "decimals",
      title: "Decimal places",
      type: "number",
      initialValue: 0,
      validation: (r) => r.min(0).max(2).integer(),
    }),
    defineField({
      name: "context",
      title: "Context",
      type: "string",
      description: 'One line shown under the label, e.g. "up from 33.9M a year earlier".',
      validation: (r) => r.max(120),
    }),
    defineField({
      name: "period",
      title: "Period covered",
      type: "string",
      description: 'The period the figure describes, as the source states it, e.g. "Q2 2026" or "FY 2024/25".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "asOf",
      title: "As-of date",
      type: "date",
      description: "End date of the period covered. Used to sort figures and flag stale ones.",
      validation: (r) =>
        r.required().custom((date) => {
          if (!date) return true;
          const ageYears = (Date.now() - new Date(date as string).getTime()) / (365.25 * 24 * 3600 * 1000);
          return ageYears > 3 ? { message: "This figure is over 3 years old — check for a newer report.", level: "warning" } : true;
        }),
    }),
    defineField({
      name: "sourceOrg",
      title: "Publisher",
      type: "string",
      options: { list: STATISTIC_SOURCES },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sourceTitle",
      title: "Report title",
      type: "string",
      description: 'Exact title of the publication, e.g. "Market Performance Report, Q2 2026".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sourceUrl",
      title: "Source link",
      type: "url",
      description: "Direct link to the report or the page that hosts it.",
      validation: (r) => r.required().uri({ scheme: ["https", "http"] }),
    }),
    defineField({
      name: "sourcePage",
      title: "Page or table",
      type: "string",
      description: 'Where in the report the figure appears, e.g. "p. 14, Table 3". Helps anyone verify it.',
    }),
    defineField({
      name: "usage",
      title: "How we may use it",
      type: "string",
      initialValue: "quoted",
      options: {
        layout: "radio",
        list: [
          { title: "Quoted figure, with citation (always allowed)", value: "quoted" },
          { title: "From an openly licensed dataset (e.g. CC BY)", value: "open-licence" },
        ],
      },
      description: "Quote individual figures with credit. Do not copy whole tables from non-commercial or all-rights-reserved reports.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "placements",
      title: "Show on",
      type: "array",
      of: [{ type: "string" }],
      options: { list: STATISTIC_PLACEMENTS },
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers show first. Leave empty to sort by newest.",
    }),
    defineField({ name: "verifiedBy", title: "Checked by", type: "string", description: "Who checked the figure against the source." }),
  ],
  orderings: [{ title: "As-of date (Newest)", name: "asOfDesc", by: [{ field: "asOf", direction: "desc" }] }],
  preview: {
    select: { label: "label", value: "value", prefix: "prefix", suffix: "suffix", org: "sourceOrg", period: "period" },
    prepare({ label, value, prefix, suffix, org, period }) {
      return { title: `${prefix ?? ""}${value ?? ""}${suffix ?? ""} — ${label ?? ""}`, subtitle: `${org ?? ""} · ${period ?? ""}` };
    },
  },
});
