import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { formatValue, type IndicatorData, type TrendSeries } from "@/lib/worldbank";
import { TrendChart } from "./TrendChart";

const HEADLINE_IDS = ["IT.NET.USER.ZS", "IT.CEL.SETS.P2", "FX.OWN.TOTL.ZS", "EG.ELC.ACCS.ZS"];
const COMPARE_IDS = ["IT.NET.USER.ZS", "IT.CEL.SETS.P2", "IT.NET.BBND.P2", "EG.ELC.ACCS.ZS"];

const ACCENT = "#ff4c00";
const PEER = "#c1c4c9";

function ComparisonBars({ indicator }: { indicator: IndicatorData }) {
  const sorted = [...indicator.values].sort((a, b) => b.value - a.value);
  const max = Math.max(...sorted.map((v) => v.value));
  // Flag figures older than the rest of the group (e.g. a country missing the latest survey)
  const latestYear = sorted.map((v) => v.year).sort().at(-1);

  return (
    <figure style={{ margin: 0 }}>
      <figcaption style={{ marginBottom: 16 }}>
        <span style={{ display: "block", fontSize: 16, fontWeight: 500, color: "#212429" }}>{indicator.label}</span>
        <span style={{ display: "block", fontSize: 13, color: "#919499" }}>{indicator.unit}</span>
      </figcaption>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 10 }}>
        {sorted.map((v) => {
          const isUganda = v.iso3 === "UGA";
          const label = `${v.name}: ${formatValue(v.value, indicator.decimals, indicator.suffix)} (${v.year})`;
          return (
            <li
              key={v.iso3}
              title={label}
              aria-label={label}
              style={{ display: "grid", gridTemplateColumns: "76px 1fr auto", alignItems: "center", gap: 12 }}
            >
              <span style={{ fontSize: 14, color: isUganda ? "#000" : "#515459", fontWeight: isUganda ? 600 : 400 }}>
                {v.name}
              </span>
              <span style={{ height: 10, background: "#e1e4e9", borderRadius: 4, overflow: "hidden" }}>
                <span
                  style={{
                    display: "block",
                    height: "100%",
                    width: `${Math.max((v.value / max) * 100, 1.5)}%`,
                    background: isUganda ? ACCENT : PEER,
                    borderRadius: 4,
                  }}
                />
              </span>
              <span style={{ fontSize: 14, fontVariantNumeric: "tabular-nums", color: "#212429", minWidth: 48, textAlign: "right" }}>
                {formatValue(v.value, indicator.decimals, indicator.suffix)}
                {v.year !== latestYear ? (
                  <span style={{ fontSize: 11, color: "#919499" }}> ’{v.year.slice(2)}</span>
                ) : null}
              </span>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}

export function DigitalSnapshot({ data, internetTrend }: { data: IndicatorData[]; internetTrend?: TrendSeries[] | null }) {
  const byId = (id: string) => data.find((d) => d.id === id);
  const uganda = (d: IndicatorData) => d.values.find((v) => v.iso3 === "UGA");

  const headlines = HEADLINE_IDS.map(byId).filter((d): d is IndicatorData => !!d && !!uganda(d));
  const comparisons = COMPARE_IDS.map(byId).filter((d): d is IndicatorData => !!d && d.values.length > 1);
  const years = [...new Set(data.flatMap((d) => d.values.map((v) => v.year)))].sort();

  return (
    <section style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }}>
      <div className="container-max">
        <SectionReveal variant="fade-up">
          <p className="eyebrow" style={{ color: ACCENT, marginBottom: 16 }}>Data Snapshot</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000", maxWidth: 760 }}>
            Uganda&rsquo;s digital gap, in numbers
          </h2>
          <p style={{ marginTop: 12, fontSize: 16, color: "#515459", maxWidth: 680, lineHeight: 1.5 }}>
            Most Ugandans own a phone, but far fewer are online. That gap between connection and
            capability is where digital literacy and cyber safety matter most.
          </p>
        </SectionReveal>

        <SectionReveal variant="fade-up" staggerChildren={0.1} className="grid grid-cols-2 lg:grid-cols-4">
          {headlines.map((d, i) => {
            const v = uganda(d)!;
            return (
              <RevealItem key={d.id} variant="fade-up">
                <div
                  className={`py-5 pr-4 lg:py-8 lg:pr-6 ${i < headlines.length - 1 ? "lg:border-r" : ""}`}
                  style={{ borderColor: "rgba(0,0,0,0.1)" }}
                >
                  <p className="font-display" style={{ fontSize: "clamp(2rem, 8vw, 3rem)", fontWeight: 500, lineHeight: "125%", letterSpacing: "-1.44px", color: "#000" }}>
                    {formatValue(v.value, d.decimals, d.suffix)}
                  </p>
                  <h3 style={{ marginTop: 8, fontSize: 16, fontWeight: 500, color: "#212429" }}>{d.label}</h3>
                  <p style={{ marginTop: 4, fontSize: 14, color: "#919499", lineHeight: "125%" }}>
                    {d.unit}, {v.year}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </SectionReveal>

        <SectionReveal variant="fade-up" delay={0.1}>
          <h3 style={{ marginTop: 40, marginBottom: 24, fontSize: 20, fontWeight: 500, color: "#000" }}>
            How Uganda compares in East Africa
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "40px 56px" }}>
            {comparisons.map((d) => (
              <ComparisonBars key={d.id} indicator={d} />
            ))}
          </div>
          {internetTrend && internetTrend.length > 1 && (
            <div style={{ marginTop: 56 }}>
              <h3 style={{ marginBottom: 4, fontSize: 20, fontWeight: 500, color: "#000" }}>
                Internet use since 2000
              </h3>
              <p style={{ marginBottom: 20, fontSize: 14, color: "#919499" }}>Individuals using the internet, % of population</p>
              <TrendChart series={internetTrend} highlight="UGA" unit="Individuals using the internet, % of population" />
            </div>
          )}

          <p style={{ marginTop: 32, fontSize: 13, color: "#919499", lineHeight: 1.5 }}>
            Source:{" "}
            <a href="https://data.worldbank.org" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
              World Bank Open Data
            </a>{" "}
            (CC BY 4.0), most recent available year ({years[0] === years[years.length - 1] ? years[0] : `${years[0]}–${years[years.length - 1]}`}).
            Figures update each time the site is rebuilt.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
