import { ArrowUpRight, Scale } from "lucide-react";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import type { CaseSummary, LegislationAnswer } from "@/lib/lawsafrica";

const formatDate = (iso: string) =>
  iso ? new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "";

type Props = {
  answers: LegislationAnswer[] | null;
  cases: CaseSummary[] | null;
  eyebrow?: string;
  title?: string;
  intro?: string;
};

export function LegalReference({
  answers,
  cases,
  eyebrow = "The Law, At A Glance",
  title = "Uganda’s cyber and data law, in its own words",
  intro = "The questions our clients ask most, answered with the exact statutory provision. Every excerpt links to the full, current text on ULII.",
}: Props) {
  if (!answers?.length && !cases?.length) return null;

  return (
    <section style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }}>
      <div className="container-max">
        <SectionReveal variant="fade-up">
          <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>{eyebrow}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000", maxWidth: 760 }}>
            {title}
          </h2>
          <p style={{ marginTop: 12, fontSize: 16, color: "#515459", maxWidth: 680, lineHeight: 1.5 }}>{intro}</p>
        </SectionReveal>

        {answers && answers.length > 0 && (
          <SectionReveal variant="fade-up" staggerChildren={0.08} className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "0 56px", marginTop: 32 }}>
            {answers.map((a) => (
              <RevealItem key={a.question} variant="fade-up">
                <article style={{ padding: "24px 0", borderTop: "1px solid rgba(0,0,0,0.1)", height: "100%" }}>
                  <h3 style={{ fontSize: 18, fontWeight: 500, color: "#000", lineHeight: 1.3 }}>{a.question}</h3>
                  <blockquote style={{ margin: "12px 0 0", paddingLeft: 16, borderLeft: "2px solid #ff4c00", fontSize: 14, color: "#515459", lineHeight: 1.6 }}>
                    {a.excerpt}
                  </blockquote>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "#212429" }}
                  >
                    <span className="group-hover:text-accent transition-colors">
                      {a.act}{a.section ? `, ${a.section}` : ""}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  </a>
                </article>
              </RevealItem>
            ))}
          </SectionReveal>
        )}

        {cases && cases.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <SectionReveal variant="fade-up">
              <h3 style={{ fontSize: 20, fontWeight: 500, color: "#000" }}>What the courts have said</h3>
              <p style={{ fontSize: 14, color: "#919499", marginBottom: 16 }}>Recent Ugandan decisions on privacy, data, and computer crime</p>
            </SectionReveal>
            <SectionReveal variant="fade-up" staggerChildren={0.06} as="div">
              <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid rgba(0,0,0,0.1)" }}>
                {cases.map((c) => (
                  <RevealItem key={c.url} variant="fade-up">
                    <li style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="group" style={{ display: "flex", gap: 16, padding: "18px 0" }}>
                        <Scale className="h-5 w-5 shrink-0 text-accent" style={{ marginTop: 2 }} aria-hidden />
                        <span style={{ flex: 1 }}>
                          <span className="group-hover:text-accent transition-colors" style={{ display: "block", fontSize: 15, fontWeight: 500, color: "#000", lineHeight: 1.4 }}>
                            {c.title}
                          </span>
                          <span style={{ display: "block", marginTop: 2, fontSize: 12, color: "#919499" }}>
                            {[c.court, formatDate(c.date)].filter(Boolean).join(" · ")}
                          </span>
                          <span style={{ display: "block", marginTop: 6, fontSize: 14, color: "#515459", lineHeight: 1.5 }}>{c.summary}</span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0" style={{ color: "#919499", marginTop: 2 }} aria-hidden />
                      </a>
                    </li>
                  </RevealItem>
                ))}
              </ul>
            </SectionReveal>
          </div>
        )}

        <p style={{ marginTop: 32, fontSize: 12, color: "#919499", lineHeight: 1.6, maxWidth: 860 }}>
          Source: Uganda legislation and judgments via the{" "}
          <a href="https://laws.africa" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>Laws.Africa</a>{" "}
          Legal Knowledge Platform, with full texts on{" "}
          <a href="https://ulii.org" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>ULII</a>.
          Case summaries are Laws.Africa&rsquo;s. This is general information, not legal advice.
        </p>
      </div>
    </section>
  );
}
