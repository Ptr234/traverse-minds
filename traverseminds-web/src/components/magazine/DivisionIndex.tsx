import Link from "next/link";
import { DIVISIONS } from "@/lib/divisions";
import { SectionHeader } from "./primitives";

/** "Inside Traverse Minds": a text index of the six divisions, like a magazine contents page. */
export function DivisionIndex() {
  return (
    <section className="bg-gn-900">
      <div className="container-max py-12">
        <SectionHeader title="Inside Traverse Minds" href="/about" linkLabel="About us" />
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {DIVISIONS.map((d, i) => (
            <li key={d.key} className="border-b border-black/10 sm:[&:nth-child(odd)]:pr-8 lg:[&:nth-child(odd)]:pr-0 lg:pr-8">
              <Link href={d.href} className="group flex gap-5 py-6">
                <span className="font-serif text-[15px] font-semibold text-gn-500">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-serif text-[22px] font-semibold leading-tight text-black group-hover:text-accent transition-colors">{d.label}</span>
                  <span className="mt-2 block text-[14px] leading-relaxed text-gn-400">{d.blurb}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
