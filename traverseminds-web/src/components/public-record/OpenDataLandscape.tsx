import { ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/magazine/primitives";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import type { OpenDataLandscapeData } from "@/lib/hdx";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export function OpenDataLandscape({ data }: { data: OpenDataLandscapeData }) {
  const max = Math.max(...data.publishers.map((p) => p.count));

  return (
    <section className="bg-bg-light py-14 lg:py-20">
      <div className="container-max">
        <SectionReveal variant="fade-up">
          <SectionHeader title="The Problem, In Numbers" />
          <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1]">
            Uganda&rsquo;s public data is everywhere, and nowhere
          </h2>
          <p style={{ marginTop: 12, fontSize: 16, color: "#515459", maxWidth: 680, lineHeight: 1.5 }}>
            One open-data portal alone lists{" "}
            <strong style={{ color: "#000" }}>{data.total.toLocaleString("en-GB")} datasets</strong> about Uganda,
            published by dozens of different agencies, each in its own format and licence. Public Record
            brings records like these into one searchable place.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "48px 64px", marginTop: 40 }}>
          <SectionReveal variant="fade-up">
            <figure style={{ margin: 0 }}>
              <figcaption style={{ marginBottom: 16 }}>
                <span style={{ display: "block", fontSize: 16, fontWeight: 500, color: "#212429" }}>Top publishers</span>
                <span style={{ display: "block", fontSize: 13, color: "#6b6e73" }}>Number of Uganda datasets</span>
              </figcaption>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 10 }}>
                {data.publishers.map((p) => (
                  <li
                    key={p.name}
                    title={`${p.name}: ${p.count} datasets`}
                    style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(56px, 1fr) 28px", alignItems: "center", gap: 12 }}
                  >
                    <span style={{ fontSize: 14, color: "#212429", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</span>
                    <span style={{ height: 10, background: "#e1e4e9" }}>
                      <span style={{ display: "block", height: "100%", width: `${(p.count / max) * 100}%`, background: "#212429" }} />
                    </span>
                    <span style={{ fontSize: 14, color: "#212429", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{p.count}</span>
                  </li>
                ))}
              </ul>
            </figure>
          </SectionReveal>

          <div>
            <SectionReveal variant="fade-up">
              <p style={{ fontSize: 16, fontWeight: 500, color: "#212429" }}>Recently updated</p>
              <p style={{ fontSize: 13, color: "#6b6e73", marginBottom: 16 }}>Each dataset keeps its own publisher&rsquo;s licence</p>
            </SectionReveal>
            <SectionReveal variant="fade-up" staggerChildren={0.06} as="div">
              <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid rgba(0,0,0,0.1)" }}>
                {data.latest.map((d) => (
                  <RevealItem key={d.url} variant="fade-up">
                    <li style={{ padding: "14px 0", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                      <a
                        href={d.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                        style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}
                      >
                        <span>
                          <span className="group-hover:text-accent transition-colors" style={{ display: "block", fontSize: 14, fontWeight: 500, color: "#000", lineHeight: 1.4 }}>
                            {d.title}
                          </span>
                          <span style={{ display: "block", marginTop: 4, fontSize: 12, color: "#6b6e73" }}>
                            {d.publisher} · {d.licence} · {formatDate(d.updated)}
                          </span>
                        </span>
                        <ExternalLink className="h-3.5 w-3.5 shrink-0" style={{ color: "#6b6e73", marginTop: 3 }} aria-hidden />
                      </a>
                    </li>
                  </RevealItem>
                ))}
              </ul>
            </SectionReveal>
          </div>
        </div>

        <p style={{ marginTop: 32, fontSize: 13, color: "#6b6e73", lineHeight: 1.5 }}>
          Source:{" "}
          <a href="https://data.humdata.org/group/uga" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
            Humanitarian Data Exchange (OCHA)
          </a>
          , dataset catalogue for Uganda. Figures update each time the site is rebuilt.
        </p>
      </div>
    </section>
  );
}
