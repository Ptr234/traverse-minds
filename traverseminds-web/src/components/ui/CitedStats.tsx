import { SectionHeader } from "@/components/magazine/primitives";
import { formatStatistic, type CitedStatistic } from "@/lib/statistics";

type Props = {
  stats: CitedStatistic[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  background?: string;
};

/** Stat tiles with numbered footnotes — every figure links back to the report it came from. */
export function CitedStats({ stats, eyebrow = "By The Numbers", title, intro, background = "#ffffff" }: Props) {
  if (stats.length === 0) return null;

  return (
    <section style={{ background }}>
      <div className="container-max py-14">
        <SectionHeader title={eyebrow} />
        {title && <h2 className="max-w-3xl font-serif text-[clamp(26px,3vw,36px)] font-semibold leading-tight text-black">{title}</h2>}
        {intro && <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-gn-400">{intro}</p>}

        <dl className={`grid grid-cols-2 border-t border-black/15 lg:grid-cols-4 ${title || intro ? "mt-8" : ""}`}>
          {stats.map((s, i) => (
            <div key={s._id} className="border-b border-black/15 py-5 pr-4 lg:border-r lg:px-6 lg:py-6 lg:last:border-r-0 lg:nth-[4n]:border-r-0 lg:nth-[4n+1]:pl-0">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-mono text-[clamp(26px,5vw,40px)] font-semibold leading-none text-black tabular-nums">
                {formatStatistic(s)}
                <a href={`#cite-${s._id}`} aria-label={`Source ${i + 1}`} className="ml-1 align-super font-mono text-[12px] font-normal text-accent">
                  {i + 1}
                </a>
              </dd>
              <dd className="mt-3 text-[15px] font-medium leading-snug text-gn-200">{s.label}</dd>
              <dd className="mt-1 font-mono text-[11px] uppercase tracking-wide text-gn-500">
                {s.context ? `${s.context} · ` : ""}
                {s.period}
              </dd>
            </div>
          ))}
        </dl>

        <ol className="mt-5 grid gap-1.5">
          {stats.map((s, i) => (
            <li key={s._id} id={`cite-${s._id}`} className="text-[12px] leading-relaxed text-gn-500">
              <span className="mr-1.5 font-mono text-accent">{i + 1}</span>
              {s.sourceOrg !== "Other" ? `${s.sourceOrg}, ` : ""}
              <a href={s.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">
                {s.sourceTitle}
              </a>
              {s.sourcePage ? `, ${s.sourcePage}` : ""}.
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
