import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/magazine/primitives";
import type { Severity, ThreatWatchData } from "@/lib/cisa";

// Status colours always carry a text label and the score too, never colour alone. Tuned for the dark background.
const SEVERITY_STYLE: Record<Severity, { color: string; border: string; label: string }> = {
  CRITICAL: { color: "#fca5a5", border: "rgba(252,165,165,0.45)", label: "Critical" },
  HIGH: { color: "#fdba74", border: "rgba(253,186,116,0.45)", label: "High" },
  MEDIUM: { color: "#fde047", border: "rgba(253,224,71,0.4)", label: "Medium" },
  LOW: { color: "rgba(255,255,255,0.7)", border: "rgba(255,255,255,0.3)", label: "Low" },
};

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** CISA's catalogue of actively exploited vulnerabilities: headline figures and the latest additions. */
export function ThreatWatch({ data }: { data: ThreatWatchData }) {
  const stats = [
    { value: data.addedLast30Days, label: "Added in the last 30 days", description: "New vulnerabilities confirmed as actively exploited" },
    { value: data.ransomwareLinked, label: "Linked to ransomware", description: "Known to be used in ransomware campaigns" },
    { value: data.total, label: "Exploited in the wild", description: "Total entries in the CISA catalogue" },
  ];

  return (
    <section className="relative overflow-hidden bg-bg-dark text-white">
      <div className="tech-grid-dark absolute inset-0" aria-hidden />
      <div className="container-max relative py-14 lg:py-20">
        <SectionHeader title="Threat watch" dark />
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1]">What attackers are exploiting right now.</h2>
          <p className="text-[16px] leading-relaxed text-white/60">
            These are not theoretical risks. Every vulnerability below has been confirmed as actively exploited, many in software that
            Ugandan banks, telcos and government agencies run every day.
          </p>
        </div>

        <dl className="mt-10 grid grid-cols-1 border-t border-white/20 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="border-b border-white/15 py-6 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-mono text-[clamp(34px,5vw,48px)] font-semibold leading-none tabular-nums">{stat.value.toLocaleString("en-GB")}</dd>
              <dd className="mt-3 text-[15px] font-medium">{stat.label}</dd>
              <dd className="mt-1 text-[14px] text-white/55">{stat.description}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-12 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">Latest additions</p>
        <ul className="mt-3 border-t-2 border-white/80">
          {data.latest.map((item) => (
            <li key={item.cveId} className="grid gap-x-6 gap-y-1.5 border-b border-white/15 py-5 md:grid-cols-[120px_1fr]">
              <span className="font-mono text-[12px] uppercase tracking-wide text-white/45 tabular-nums">{formatDate(item.dateAdded)}</span>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span className="font-serif text-[19px] font-semibold">
                    {item.vendor} {item.product}
                  </span>
                  <a
                    href={`https://nvd.nist.gov/vuln/detail/${item.cveId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[12px] text-white/70 underline underline-offset-2 hover:text-accent"
                  >
                    {item.cveId}
                  </a>
                  {item.cvss && (
                    <span
                      title={`CVSS base score ${item.cvss.score} (NVD)`}
                      className="border px-1.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wide tabular-nums"
                      style={{ color: SEVERITY_STYLE[item.cvss.severity].color, borderColor: SEVERITY_STYLE[item.cvss.severity].border }}
                    >
                      {SEVERITY_STYLE[item.cvss.severity].label} · {item.cvss.score.toFixed(1)}
                    </span>
                  )}
                  {item.ransomware && (
                    <span className="border border-accent/60 px-1.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-accent">
                      Used in ransomware
                    </span>
                  )}
                </div>
                <p className="mt-2 line-clamp-2 max-w-3xl text-[14px] leading-relaxed text-white/60">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-xl text-[13px] leading-relaxed text-white/50">
            Source:{" "}
            <a href="https://www.cisa.gov/known-exploited-vulnerabilities-catalog" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">
              CISA Known Exploited Vulnerabilities Catalog
            </a>
            , as of {formatDate(data.catalogDate)}. Severity scores (CVSS) and details from the US National Vulnerability Database.
          </p>
          <Button variant="primary" size="lg" href="#enquiry">
            Check your exposure
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
