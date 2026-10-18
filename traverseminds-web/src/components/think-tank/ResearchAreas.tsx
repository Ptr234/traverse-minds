import { SectionHeader } from "@/components/magazine/primitives";

const areas = [
  { title: "Data protection", description: "Analysing the impact and implementation of Uganda's Data Protection and Privacy Act, 2019 and regional data protection frameworks." },
  { title: "AI governance", description: "Researching ethics, bias, and regulatory approaches to artificial intelligence in the African context." },
  { title: "Cybersecurity policy", description: "Evaluating national cybersecurity strategies, incident reporting frameworks, and sector-specific regulations across Africa." },
  { title: "Open government", description: "Advocating for data transparency, digitisation of public records, and OGP commitments to improve accountability." },
  { title: "Digital rights", description: "Investigating online freedoms, surveillance oversight, and the balance between security and civil liberties." },
  { title: "Public procurement", description: "Analysing transparency in government procurement and the role of technology in reducing corruption." },
];

/** The Think Tank's research areas, as a numbered index. */
export function ResearchAreas() {
  return (
    <section className="bg-bg-light">
      <div className="container-max py-14 lg:py-20">
        <SectionHeader title="Focus areas" />
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] text-black">Our core research areas.</h2>
          <p className="text-[17px] leading-relaxed text-gn-400">
            The most critical intersections of technology, law and society in Africa.
          </p>
        </div>
        <ol className="mt-10 grid gap-px border-t-2 border-black bg-black/15 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, i) => (
            <li key={area.title} className="bg-bg-light px-1 py-7 sm:px-7">
              <span className="font-mono text-[32px] font-semibold leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-serif text-[22px] font-semibold text-black">{area.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-gn-400">{area.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
