import { SectionHeader } from "@/components/magazine/primitives";

const features = [
  { title: "Semantic search", description: "Search documents by meaning and context, not just keywords, to find relevant case law or regulatory updates in seconds." },
  { title: "AI summarisation", description: "Concise summaries of lengthy documents, policy briefs and court judgments." },
  { title: "Smart alerts", description: "Monitor keywords, organisations or topics, and get notified when new matching records are added." },
  { title: "Cross-border view", description: "Compare regulations and public records across East Africa, starting with Uganda and expanding to Kenya, Tanzania, Rwanda and Burundi." },
  { title: "Growing archive", description: "Legislation and court judgments first, starting with Uganda, with gazettes and Hansard to follow." },
  { title: "Verified sources", description: "Every document links back to its official source, so you can cite it with confidence." },
];

/** What the platform does, as a numbered index. */
export function Features() {
  return (
    <section className="bg-white">
      <div className="container-max py-14 lg:py-20">
        <SectionHeader title="Platform" />
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] text-black">Built to empower evidence-based action.</h2>
          <p className="text-[17px] leading-relaxed text-gn-400">
            Search, summaries and monitoring on top of public records, with the original source always one click away.
          </p>
        </div>
        <ol className="mt-10 grid gap-px border-t-2 border-black bg-black/15 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <li key={f.title} className="bg-white px-1 py-7 sm:px-7">
              <span className="font-mono text-[28px] font-semibold leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-serif text-[21px] font-semibold text-black">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-gn-400">{f.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
