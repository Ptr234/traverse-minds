import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/magazine/primitives";

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
    <section className="bg-white py-14 lg:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container-max">
        <SectionHeader title={eyebrow} />
        <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1]">{title}</h2>
        <div style={{ marginTop: 32, borderTop: "1px solid rgba(0,0,0,0.1)", maxWidth: 860 }}>
          {items.map((item) => (
            <details key={item.question} className="group" style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden"
                style={{ padding: "20px 0", fontSize: 17, fontWeight: 500, color: "#000" }}
              >
                {item.question}
                <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" style={{ color: "#6b6e73" }} aria-hidden />
              </summary>
              <p style={{ paddingBottom: 20, fontSize: 15, color: "#515459", lineHeight: 1.6, maxWidth: 760 }}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
