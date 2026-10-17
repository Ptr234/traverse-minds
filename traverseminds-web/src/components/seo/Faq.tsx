import { ChevronDown } from "lucide-react";

export type FaqItem = { question: string; answer: string };

/** FAQ accordion with FAQPage structured data, so answers can appear in Google results. */
export function Faq({ items, eyebrow = "FAQ", title = "Frequently asked questions" }: { items: FaqItem[]; eyebrow?: string; title?: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };

  return (
    <section style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container-max">
        <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>{eyebrow}</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000" }}>{title}</h2>
        <div style={{ marginTop: 32, borderTop: "1px solid rgba(0,0,0,0.1)", maxWidth: 860 }}>
          {items.map((item) => (
            <details key={item.question} className="group" style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden"
                style={{ padding: "20px 0", fontSize: 17, fontWeight: 500, color: "#000" }}
              >
                {item.question}
                <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" style={{ color: "#919499" }} aria-hidden />
              </summary>
              <p style={{ paddingBottom: 20, fontSize: 15, color: "#515459", lineHeight: 1.6, maxWidth: 760 }}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
