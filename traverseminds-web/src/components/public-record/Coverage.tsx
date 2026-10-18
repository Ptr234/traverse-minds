"use client";

import { SectionHeader } from "@/components/magazine/primitives";
import { AfricaMap } from "@/components/ui/AfricaMap";
import type { CountryData } from "@/components/ui/AfricaMap";

export type PreviewCounts = { total: number; legislation: number; judgments: number };

// Matches the FAQ: Uganda is in preview; these are on the roadmap, added in order of waitlist demand
const ROADMAP = ["Kenya", "Tanzania", "Rwanda", "Burundi", "Nigeria", "South Africa"];

/** Where Public Record has data today and where it is going. Figures come from the preview dataset. */
export function Coverage({ counts }: { counts: PreviewCounts }) {
  const countries: CountryData[] = [
    { name: "Uganda", data: `Preview: ${counts.legislation} laws, ${counts.judgments} judgments`, status: "active" },
    ...ROADMAP.map((name) => ({ name, data: "On the roadmap", status: "pipeline" as const })),
  ];

  const stats = [
    { value: String(counts.total), label: "Records searchable in the preview" },
    { value: String(counts.legislation), label: "Ugandan laws" },
    { value: String(counts.judgments), label: "Ugandan court judgments" },
    { value: String(ROADMAP.length), label: "Countries on the roadmap" },
  ];

  return (
    <section className="bg-bg-light">
      <div className="container-max py-14 lg:py-20">
        <SectionHeader title="Coverage" />
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] text-black">Starting with Uganda, built for the continent.</h2>
          <p className="text-[17px] leading-relaxed text-gn-400">
            The preview covers Ugandan legislation and court judgments. More countries follow in order of waitlist demand, with gazettes
            and parliamentary records to come.
          </p>
        </div>

        <dl className="mt-10 grid grid-cols-2 border-t-2 border-black lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-b border-black/15 py-5 pr-4 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-mono text-[clamp(30px,4.5vw,44px)] font-semibold leading-none text-black tabular-nums">{s.value}</dd>
              <dd className="mt-3 text-[15px] text-gn-300">{s.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 border border-black/10 bg-white">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-black/10 px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-gn-300">
            <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 bg-accent" aria-hidden /> Preview: records searchable</span>
            <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 bg-gn-500" aria-hidden /> On the roadmap</span>
          </div>
          <AfricaMap countries={countries} className="rounded-none! border-0! h-120" />
        </div>
      </div>
    </section>
  );
}
