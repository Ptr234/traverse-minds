"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Kicker, SectionHeader } from "@/components/magazine/primitives";
import type { Programme } from "@/content/programmes";

const filters = [
  { label: "All", value: "all" },
  { label: "Students", value: "students" },
  { label: "Business", value: "business" },
  { label: "Teachers", value: "teachers" },
  { label: "Government", value: "government" },
];

/** Programme cards with an audience filter; programmes are edited in Sanity. */
export function ProgrammeListing({ programmes }: { programmes: Programme[] }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? programmes : programmes.filter((p) => p.audience === filter);

  return (
    <section id="programmes" className="bg-white">
      <div className="container-max py-14 lg:py-20">
        <SectionHeader title="Programmes" />
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-serif text-[clamp(26px,3vw,36px)] font-semibold leading-tight text-black">Our training programmes.</h2>
          <div role="group" aria-label="Filter by audience" className="flex flex-wrap border border-black/15">
            {filters.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                aria-pressed={filter === f.value}
                className={`border-r border-black/15 px-4 py-2 font-mono text-[12px] uppercase tracking-wider last:border-r-0 ${
                  filter === f.value ? "bg-black text-white" : "text-gn-300 hover:bg-bg-light"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 text-[16px] text-gn-400">No programmes for this audience yet. Ask us about a custom course.</p>
        ) : (
          <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2">
            {filtered.map((p) => (
              <li key={p.id} className="group flex flex-col">
                <Link href={`/literacy/${p.slug}`} className="block">
                  <div className="tech-card relative aspect-[16/9] overflow-hidden bg-gn-800">
                    <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                  <Kicker className="mt-4">For {p.audience}</Kicker>
                  <h3 className="mt-2 font-serif text-[24px] font-semibold leading-tight text-black transition-colors group-hover:text-accent">{p.title}</h3>
                </Link>
                <p className="mt-2 text-[16px] leading-relaxed text-gn-400">{p.description}</p>
                <p className="mt-3 font-mono text-[12px] uppercase tracking-wide text-gn-500">
                  {p.duration} · {p.format}
                </p>
                <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-1.5 border-t border-black/10 pt-4 sm:grid-cols-2">
                  {p.topics.map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-[14px] text-gn-300">
                      <span className="mt-1.75 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
                <Link href={`/literacy/${p.slug}`} className="mt-5 inline-flex items-center gap-2 self-start text-[14px] font-semibold text-black hover:text-accent">
                  Programme details <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
