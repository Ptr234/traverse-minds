import type { Metadata } from "next";
import Image from "next/image";
import { SectionBar } from "@/components/magazine/SectionBar";
import { PageHeader } from "@/components/magazine/PageHeader";
import { PartnersSection } from "@/components/magazine/PartnersSection";
import { getSiteSettings, getTeam } from "@/lib/cms";
import { Timeline } from "@/components/about/Timeline";
import { TeamGrid } from "@/components/about/TeamGrid";
import { ScheduleCall } from "@/components/about/ScheduleCall";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageTransition } from "@/components/ui/PageTransition";
import { SectionHeader } from "@/components/magazine/primitives";

export const metadata: Metadata = {
  title: "About Traverse Minds Africa",
  description:
    "Africa's integrated civic-tech company. Learn about our mission, team, and six interconnected divisions serving Africa.",
};

const divisions = [
  { name: "Traverse Security", desc: "Cybersecurity for banks and government", href: "/security" },
  { name: "Traverse Events", desc: "Cyber Luncheon, conferences, workshops", href: "/events" },
  { name: "Public Record Africa", desc: "AI-powered public document platform", href: "/public-record" },
  { name: "Digital Literacy", desc: "Cyber safety for schools, SMEs, government", href: "/literacy" },
  { name: "Traverse Media", desc: "Facts & Figures Podcast, data journalism", href: "/media" },
  { name: "Think Tank", desc: "Data protection, AI governance, OGP research", href: "/think-tank" },
];

// Placeholder values are left out until the real details are supplied
const companyDetails = [
  { label: "Registered name", value: "Traverse Minds Africa" },
  { label: "Registration no.", value: "[To be added]" },
  { label: "Registered address", value: "Kampala, Uganda" },
  { label: "Contact", value: "traversemindsug@gmail.com", href: "mailto:traversemindsug@gmail.com" },
].filter((d) => !d.value.startsWith("["));

const africanCountries = [
  { code: "dz", name: "Algeria" }, { code: "ao", name: "Angola" }, { code: "bj", name: "Benin" },
  { code: "bw", name: "Botswana" }, { code: "bf", name: "Burkina Faso" }, { code: "bi", name: "Burundi" },
  { code: "cv", name: "Cabo Verde" }, { code: "cm", name: "Cameroon" }, { code: "cf", name: "Central African Republic" },
  { code: "td", name: "Chad" }, { code: "km", name: "Comoros" }, { code: "cd", name: "DR Congo" },
  { code: "cg", name: "Republic of the Congo" }, { code: "dj", name: "Djibouti" }, { code: "eg", name: "Egypt" },
  { code: "gq", name: "Equatorial Guinea" }, { code: "er", name: "Eritrea" }, { code: "sz", name: "Eswatini" },
  { code: "et", name: "Ethiopia" }, { code: "ga", name: "Gabon" }, { code: "gm", name: "Gambia" },
  { code: "gh", name: "Ghana" }, { code: "gn", name: "Guinea" }, { code: "gw", name: "Guinea-Bissau" },
  { code: "ci", name: "Ivory Coast" }, { code: "ke", name: "Kenya" }, { code: "ls", name: "Lesotho" },
  { code: "lr", name: "Liberia" }, { code: "ly", name: "Libya" }, { code: "mg", name: "Madagascar" },
  { code: "mw", name: "Malawi" }, { code: "ml", name: "Mali" }, { code: "mr", name: "Mauritania" },
  { code: "mu", name: "Mauritius" }, { code: "ma", name: "Morocco" }, { code: "mz", name: "Mozambique" },
  { code: "na", name: "Namibia" }, { code: "ne", name: "Niger" }, { code: "ng", name: "Nigeria" },
  { code: "rw", name: "Rwanda" }, { code: "st", name: "Sao Tome and Principe" }, { code: "sn", name: "Senegal" },
  { code: "sc", name: "Seychelles" }, { code: "sl", name: "Sierra Leone" }, { code: "so", name: "Somalia" },
  { code: "za", name: "South Africa" }, { code: "ss", name: "South Sudan" }, { code: "sd", name: "Sudan" },
  { code: "tz", name: "Tanzania" }, { code: "tg", name: "Togo" }, { code: "tn", name: "Tunisia" },
  { code: "ug", name: "Uganda" }, { code: "zm", name: "Zambia" }, { code: "zw", name: "Zimbabwe" }
];

export default async function AboutPage() {
  const [settings, team] = await Promise.all([getSiteSettings(), getTeam()]);
  return (
    <PageTransition>
      <SectionBar />
      <PageHeader
        crumbs={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]}
        kicker="Our mission"
        title="A digitally secure Africa"
        dek="Built for Africa, driven by evidence: technology serving the public interest, anchored in local laws and shaped by independent research."
      />

      {/* The model: one company, six divisions */}
      <section className="relative overflow-hidden bg-bg-dark text-white">
        <div className="tech-grid-dark absolute inset-0" aria-hidden />
        <div className="container-max relative py-14 lg:py-20">
          <SectionHeader title="Our model" dark />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                <Image src={settings.aboutImage} alt="The Traverse Minds team at work" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
              </div>
              <figcaption className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-white/45">
                <span>Kampala, Uganda</span>
                <span>06 divisions · 01 mission</span>
              </figcaption>
            </figure>

            <div>
              <h2 className="font-serif text-[clamp(28px,3.4vw,40px)] font-semibold leading-tight">One company, six divisions.</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-white/65">
                Traverse Minds Africa is one integrated organisation where every division strengthens the others.
                Security audits are informed by Think Tank research. Events build community for all divisions.
                Media amplifies research findings to a wider audience.
              </p>
              <ol className="mt-8 border-t border-white/15">
                {divisions.map((d, i) => (
                  <li key={d.name} className="border-b border-white/15">
                    <Link href={d.href} className="group flex items-baseline gap-4 py-3.5 transition-colors hover:bg-white/[0.04]">
                      <span className="w-6 shrink-0 font-mono text-[12px] text-white/35">{String(i + 1).padStart(2, "0")}</span>
                      <span className="min-w-0 grow">
                        <span className="block font-serif text-[19px] font-semibold leading-tight group-hover:text-accent">{d.name}</span>
                        <span className="mt-0.5 block text-[14px] text-white/55">{d.desc}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 -translate-x-1 text-accent opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Regional reach */}
      <section className="bg-white">
        <div className="container-max py-14 lg:py-20">
          <SectionHeader title="Regional reach" />
          <div className="grid gap-10 lg:grid-cols-[1fr_2.2fr] lg:gap-14">
            <div>
              <h2 className="font-serif text-[clamp(26px,3vw,36px)] font-semibold leading-tight text-black">Serving Africa.</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-gn-400">
                Our work spans the African continent, building a safer digital future across the region from our base in Kampala.
              </p>
              <dl className="mt-8 grid grid-cols-2 border-t border-black/15">
                <div className="border-b border-r border-black/15 py-4 pr-4">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-gn-500">Countries</dt>
                  <dd className="mt-1 font-mono text-[28px] font-semibold text-black">{africanCountries.length}</dd>
                </div>
                <div className="border-b border-black/15 py-4 pl-4">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-gn-500">Headquarters</dt>
                  <dd className="mt-1 font-serif text-[22px] font-semibold text-black">Kampala</dd>
                </div>
              </dl>
            </div>
            <ul className="grid grid-cols-2 gap-px border border-black/10 bg-black/10 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5" aria-label="Countries we serve">
              {africanCountries.map((country) => (
                <li key={country.code} className={`flex items-center gap-2.5 px-3 py-2.5 ${country.code === "ug" ? "bg-accent/10" : "bg-white"}`}>
                  <Image
                    src={`https://flagcdn.com/w40/${country.code}.png`}
                    alt=""
                    width={20}
                    height={14}
                    className="h-3.5 w-5 shrink-0 object-cover ring-1 ring-black/10"
                  />
                  <span className="truncate text-[12px] text-gn-200" title={country.name}>{country.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Timeline background={settings.timelineImage} />
      <TeamGrid teamMembers={team} />

      <PartnersSection background="paper" />

      {/* Company details */}
      <section className="bg-white">
        <div className="container-max py-14">
          <SectionHeader title="Company details" />
          <dl className="grid border-t border-black/15 sm:grid-cols-3">
            {companyDetails.map((d) => (
              <div key={d.label} className="border-b border-black/15 py-4 sm:pr-6">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-gn-500">{d.label}</dt>
                <dd className="mt-1.5 text-[16px] font-semibold text-black">
                  {d.href ? <a href={d.href} className="hover:text-accent">{d.value}</a> : d.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ScheduleCall />
    </PageTransition>
  );
}
