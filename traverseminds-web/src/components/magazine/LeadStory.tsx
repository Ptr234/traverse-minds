import Link from "next/link";
import { formatStoryDate, type Story } from "@/lib/content";
import { StoryCard, storyKicker } from "./primitives";

/** Front page: lead story (2/3) and a numbered "Latest" rail (1/3). */
export function LeadStory({ lead, latest }: { lead: Story; latest: Story[] }) {
  return (
    <section className="container-max pt-8 pb-12">
      <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <StoryCard story={lead} size="lg" priority />
        </div>

        <aside className="lg:col-span-4 lg:border-l lg:border-black/15 lg:pl-10" aria-labelledby="latest-heading">
          <h2 id="latest-heading" className="border-t-2 border-black pt-3 font-display text-[13px] font-bold uppercase tracking-[0.16em] text-black">
            Latest
          </h2>
          <ol className="mt-2">
            {latest.map((s, i) => (
              <li key={s.href} className="flex gap-4 border-b border-black/10 py-4 last:border-b-0">
                <span className="font-serif text-[28px] font-semibold leading-none text-gn-600" aria-hidden>
                  {i + 1}
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent">{storyKicker(s)}</p>
                  <Link href={s.href} className="mt-1 block font-serif text-[17px] font-semibold leading-snug text-black hover:text-accent">
                    {s.title}
                  </Link>
                  <p className="mt-1 text-[12px] text-gn-500">{formatStoryDate(s.date)}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
