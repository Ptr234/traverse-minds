import Link from "next/link";
import { CountUp } from "@/components/ui/CountUp";

export type BriefingItem = { value: string; label: string; source: string; href?: string };

/** "The Briefing": a row of live figures, magazine-style, each with its source, on a blueprint grid. */
export function Briefing({ items }: { items: BriefingItem[] }) {
  if (items.length === 0) return null;
  return (
    <section className="relative overflow-hidden bg-primary text-white" aria-labelledby="briefing-heading">
      <div className="tech-grid-dark absolute inset-0" aria-hidden />
      <div className="container-max relative py-10">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-t-2 border-white/80 pt-3">
          <h2 id="briefing-heading" className="font-mono text-[13px] font-semibold uppercase tracking-[0.14em]">
            The Briefing
          </h2>
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/50">
            <span className="live-dot" aria-hidden />
            Live · updated on every site rebuild
          </p>
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
          {items.map((item) => {
            const body = (
              <>
                <dt className="sr-only">{item.label}</dt>
                <dd className="whitespace-nowrap font-mono text-[clamp(24px,6vw,38px)] font-semibold leading-none tabular-nums">
                  <CountUp value={item.value} />
                </dd>
                <dd className="mt-3 text-[14px] leading-snug text-white/80">{item.label}</dd>
                <dd className="mt-2 font-mono text-[11px] uppercase tracking-wider text-white/40">{item.source}</dd>
              </>
            );
            return (
              <div key={item.label} className="bg-primary/95 p-5 transition-colors hover:bg-primary-light md:p-6">
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
