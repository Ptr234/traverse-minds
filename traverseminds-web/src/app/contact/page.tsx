import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { WhatsAppButton } from "@/components/contact/WhatsAppButton";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { Mail, MapPin, Clock } from "lucide-react";

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
            <p className="mt-6 max-w-lg text-lg text-white/50 leading-relaxed">
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

              {[
                { icon: Mail, title: "Email", detail: "hello@traverseminds.ug", sub: "For formal enquiries and proposals" },
                { icon: MapPin, title: "Location", detail: "Kampala, Uganda", sub: "Serving all 5 EAC countries" },
                { icon: Clock, title: "Response Time", detail: "Within 1 business day", sub: "Urgent? Use WhatsApp" },
              ].map((item) => (
                <div key={item.title} className="group rounded-2xl border border-border-light bg-white p-5 transition-all duration-300 hover:shadow-card hover:-translate-y-0.5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <item.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">{item.title}</h3>
                      <p className="mt-0.5 text-sm text-brand-medium/60">{item.detail}</p>
                      <p className="mt-1 text-xs text-brand-muted">{item.sub}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
