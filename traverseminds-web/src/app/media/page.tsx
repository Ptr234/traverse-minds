import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SectionBar } from "@/components/magazine/SectionBar";
import { PageHeader } from "@/components/magazine/PageHeader";
import { SectionHeader } from "@/components/magazine/primitives";
import { Button } from "@/components/ui/Button";
import { PageTransition } from "@/components/ui/PageTransition";
import { getSiteSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Traverse Media and the Facts & Figures Podcast",
  description: "Facts & Figures — Africa's civic-tech podcast. Data journalism, policy explainers, and independent reporting driven by evidence.",
};

const FORMATS = [
  { title: "Data journalism", desc: "Turning public record datasets into investigative stories and policy explainers." },
  { title: "Podcast and video", desc: "Long-form conversations with Africa's cybersecurity leaders, policy-makers and civic-tech practitioners." },
];

const KIT = ["Official logo suite (SVG, PNG)", "Leadership bios and headshots", "Division overview one-pagers", "Brand guidelines and colour palette"];

export default async function MediaPage() {
  const settings = await getSiteSettings();
  return (
    <main className="flex flex-col">
      <PageTransition>
        <SectionBar />
        <PageHeader
          crumbs={[{ name: "Home", href: "/" }, { name: "Media", href: "/media" }]}
          kicker="Facts & Figures"
          title="The Policy Podcast"
          dek="Unpacking the data, laws and technology shaping Africa."
        />

        {/* Mission */}
        <section className="bg-white">
          <div className="container-max py-14 lg:py-20">
            <SectionHeader title="Our mission" />
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden bg-gn-800">
                  <Image src={settings.mediaImage} alt="Traverse Media at work" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
                </div>
              </figure>
              <div>
                <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] text-black">The Facts &amp; Figures podcast.</h2>
                <p className="mt-4 text-[17px] leading-relaxed text-gn-400">
                  Traverse Media bridges the gap between complex research and everyday understanding. Our flagship podcast, Facts &amp;
                  Figures, translates Think Tank findings and Public Record Africa data into accessible stories for African citizens.
                </p>
                <ol className="mt-8 border-t-2 border-black">
                  {FORMATS.map((f, i) => (
                    <li key={f.title} className="grid grid-cols-[48px_1fr] border-b border-black/15 py-5">
                      <span className="font-mono text-[24px] font-semibold leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="font-serif text-[21px] font-semibold text-black">{f.title}</h3>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-gn-400">{f.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-8">
                  <Button variant="primary" size="lg" href="/blog">
                    Read our latest stories
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Podcast and guests */}
        <section className="bg-bg-light">
          <div className="container-max py-14 lg:py-20">
            <SectionHeader title="Listen and take part" />
            <div className="grid gap-px border border-black/10 bg-black/10 lg:grid-cols-2">
              <div className="flex flex-col bg-white p-8 lg:p-10">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">Coming soon</p>
                <h2 className="mt-3 font-serif text-[clamp(24px,2.6vw,32px)] font-semibold leading-tight text-black">The podcast is launching soon.</h2>
                <p className="mt-4 text-[16px] leading-relaxed text-gn-400">
                  Facts &amp; Figures will be available on the major podcast platforms. Subscribe to our briefing and we will tell you when the
                  first episode is out.
                </p>
                <div className="mt-auto pt-8">
                  <Button variant="primary" size="lg" href="/#newsletter">
                    Get notified
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col bg-white p-8 lg:p-10">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">Be a guest</p>
                <h2 className="mt-3 font-serif text-[clamp(24px,2.6vw,32px)] font-semibold leading-tight text-black">Appear on Facts &amp; Figures.</h2>
                <p className="mt-4 text-[16px] leading-relaxed text-gn-400">
                  Pitch a topic or apply to be a guest. We feature cybersecurity leaders, policy experts and civic-tech practitioners from
                  across Africa.
                </p>
                <div className="mt-auto pt-8">
                  <Button variant="outline" size="lg" href="/contact?subject=podcast-guest">
                    Pitch a topic
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Media kit */}
        <section className="relative overflow-hidden bg-bg-dark text-white">
          <div className="tech-grid-dark absolute inset-0" aria-hidden />
          <div className="container-max relative py-14 lg:py-20">
            <SectionHeader title="Press" dark />
            <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
              <div>
                <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1]">Media kit and resources.</h2>
                <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-white/65">
                  Official logos, leadership bios and division overviews for press coverage and partnership enquiries. Request the kit and we
                  will send it to you.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button variant="primary" size="lg" href="/contact?subject=media-kit">
                    Request the media kit
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline-dark" size="lg" href="/contact?subject=interview">
                    Request an interview
                  </Button>
                </div>
              </div>
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">The kit includes</p>
                <ul className="mt-3 border-t border-white/20">
                  {KIT.map((item) => (
                    <li key={item} className="border-b border-white/15 py-3 text-[15px] text-white/80">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </PageTransition>
    </main>
  );
}
