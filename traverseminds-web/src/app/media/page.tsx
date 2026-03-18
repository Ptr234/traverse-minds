import type { Metadata } from "next";
import Image from "next/image";
import { Hero as MediaHero } from "@/components/media/Hero";
import { Button } from "@/components/ui/Button";
import { Newspaper, MessageSquare, Download, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Traverse Media & Facts & Figures Podcast | Traverse Minds",
  description: "Facts & Figures — East Africa's civic-tech podcast. Data journalism, policy explainers, and independent reporting driven by evidence.",
};

export default function MediaPage() {
  return (
    <main className="flex flex-col">
      <MediaHero />

      {/* Media Philosophy */}
      <section className="relative bg-white section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid-light opacity-30 pointer-events-none" />

        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="order-2 lg:order-1">
              <div className="relative aspect-4/5 overflow-hidden rounded-3xl shadow-elevated">
                <Image
                  src="https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80"
                  alt="Newsroom and digital media"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-6">
                <div className="h-1 w-1 rounded-full bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">Our Mission</span>
              </div>

              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-[1.1]">
                The <span className="text-gradient-accent">Facts &amp; Figures</span> Podcast
              </h2>

              <p className="mt-6 text-base text-brand-medium/60 leading-relaxed">
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
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/5 text-primary transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-base font-bold text-primary">{item.title}</h3>
                    <p className="text-sm text-brand-medium/50">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Button variant="primary" size="lg" href="/blog">
                  Read Our Latest Stories
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="relative bg-primary section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-accent/5 blur-[120px]" />

        <div className="container-max relative z-10">
          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
                Media <span className="text-gradient-accent">kit & resources</span>
              </h2>
              <p className="mt-5 text-base text-white/35 leading-relaxed">
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
            </div>

            <div className="w-full max-w-sm rounded-2xl border border-white/6 bg-surface-dark-elevated p-7">
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
                    <p className="text-sm text-white/50">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
