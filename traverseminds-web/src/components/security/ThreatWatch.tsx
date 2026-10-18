import { AlertTriangle, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import type { Severity, ThreatWatchData } from "@/lib/cisa";

// Status colours carry a text label and score too, never colour alone
const SEVERITY_STYLE: Record<Severity, { color: string; background: string; label: string }> = {
  CRITICAL: { color: "#b91c1c", background: "rgba(185,28,28,0.1)", label: "Critical" },
  HIGH: { color: "#c2410c", background: "rgba(194,65,12,0.1)", label: "High" },
  MEDIUM: { color: "#a16207", background: "rgba(161,98,7,0.1)", label: "Medium" },
  LOW: { color: "#515459", background: "rgba(81,84,89,0.1)", label: "Low" },
};

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export function ThreatWatch({ data }: { data: ThreatWatchData }) {
  const stats = [
    { value: data.addedLast30Days, label: "Added in the last 30 days", description: "New vulnerabilities confirmed as actively exploited" },
    { value: data.ransomwareLinked, label: "Linked to ransomware", description: "Known to be used in ransomware campaigns" },
    { value: data.total, label: "Exploited in the wild", description: "Total entries in the CISA catalogue" },
  ];

  return (
    <section style={{ background: "#f0f1f4", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }}>
      <div className="container-max">
        <SectionReveal variant="fade-up">
          <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Threat Watch</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000", maxWidth: 760 }}>
            What attackers are exploiting right now
          </h2>
          <p style={{ marginTop: 12, fontSize: 16, color: "#515459", maxWidth: 680, lineHeight: 1.5 }}>
            These are not theoretical risks. Every vulnerability below has been confirmed as actively
            exploited, many in software that Ugandan banks, telcos and government agencies run every day.
          </p>
        </SectionReveal>

        <SectionReveal variant="fade-up" staggerChildren={0.1} className="grid grid-cols-3">
          {stats.map((stat, i) => (
            <RevealItem key={stat.label} variant="fade-up">
              <div
                className={`pr-3 sm:pr-6 ${i < stats.length - 1 ? "border-r" : ""}`}
                style={{ paddingTop: 32, paddingBottom: 32, borderColor: "rgba(0,0,0,0.1)" }}
              >
                <p className="font-display" style={{ fontSize: "clamp(2rem, 8vw, 3rem)", fontWeight: 500, lineHeight: "125%", letterSpacing: "-1.44px", color: "#000" }}>
                  {stat.value.toLocaleString("en-GB")}
                </p>
                <h3 className="text-sm sm:text-base" style={{ marginTop: 8, fontWeight: 500, color: "#212429", lineHeight: 1.3 }}>{stat.label}</h3>
                <p className="hidden sm:block" style={{ marginTop: 4, fontSize: 14, color: "#6b6e73", lineHeight: "125%" }}>{stat.description}</p>
              </div>
            </RevealItem>
          ))}
        </SectionReveal>

        <SectionReveal variant="fade-up" delay={0.1}>
          <h3 style={{ marginTop: 24, marginBottom: 16, fontSize: 20, fontWeight: 500, color: "#000" }}>
            Latest additions
          </h3>
        </SectionReveal>

        <SectionReveal variant="fade-up" staggerChildren={0.06} as="div">
          <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid rgba(0,0,0,0.1)" }}>
            {data.latest.map((item) => (
              <RevealItem key={item.cveId} variant="fade-up">
                <li style={{ padding: "20px 0", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "4px 16px" }}>
                    <span className="basis-full sm:basis-auto sm:min-w-24" style={{ fontSize: 13, color: "#6b6e73", fontVariantNumeric: "tabular-nums" }}>
                      {formatDate(item.dateAdded)}
                    </span>
                    <span style={{ fontSize: 16, fontWeight: 500, color: "#000" }}>
                      {item.vendor} {item.product}
                    </span>
                    <a
                      href={`https://nvd.nist.gov/vuln/detail/${item.cveId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 13, color: "#515459", textDecoration: "underline", display: "inline-flex", alignItems: "center", gap: 4 }}
                    >
                      {item.cveId}
                      <ExternalLink className="h-3 w-3" aria-hidden />
                    </a>
                    {item.cvss && (
                      <span
                        title={`CVSS base score ${item.cvss.score} (NVD)`}
                        style={{
                          fontSize: 12, fontWeight: 600, padding: "2px 8px", fontVariantNumeric: "tabular-nums",
                          color: SEVERITY_STYLE[item.cvss.severity].color,
                          background: SEVERITY_STYLE[item.cvss.severity].background,
                        }}
                      >
                        {SEVERITY_STYLE[item.cvss.severity].label} · {item.cvss.score.toFixed(1)}
                      </span>
                    )}
                    {item.ransomware && (
                      <span
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 500,
                          color: "#b45309", background: "rgba(180,83,9,0.1)", padding: "2px 8px",
                        }}
                      >
                        <AlertTriangle className="h-3 w-3" aria-hidden />
                        Used in ransomware
                      </span>
                    )}
                  </div>
                  <p
                    style={{ marginTop: 6, fontSize: 14, color: "#515459", lineHeight: 1.5, maxWidth: 860 }}
                    className="sm:pl-[112px] line-clamp-2"
                  >
                    {item.description}
                  </p>
                </li>
              </RevealItem>
            ))}
          </ul>
        </SectionReveal>

        <SectionReveal variant="fade-up" delay={0.1}>
          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
            <p style={{ fontSize: 13, color: "#6b6e73", lineHeight: 1.5, maxWidth: 560 }}>
              Source:{" "}
              <a href="https://www.cisa.gov/known-exploited-vulnerabilities-catalog" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
                CISA Known Exploited Vulnerabilities Catalog
              </a>
              , as of {formatDate(data.catalogDate)}. Severity scores (CVSS) and details from the US National Vulnerability Database.
            </p>
            <Button variant="primary" size="lg" href="#enquiry">
              Check your exposure
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
