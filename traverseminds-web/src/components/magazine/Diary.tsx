import Link from "next/link";
import type { Story } from "@/lib/content";
import { SectionHeader, storyKicker } from "./primitives";

const day = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", timeZone: "Africa/Kampala" });
const monthYear = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "Africa/Kampala" });

/** Events as a magazine diary: big date numerals, title, place. Upcoming first, then recent. */
export function Diary({ upcoming, past, total = 4, title = "Diary" }: { upcoming: Story[]; past: Story[]; total?: number; title?: string }) {
  const items = [...upcoming.map((e) => ({ e, upcoming: true })), ...past.slice(0, Math.max(0, total - upcoming.length)).map((e) => ({ e, upcoming: false }))];
  if (items.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="container-max py-12">
        <SectionHeader title={title} href={title === "Diary" ? "/events" : undefined} linkLabel="All events" />
        <ul className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
          {items.map(({ e, upcoming }) => (
            <li key={e.href} className="border-b border-black/10">
              <Link href={e.href} className="group flex gap-6 py-5">
                <div className="w-20 shrink-0 text-center">
                  <p className={`font-serif text-[44px] font-semibold leading-none ${upcoming ? "text-accent" : "text-gn-500"}`}>{day(e.date)}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-gn-400">{monthYear(e.date)}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
                    {upcoming ? "Upcoming" : "Recent"} · {storyKicker(e)}
                  </p>
                  <h3 className="mt-1 font-serif text-[20px] font-semibold leading-snug text-black group-hover:text-accent transition-colors">{e.title}</h3>
                  {e.location && <p className="mt-1 text-[13px] text-gn-500">{e.location}</p>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
