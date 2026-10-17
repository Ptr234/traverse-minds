"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { DIVISIONS } from "@/lib/divisions";

const ZONE = "Africa/Kampala";
const everySecond = (onTick: () => void) => {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
};
const todayInKampala = () => new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: ZONE });
const timeInKampala = () => new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: ZONE });

/** Masthead strip under the main nav: today's date, a live Kampala clock, section links, subscribe. `belowHero` drops the navbar clearance. */
export function SectionBar({ belowHero = false }: { belowHero?: boolean }) {
  // The site is a static export, so date and time come from the browser (empty during the build) to stay current
  const today = useSyncExternalStore(everySecond, todayInKampala, () => "");
  const time = useSyncExternalStore(everySecond, timeInKampala, () => "");

  return (
    <div className={`container-max w-full ${belowHero ? "pt-10" : "pt-28 lg:pt-32"}`}>
      <div className="border-t-[3px] border-black">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-black/15 py-3">
          <p className="flex min-w-[14ch] items-center gap-2 font-mono text-[12px] text-gn-400" suppressHydrationWarning>
            <span className="live-dot" aria-hidden />
            {today}
            {time && (
              <span className="hidden tabular-nums sm:inline">
                · Kampala <time className="text-gn-200">{time}</time> EAT
              </span>
            )}
          </p>
          <nav aria-label="Sections" className="-mx-1 flex max-w-full gap-1 overflow-x-auto text-[13px] font-medium">
            {DIVISIONS.map((d) => (
              <Link key={d.key} href={d.href} className="whitespace-nowrap px-2 py-1 text-gn-200 hover:text-accent">
                {d.label}
              </Link>
            ))}
          </nav>
          <a href="#newsletter" className="hidden md:inline-block bg-accent px-3 py-1.5 text-[12px] font-bold uppercase tracking-wider text-white hover:bg-accent-hover">
            Subscribe
          </a>
        </div>
      </div>
    </div>
  );
}
