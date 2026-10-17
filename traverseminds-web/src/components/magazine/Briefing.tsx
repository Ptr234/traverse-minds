import Link from "next/link";

export type BriefingItem = { value: string; label: string; source: string; href?: string };

/** "The Briefing": a row of live figures, magazine-style, each with its source. */
export function Briefing({ items }: { items: BriefingItem[] }) {
  if (items.length === 0) return null;
  return (
    <section className="bg-primary text-white" aria-labelledby="briefing-heading">
      <div className="container-max py-10">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-t-2 border-white/80 pt-3">
          <h2 id="briefing-heading" className="font-display text-[13px] font-bold uppercase tracking-[0.16em]">
            The Briefing
          </h2>
          <p className="text-[12px] text-white/50">Live figures, updated on every site rebuild</p>
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
          {items.map((item) => {
            const body = (
              <>
                <dt className="sr-only">{item.label}</dt>
                <dd className="whitespace-nowrap font-serif text-[clamp(26px,6.5vw,40px)] font-semibold leading-none">{item.value}</dd>
                <dd className="mt-3 text-[14px] leading-snug text-white/80">{item.label}</dd>
                <dd className="mt-2 text-[11px] uppercase tracking-wider text-white/40">{item.source}</dd>
              </>
            );
            return (
              <div key={item.label} className="bg-primary p-5 md:p-6">
                {item.href ? (
                  <Link href={item.href} className="block hover:[&_dd:first-of-type]:text-accent">{body}</Link>
                ) : body}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
