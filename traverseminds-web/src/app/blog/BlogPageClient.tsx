"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Story } from "@/lib/content";
import { divisionLabel } from "@/lib/divisions";
import { StoryCard } from "@/components/magazine/primitives";

/** Analysis section front: division tabs + search, lead story, then the grid. */
export function BlogPageClient({ posts }: { posts: Story[] }) {
  const [division, setDivision] = useState("all");
  const [query, setQuery] = useState("");

  // Only show tabs for divisions that actually have posts
  const divisions = useMemo(() => [...new Set(posts.map((p) => p.kicker))], [posts]);

  const filtered = posts.filter((p) => {
    const q = query.trim().toLowerCase();
    return (division === "all" || p.kicker === division) && (!q || `${p.title} ${p.dek ?? ""}`.toLowerCase().includes(q));
  });
  const browsing = division === "all" && !query.trim();
  const [lead, ...rest] = filtered;

  const tab = (key: string, label: string) => (
    <button
      key={key}
      type="button"
      onClick={() => setDivision(key)}
      aria-pressed={division === key}
      className={`whitespace-nowrap border-b-2 px-1 pb-2 text-[14px] font-medium transition-colors ${
        division === key ? "border-accent text-black" : "border-transparent text-gn-400 hover:text-black"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="pb-16">
      <div className="container-max">
        <div className="flex flex-col gap-4 border-y border-black/15 py-3 md:flex-row md:items-center md:justify-between">
          <div className="-mx-1 flex gap-5 overflow-x-auto pt-2" role="group" aria-label="Filter by division">
            {tab("all", "All")}
            {divisions.map((d) => tab(d, divisionLabel(d)))}
          </div>
          <label className="relative block md:w-72">
            <span className="sr-only">Search analysis</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gn-500" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search analysis"
              className="w-full border border-black/15 bg-white py-2 pl-9 pr-3 text-[14px] outline-none focus:border-accent"
            />
          </label>
        </div>
      </div>

      <div className="container-max pt-10">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-gn-400">No analysis matches that search.</p>
        ) : browsing && lead ? (
          <>
            <div className="grid grid-cols-1 gap-x-10 gap-y-10 border-b border-black/15 pb-12 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <StoryCard story={lead} size="lg" priority />
              </div>
              <div className="flex flex-col gap-8 lg:col-span-4 lg:border-l lg:border-black/15 lg:pl-10">
                {rest.slice(0, 2).map((p) => (
                  <StoryCard key={p.href} story={p} size="sm" />
                ))}
              </div>
            </div>
            {rest.length > 2 && (
              <div className="grid grid-cols-1 gap-x-8 gap-y-12 pt-12 sm:grid-cols-2 lg:grid-cols-3">
                {rest.slice(2).map((p) => (
                  <StoryCard key={p.href} story={p} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <StoryCard key={p.href} story={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
