import Image from "next/image";
import { SectionHeader } from "@/components/magazine/primitives";

const milestones = [
  {
    year: "2024",
    title: "The idea takes shape",
    description:
      "Founded in Kampala with a clear conviction: Africa needs homegrown cybersecurity and civic-tech capacity.",
  },
  {
    year: "2025",
    title: "Traverse Security launches",
    description:
      "First cybersecurity engagements with Ugandan financial institutions. Built a team of certified security professionals.",
  },
  {
    year: "2025",
    title: "Think Tank established",
    description:
      "Published first independent policy brief on Uganda's PDPA 2019 implementation gaps.",
  },
  {
    year: "2026",
    title: "Six divisions, one mission",
    description:
      "Expanded to six interconnected divisions: Security, Events, Public Record Africa, Digital Literacy, Media, and Think Tank.",
  },
];

/** Company milestones as a horizontal timeline; the background image is edited in Sanity (Site Settings). */
export function Timeline({ background }: { background: string }) {
  return (
    <section className="relative overflow-hidden bg-bg-dark text-white">
      <div className="absolute inset-0" aria-hidden>
        <Image src={background} alt="" fill className="object-cover opacity-15" sizes="100vw" />
        <div className="tech-grid-dark absolute inset-0" />
      </div>

      <div className="container-max relative py-14 lg:py-20">
        <SectionHeader title="Our journey" dark />
        <h2 className="max-w-2xl font-serif text-[clamp(28px,3.4vw,40px)] font-semibold leading-tight">
          From an idea in Kampala to six divisions.
        </h2>

        <ol className="mt-12 grid gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {milestones.map((m, i) => (
            <li key={m.title} className="relative border-t border-white/25 pt-6 md:pr-8">
              {/* Marker on the line */}
              <span className="absolute -top-1.25 left-0 h-2.25 w-2.25 bg-accent" aria-hidden />
              <p className="flex items-baseline justify-between font-mono text-[12px] text-white/40">
                <span className="text-[26px] font-semibold text-white">{m.year}</span>
                <span>{String(i + 1).padStart(2, "0")}</span>
              </p>
              <h3 className="mt-3 font-serif text-[20px] font-semibold leading-snug">{m.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/60">{m.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
