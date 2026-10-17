import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
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
    <section style={{ background, borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }}>
      <div className="container-max">
        <SectionReveal variant="fade-up">
          <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>{eyebrow}</p>
          {title && (
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000", maxWidth: 760 }}>
              {title}
            </h2>
          )}
          {intro && <p style={{ marginTop: 12, fontSize: 16, color: "#515459", maxWidth: 680, lineHeight: 1.5 }}>{intro}</p>}
        </SectionReveal>

        <SectionReveal variant="fade-up" staggerChildren={0.08} className="grid grid-cols-2 lg:grid-cols-4" style={{ marginTop: title || intro ? 16 : 0 }}>
          {stats.map((s, i) => (
            <RevealItem key={s._id} variant="fade-up">
              <div
                className={`py-6 pr-4 lg:py-8 lg:pr-6 ${(i + 1) % 4 !== 0 && i < stats.length - 1 ? "lg:border-r" : ""}`}
                style={{ borderColor: "rgba(0,0,0,0.1)" }}
              >
                <p className="font-display" style={{ fontSize: "clamp(1.75rem, 7vw, 3rem)", fontWeight: 500, lineHeight: "125%", letterSpacing: "-1.44px", color: "#000" }}>
                  {formatStatistic(s)}
                  <a
                    href={`#cite-${s._id}`}
                    aria-label={`Source ${i + 1}`}
                    style={{ fontSize: 13, letterSpacing: 0, color: "#ff4c00", verticalAlign: "super", marginLeft: 4, fontFamily: "var(--font-body)" }}
                  >
                    {i + 1}
                  </a>
                </p>
                <h3 className="text-sm sm:text-base" style={{ marginTop: 8, fontWeight: 500, color: "#212429", lineHeight: 1.3 }}>{s.label}</h3>
                <p style={{ marginTop: 4, fontSize: 13, color: "#919499", lineHeight: 1.35 }}>
                  {s.context ? `${s.context} · ` : ""}{s.period}
                </p>
              </div>
            </RevealItem>
          ))}
        </SectionReveal>

        <ol style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.1)", listStyle: "none", display: "grid", gap: 6 }}>
          {stats.map((s, i) => (
            <li key={s._id} id={`cite-${s._id}`} style={{ fontSize: 12, color: "#919499", lineHeight: 1.5 }}>
              <span style={{ color: "#ff4c00", marginRight: 6 }}>{i + 1}</span>
              {s.sourceOrg !== "Other" ? `${s.sourceOrg}, ` : ""}
              <a href={s.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
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
