import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact/ContactForm";
import { WhatsAppButton } from "@/components/contact/WhatsAppButton";
import { Particles } from "@/components/ui/Particles";
import { Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Traverse Minds UG. Cybersecurity services, events, research partnerships. Based in Kampala, Uganda.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero with bg image */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-light-surface/60 via-transparent to-light-surface/80" />
        </div>
        <Particles />
        <div className="relative mx-auto flex min-h-[60vh] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl py-20 lg:py-28">
            <div className="hero-bar" />
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber">Contact</p>
            <h1 className="font-display text-4xl uppercase leading-[1.1] tracking-tight text-brand-charcoal md:text-5xl lg:text-6xl">
              Get in<br /><span className="text-brand-amber">touch</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-brand-medium">
              Whether you need a security assessment, want to attend an event, or have a research partnership in mind.
            </p>
          </div>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="bg-light-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-light-border bg-light-card p-6 sm:p-8 md:p-10">
                <h2 className="font-display text-2xl text-brand-green">Send Us a Message</h2>
                <p className="mt-2 text-brand-medium">Fill out the form and we&apos;ll respond within 1 business day.</p>
                <div className="mt-8"><ContactForm /></div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="card-hover group overflow-hidden rounded-2xl border border-light-border bg-light-card">
                <div className="relative h-32">
                  <Image src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&q=60" alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg text-brand-charcoal">Prefer WhatsApp?</h3>
                  <p className="mt-2 text-sm text-brand-medium">The fastest way to reach us in East Africa.</p>
                  <div className="mt-4"><WhatsAppButton /></div>
                </div>
              </div>
              {[
                { icon: Mail, title: "Email", detail: "hello@traverseminds.ug", sub: "For formal enquiries and proposals" },
                { icon: MapPin, title: "Location", detail: "Kampala, Uganda", sub: "Serving all 5 EAC countries" },
                { icon: Clock, title: "Response Time", detail: "Within 1 business day", sub: "Urgent? Use WhatsApp" },
              ].map((item) => (
                <div key={item.title} className="card-hover group rounded-xl border border-light-border bg-light-card p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-teal/10">
                      <item.icon className="h-5 w-5 text-brand-teal" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-charcoal">{item.title}</h3>
                      <p className="mt-0.5 text-sm text-brand-medium">{item.detail}</p>
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
