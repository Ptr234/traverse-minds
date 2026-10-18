import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionBar } from "@/components/magazine/SectionBar";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

const destinations = [
  { label: "Home", href: "/", desc: "The latest analysis, research and events." },
  { label: "Security", href: "/security", desc: "Cybersecurity services for banks and government." },
  { label: "Think Tank", href: "/think-tank", desc: "Independent research and policy analysis." },
  { label: "Contact", href: "/contact", desc: "Tell us what you were looking for." },
];

export default function NotFound() {
  return (
    <>
      <SectionBar />
      <section className="container-max py-14 lg:py-20">
        <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-accent-ink">Error 404</p>
        <h1 className="mt-4 max-w-2xl font-serif text-[clamp(34px,5vw,56px)] font-semibold leading-[1.08] text-black">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-gn-400">
          The link may be out of date, or the address may have a typo. These are good places to continue.
        </p>
        <ul className="mt-10 max-w-3xl border-t-2 border-black">
          {destinations.map((d) => (
            <li key={d.href} className="border-b border-black/15">
              <Link href={d.href} className="group flex items-center justify-between gap-4 py-4">
                <span>
                  <span className="block font-serif text-[21px] font-semibold text-black group-hover:text-accent">{d.label}</span>
                  <span className="mt-0.5 block text-[15px] text-gn-400">{d.desc}</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-gn-400 group-hover:text-accent" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
