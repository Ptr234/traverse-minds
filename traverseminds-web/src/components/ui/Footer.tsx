"use client";

import Link from "next/link";
import { MapPin, Mail, ArrowUpRight, ShieldCheck, Linkedin, Twitter, MessageSquare, Music, Rss, Send } from "lucide-react";
import { motion } from "framer-motion";

const footerLinks = {
  company: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  divisions: [
    { label: "Cybersecurity", href: "/security" },
    { label: "Public Record EA", href: "/public-record" },
    { label: "Events", href: "/events" },
    { label: "Digital Literacy", href: "/literacy" },
    { label: "Media Division", href: "/media" },
    { label: "Think Tank", href: "/think-tank" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/traverseminds" },
  { icon: Twitter, label: "X / Twitter", href: "https://x.com/traverseminds" },
  { icon: MessageSquare, label: "WhatsApp", href: "https://wa.me/256700000000" },
  { icon: Music, label: "Spotify", href: "#" },
  { icon: Rss, label: "RSS", href: "/blog/rss.xml" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary text-white">
      {/* Background layers */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-125 w-125 -translate-x-1/2 translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />
      <div className="absolute top-0 right-0 h-100 w-100 translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald/5 blur-[120px]" />

      <div className="relative">
        {/* Newsletter Banner */}
        <div className="border-b border-white/6">
          <div className="container-max section-padding-sm">
            <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-lg">
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-display text-3xl font-bold tracking-tight md:text-4xl"
                >
                  Stay ahead of the
                  <span className="text-gradient-accent"> threat landscape</span>.
                </motion.h2>
                <p className="mt-3 text-white/55 text-base leading-relaxed">
                  Weekly intelligence on East African cybersecurity, policy trends, and exclusive event invitations.
                </p>
              </div>

              <form className="relative w-full max-w-md">
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your professional email"
                  className="h-12 w-full rounded-2xl border border-white/8 bg-white/4 pl-6 pr-14 text-base text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:border-accent/40 focus:bg-white/6 focus:ring-1 focus:ring-accent/20"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25 active:scale-95"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/6 transition-colors group-hover:bg-accent/20">
                  <span className="text-sm font-black tracking-tighter text-white">TM</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  Traverse<span className="text-accent">Minds</span>
                </span>
              </Link>
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/50">
                Uganda&apos;s integrated civic-tech company. Cybersecurity,
                public records, events, digital literacy, media, and policy
                research for East Africa.
              </p>
              <div className="mt-8 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/6 bg-white/3 text-white/50 transition-all duration-300 hover:border-accent/30 hover:bg-accent/10 hover:text-accent hover:scale-105"
                  >
                    <span className="sr-only">{s.label}</span>
                    <s.icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
              {[
                { title: "Ecosystem", links: footerLinks.company },
                { title: "Divisions", links: footerLinks.divisions },
              ].map((group) => (
                <div key={group.title}>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent/80 mb-6">
                    {group.title}
                  </h3>
                  <ul className="space-y-1">
                    {group.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="group/link inline-flex min-h-11 items-center gap-1.5 py-2 text-[14px] text-white/50 transition-colors duration-300 hover:text-white"
                        >
                          {l.label}
                          <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-y-0" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Contact Column */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent/80 mb-6">
                  Reach Out
                </h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/4 text-accent/70">
                      <MapPin className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <span className="text-sm text-white/50 leading-snug">
                        Kampala,<br />Uganda
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/4 text-accent/70">
                      <Mail className="h-3.5 w-3.5" />
                    </div>
                    <a
                      href="mailto:hello@traverseminds.ug"
                      className="text-sm text-white/50 hover:text-white transition-colors mt-1.5"
                    >
                      hello@traverseminds.ug
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/6">
          <div className="container-max flex flex-col items-center justify-between gap-5 px-6 py-6 md:flex-row">
            <p className="text-xs text-white/20">
              &copy; {new Date().getFullYear()} Traverse Minds UG. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {footerLinks.legal.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex min-h-11 items-center px-1 text-xs text-white/20 hover:text-accent transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/5 px-4 py-1.5 text-xs text-emerald/70 backdrop-blur-sm">
              <ShieldCheck className="h-3 w-3" />
              <span className="font-medium">PDPA Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
