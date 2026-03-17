import Link from "next/link";
import { MapPin, Mail } from "lucide-react";

const footerLinks = {
  company: [
    { label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" }, { label: "Privacy Policy", href: "/privacy" },
  ],
  divisions: [
    { label: "Traverse Security", href: "/security" }, { label: "Public Record EA", href: "/public-record" },
    { label: "Events", href: "/events" }, { label: "Digital Literacy", href: "/literacy" },
    { label: "Traverse Media", href: "/media" }, { label: "Think Tank", href: "/think-tank" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-light-border bg-brand-green text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-display text-2xl">Traverse <span className="text-brand-amber">Minds</span></h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Uganda&apos;s integrated civic-tech company. Cybersecurity, public records, digital literacy, events, media, and policy research for East Africa.
            </p>
            <div className="mt-4 flex gap-4">
              {["LinkedIn", "Twitter", "WhatsApp"].map((s) => (
                <a key={s} href="#" className="text-xs text-white/50 transition-colors hover:text-brand-amber">{s}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">Company</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-white/70 transition-colors hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">Our Services</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.divisions.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-white/70 transition-colors hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">Contact Us</h4>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-amber" /><span className="text-sm text-white/70">Kampala, Uganda</span></li>
              <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-amber" /><span className="text-sm text-white/70">hello@traverseminds.ug</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-white/40">&copy; {new Date().getFullYear()} Traverse Minds UG. All rights reserved.</p>
          <p className="text-xs text-white/40">Data protection in accordance with Uganda PDPA 2019</p>
        </div>
      </div>
    </footer>
  );
}
