import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { WhatsAppButton } from "@/components/contact/WhatsAppButton";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { Mail, MapPin, Clock, Newspaper } from "lucide-react";
import { EACMap } from "@/components/ui/EACMap";

const contactHeroImages = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80",
  "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1800&q=80",
  "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1800&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80",
];

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Traverse Minds UG. Cybersecurity services, events, research partnerships. Based in Kampala, Uganda.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-44 lg:pb-36">
        <ImageSlideshow images={contactHeroImages} overlay="bg-primary/70" />

        <div className="container-max relative z-10 px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-4 py-1.5 backdrop-blur-md mb-8">
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/55">Contact</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05]">
              Get in <span className="text-gradient-accent">touch</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/65 leading-relaxed">
              Whether you need a security assessment, want to attend an event, or have a research partnership in mind.
            </p>
          </div>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="relative bg-surface-elevated section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid-light opacity-40 pointer-events-none" />

        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-3xl border border-border-light bg-white p-8 md:p-10 shadow-card">
                <h2 className="font-display text-2xl font-bold text-primary tracking-tight">
                  Send Us a Message
                </h2>
                <p className="mt-2 text-brand-medium/60">
                  Fill out the form and we&apos;ll respond within 1 business day.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {/* WhatsApp Card */}
              <div className="group overflow-hidden rounded-2xl border border-border-light bg-white transition-all duration-300 hover:shadow-card">
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-primary">Prefer WhatsApp?</h3>
                  <p className="mt-2 text-sm text-brand-medium/60">
                    The fastest way to reach us in East Africa.
                  </p>
                  <div className="mt-4">
                    <WhatsAppButton />
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="group rounded-2xl border border-border-light bg-white p-5 transition-all duration-200 hover:shadow-card hover:-translate-y-0.5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Email</h3>
                    <a
                      href="mailto:hello@traverseminds.ug"
                      className="mt-0.5 block text-sm text-accent font-medium underline underline-offset-2 hover:text-accent-hover transition-colors"
                    >
                      hello@traverseminds.ug
                    </a>
                    <p className="mt-1 text-xs text-brand-muted">For formal enquiries and proposals</p>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="group rounded-2xl border border-border-light bg-white p-5 transition-all duration-200 hover:shadow-card hover:-translate-y-0.5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Location</h3>
                    <p className="mt-0.5 text-sm text-brand-medium/70 font-medium">Kampala, Uganda</p>
                    <p className="mt-1 text-xs text-brand-muted">Serving all 5 EAC countries</p>
                  </div>
                </div>
              </div>

              {/* Response Time Card */}
              <div className="group rounded-2xl border border-border-light bg-white p-5 transition-all duration-200 hover:shadow-card hover:-translate-y-0.5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald/10">
                    <Clock className="h-5 w-5 text-emerald" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Response Time</h3>
                    <p className="mt-0.5 text-sm text-emerald font-medium">Within 1 business day</p>
                    <p className="mt-1 text-xs text-brand-muted">Urgent? Use WhatsApp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EAC Coverage Map */}
      <section className="relative bg-white section-padding overflow-hidden border-t border-border-light">
        <div className="container-max">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">Coverage</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Serving the East African Community
            </h2>
            <p className="mt-3 text-brand-medium/60 max-w-lg mx-auto">
              Headquartered in Kampala, operating across all five EAC member states.
            </p>
          </div>
          <EACMap />
        </div>
      </section>

      {/* Press & Media Enquiries */}
      <section className="relative bg-surface-elevated section-padding overflow-hidden border-t border-border-light">
        <div className="absolute inset-0 dot-grid-light opacity-30 pointer-events-none" />

        <div className="container-max relative z-10">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-3xl border border-border-light bg-white p-8 md:p-12 shadow-card text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-6">
                <div className="h-1 w-1 rounded-full bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">Press</span>
              </div>

              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight">
                Press & Media Enquiries
              </h2>

              <div className="mt-6 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                  <Newspaper className="h-7 w-7 text-accent" />
                </div>
              </div>

              <p className="mt-5 text-base text-brand-medium/60 leading-relaxed max-w-lg mx-auto">
                For press enquiries, interview requests, or expert commentary:
              </p>

              <div className="mt-6">
                <a
                  href="mailto:press@traverseminds.ug"
                  className="inline-flex items-center gap-2 rounded-xl border border-accent/20 bg-accent/5 px-6 py-3.5 text-base font-semibold text-accent transition-all duration-200 hover:bg-accent/10 hover:border-accent/30 hover:shadow-sm"
                >
                  <Mail className="h-4 w-4" />
                  press@traverseminds.ug
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
