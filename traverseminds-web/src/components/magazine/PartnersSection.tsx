import Image from "next/image";
import { SectionHeader } from "@/components/magazine/primitives";
import { getPartners } from "@/lib/cms";

/** "Partners & Affiliations": logo tiles with each name underneath; partners are edited in Sanity. */
export async function PartnersSection({ background = "white" }: { background?: "white" | "paper" }) {
  const partners = await getPartners();
  if (partners.length === 0) return null;
  return (
    <section className={background === "paper" ? "bg-bg-light" : "bg-white"} aria-label="Partners & Affiliations">
      <div className="container-max py-12">
        <SectionHeader title="Partners & Affiliations" />
        <ul className="grid grid-cols-3 gap-x-4 gap-y-6 md:gap-x-8">
          {partners.map((p) => (
            <li key={p.name} className="group">
              <div className="relative aspect-[3/2] md:aspect-[2/1] border border-black/10 bg-white transition-colors group-hover:border-black/25">
                <span className="hud-frame absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
                <Image
                  src={p.logo}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 33vw, 380px"
                  className="object-contain p-4 grayscale transition duration-300 group-hover:grayscale-0 sm:p-8 md:px-14 md:py-10"
                />
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase leading-snug tracking-wider text-gn-400 sm:text-[12px]">{p.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
