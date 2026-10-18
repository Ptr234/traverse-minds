import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/magazine/primitives";

type Service = { title: string; slug: string; description: string; image: string };

/** Service cards; the services and their images are edited in Sanity. */
export function ServiceCards({ services }: { services: Service[] }) {
  return (
    <section className="bg-white">
      <div className="container-max py-14 lg:py-20">
        <SectionHeader title="Our expertise" />
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] text-black">
            Robust cybersecurity for today&apos;s threats.
          </h2>
          <p className="text-[17px] leading-relaxed text-gn-400">
            {services.length === 6 ? "Six core capabilities" : "Core capabilities"} designed for African banks, government agencies and enterprises.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc, i) => (
            <li key={svc.slug}>
              <Link href={`/security/${svc.slug}`} className="group flex h-full flex-col">
                <div className="tech-card relative aspect-[3/2] overflow-hidden bg-gn-800">
                  <Image src={svc.image} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
                <p className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
                  Service {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1.5 font-serif text-[23px] font-semibold leading-tight text-black transition-colors group-hover:text-accent">
                  {svc.title}
                </h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-gn-400">{svc.description}</p>
                <span className="mt-4 inline-block self-start border-b border-black pb-0.5 text-[14px] font-semibold text-black group-hover:border-accent group-hover:text-accent">
                  Learn more &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
