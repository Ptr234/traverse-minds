"use client";

import { useState } from "react";
import { ArrowRight, ExternalLink, Lock, Search } from "lucide-react";
import preview from "@/data/public-record-preview.json";
import { PageHeader } from "@/components/magazine/PageHeader";
import { SectionHeader } from "@/components/magazine/primitives";
import { Button } from "@/components/ui/Button";

// Real Ugandan legislation and judgments (Laws.Africa / ULII), from scripts/build-record-preview.mjs
const RECORDS = preview.records;
const SUGGESTIONS = ["Income tax", "Land title", "Election petition", "Data protection"];

const fmt = (iso: string) =>
  iso ? new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "—";

/** Section-front header with the records search built in. */
export function RecordsHeader({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");
  return (
    <PageHeader
      crumbs={[{ name: "Home", href: "/" }, { name: "Public Record", href: "/public-record" }]}
      kicker="Public Record Africa"
      title="Africa's public records, searchable"
      dek={`Laws, court judgments and government records with AI search, summaries and alerts. Try the preview: ${RECORDS.length} real Ugandan records, refreshed ${fmt(preview.generatedAt)}.`}
    >
      <form
        className="mt-8 flex max-w-3xl flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(query.trim());
        }}
      >
        <label className="relative grow">
          <span className="sr-only">Search Ugandan laws and judgments</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gn-500" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Ugandan laws and judgments"
            className="h-14 w-full border border-black/20 bg-white pl-12 pr-4 text-[16px] outline-none focus:border-accent"
          />
        </label>
        <button type="submit" className="inline-flex h-14 items-center justify-center gap-2 bg-accent px-8 font-bold text-white hover:bg-accent-hover">
          Search <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </form>
      <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
        <span className="font-bold uppercase tracking-wider text-gn-500">Try</span>
        {SUGGESTIONS.map((s) => (
          <button key={s} type="button" onClick={() => onSearch(s)} className="text-gn-300 underline underline-offset-4 hover:text-accent">
            {s}
          </button>
        ))}
      </p>
    </PageHeader>
  );
}

/** Tender-portal style listing of the newest records, with a gate to the full archive. */
export function LatestRecords({ onSearchAll }: { onSearchAll: () => void }) {
  const latest = [...RECORDS].filter((r) => r.date).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10);

  return (
    <section className="bg-white">
      <div className="container-max py-12">
        <SectionHeader title="Latest Uganda records" />
        {/* relative: keeps the absolutely positioned sr-only header label inside the scroll box on phones */}
        <div className="relative overflow-x-auto border border-black/10">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="bg-gn-900 text-[11px] font-bold uppercase tracking-wider text-gn-500">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Record</th>
                <th className="px-4 py-3">Topic</th>
                <th className="px-4 py-3"><span className="sr-only">Source</span></th>
              </tr>
            </thead>
            <tbody>
              {latest.map((r) => (
                <tr key={r.id} className="border-t border-black/10 align-top hover:bg-gn-900">
                  <td className="whitespace-nowrap px-4 py-4 text-[13px] tabular-nums text-gn-400">{fmt(r.date)}</td>
                  <td className="px-4 py-4">
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${r.type === "Judgment" ? "text-accent" : "text-gn-300"}`}>{r.type}</span>
                  </td>
                  <td className="px-4 py-4">
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="font-serif text-[16px] font-semibold leading-snug text-black hover:text-accent">
                      {r.title}
                    </a>
                    {r.subtitle && <p className="mt-1 text-[13px] text-gn-400">{r.subtitle}</p>}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-[13px] text-gn-400">{r.topic}</td>
                  <td className="px-4 py-4 text-right">
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[13px] text-gn-400 hover:text-accent" aria-label={`Open ${r.title} on ULII`}>
                      ULII <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-col gap-4 border border-dashed border-black/20 bg-gn-900 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-3 text-[15px] text-gn-300">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
            <span>
              Showing the 10 newest of {RECORDS.length} preview records. Full access adds gazettes, filings, more countries,
              saved searches and alerts.
            </span>
          </p>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline" size="sm" onClick={onSearchAll}>Search the preview</Button>
            <Button variant="primary" size="sm" href="#waitlist">Join the waitlist</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Topics with live counts, like a portal's "Top sectors" grid. */
export function TopicIndex({ onSelect }: { onSelect: (topic: string) => void }) {
  const counts = RECORDS.reduce<Record<string, { laws: number; cases: number }>>((acc, r) => {
    acc[r.topic] ??= { laws: 0, cases: 0 };
    if (r.type === "Judgment") acc[r.topic].cases += 1;
    else acc[r.topic].laws += 1;
    return acc;
  }, {});

  return (
    <section className="bg-gn-900">
      <div className="container-max py-12">
        <SectionHeader title="Browse by topic" />
        <ul className="grid grid-cols-2 gap-px bg-black/10 sm:grid-cols-3 lg:grid-cols-5">
          {Object.entries(counts).map(([topic, c]) => (
            <li key={topic} className="bg-gn-900">
              <button type="button" onClick={() => onSelect(topic)} className="group block h-full w-full p-5 text-left hover:bg-white">
                <span className="block font-serif text-[19px] font-semibold text-black group-hover:text-accent">{topic}</span>
                <span className="mt-1 block text-[13px] text-gn-500">
                  {c.laws} provisions · {c.cases} judgments
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
