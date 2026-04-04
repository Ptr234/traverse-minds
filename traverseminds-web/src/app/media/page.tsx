import type { Metadata } from "next";
import Image from "next/image";

import { Hero as MediaHero } from "@/components/media/Hero";
import { Button } from "@/components/ui/Button";
import { Newspaper, MessageSquare, Download, ArrowRight, Mic, Rss } from "lucide-react";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { PageTransition } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Traverse Media & Facts & Figures Podcast | Traverse Minds",
  description: "Facts & Figures -- East Africa's civic-tech podcast. Data journalism, policy explainers, and independent reporting driven by evidence.",
};

const podcastPlatforms = [
  { name: "Spotify", href: "#", color: "bg-[#1DB954]" },
  { name: "Apple Podcasts", href: "#", color: "bg-[#9933CC]" },
  { name: "Google Podcasts", href: "#", color: "bg-[#4285F4]" },
  { name: "RSS Feed", href: "#", color: "bg-[#EE802F]" },
];

export default function MediaPage() {
  return (
    <main className="flex flex-col">
      <PageTransition>
        <MediaHero />

        {/* Media Philosophy */}
        <section style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
          <div className="container-max relative z-10">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
              <SectionReveal variant="clip-inset" className="order-2 lg:order-1">
                <div className="relative aspect-4/5 overflow-hidden" style={{ borderRadius: 16, boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1), 0 2px 2px 0 rgba(0,0,0,0.15), 0 1px 0 0 rgba(0,0,0,0.05)" }}>
                  <Image
                    src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop"
                    alt="Newsroom and digital media"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </SectionReveal>
              <SectionReveal variant="clip-right" delay={0.2} className="order-1 lg:order-2">
                <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Our Mission</p>

                <TextReveal
                  as="h2"
                  variant="blur-in"
                  className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]" style={{ color: "#000" }}
                >
                  The Facts & Figures Podcast
                </TextReveal>

                <p className="mt-6 text-base leading-relaxed" style={{ color: "#515459" }}>
                  Traverse Media bridges the gap between complex research and everyday understanding.
                  Our flagship podcast, Facts &amp; Figures, translates Think Tank findings and
                  Public Record EA data into accessible stories for East African citizens.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {[
                    { icon: Newspaper, title: "Data Journalism", desc: "Turning public record datasets into impactful investigative stories and policy explainers." },
                    { icon: MessageSquare, title: "Podcast & Video", desc: "Long-form conversations with East Africa's cybersecurity leaders, policy-makers, and civic-tech practitioners." },
                  ].map((item) => (
                    <div key={item.title} className="group flex flex-col gap-3">
                      <div className="flex h-11 w-11 items-center justify-center bg-primary/5" style={{ borderRadius: 8, transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
                        <item.icon className="h-5 w-5" style={{ color: "#000" }} />
                      </div>
                      <h3 className="font-display text-base font-bold" style={{ color: "#000" }}>{item.title}</h3>
                      <p className="text-sm" style={{ color: "#515459" }}>{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <Button variant="primary" size="lg" href="/blog">
                    Read Our Latest Stories
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* Subscribe to the Podcast */}
        <section style={{ background: "#f0f1f4", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
          <div className="container-max relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Subscribe</p>

              <TextReveal
                as="h2"
                variant="fade-up"
                className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000" }}
              >
                Subscribe to the Podcast
              </TextReveal>
              <p className="mt-3 max-w-xl mx-auto" style={{ color: "#515459" }}>
                Never miss an episode of Facts &amp; Figures. Subscribe on your preferred platform.
              </p>

              <SectionReveal variant="fade-up" staggerChildren={0.1}>
                <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 max-w-md sm:max-w-lg mx-auto">
                  {podcastPlatforms.map((platform) => (
                    <RevealItem key={platform.name} variant="scale-fade">
                      <a
                        href={platform.href}
                        className={`inline-flex w-full items-center justify-center gap-2.5 px-6 py-3.5 min-h-11 text-sm font-semibold text-white active:scale-[0.98] ${platform.color}`}
                        style={{ borderRadius: 8, transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                      >
                        {platform.name === "RSS Feed" ? (
                          <Rss className="h-4 w-4" />
                        ) : (
                          <Mic className="h-4 w-4" />
                        )}
                        {platform.name}
                      </a>
                    </RevealItem>
                  ))}
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* Be a Guest CTA */}
        <section style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
          <div className="container-max relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Be a Guest</p>

              <TextReveal
                as="h2"
                variant="slide-up"
                className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000" }}
              >
                Appear on Facts & Figures
              </TextReveal>
              <SectionReveal variant="fade-blur" delay={0.1}>
                <p className="mt-4 max-w-xl mx-auto leading-relaxed" style={{ color: "#515459" }}>
                  Pitch a topic or apply to be a guest on Facts &amp; Figures. We feature cybersecurity leaders,
                  policy experts, and civic-tech practitioners from across East Africa.
                </p>

                <div className="mt-10">
                  <Button variant="primary" size="lg" href="/contact">
                    Pitch a Topic
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* Media Kit */}
        <section style={{ background: "#212429", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
          <div className="container-max relative z-10">
            <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
              <SectionReveal variant="clip-left" className="max-w-2xl text-center lg:text-left">
                <TextReveal
                  as="h2"
                  variant="clip-up"
                  className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight"
                >
                  Media kit & resources
                </TextReveal>
                <p className="mt-5 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Access official logos, leadership bios, and division overviews
                  for press coverage and partnership enquiries.
                </p>
                <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Button variant="primary" size="lg">
                    <Download className="h-4 w-4" /> Download Full Kit
                  </Button>
                  <Button variant="outline-dark" size="lg" href="/contact">
                    Request Interview
                  </Button>
                </div>
              </SectionReveal>

              <SectionReveal variant="slide-up" delay={0.2}>
                <div className="w-full max-w-sm border border-white/6 bg-surface-dark-elevated p-7" style={{ borderRadius: 8 }}>
                  <h3 className="font-display text-lg font-bold text-white mb-5">Press Kit Includes</h3>
                  <div className="space-y-5">
                    {[
                      "Official company logo suite (SVG, PNG)",
                      "Leadership bios and headshots",
                      "Division overview one-pagers",
                      "Brand guidelines and colour palette",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 border-b border-white/6 pb-4 last:border-0 last:pb-0">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                        <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>
      </PageTransition>
    </main>
  );
}

