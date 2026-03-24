"use client";

import Link from "next/link";
import { Linkedin, Twitter, Music, Rss } from "lucide-react";

const sectionLinks = [
  { label: "Divisions", href: "/security" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact Us", href: "/contact" },
];

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/traverseminds" },
  { icon: Twitter, label: "X / Twitter", href: "https://x.com/traverseminds" },
  { icon: Music, label: "Spotify", href: "#" },
  { icon: Rss, label: "RSS", href: "/blog/rss.xml" },
];

export function Footer() {
  return (
    <div style={{ background: "#f5f5f7", paddingBottom: 120 }}>
      {/* Card edge top — paper stack effect */}
      <div className="card-edge-top" />

      <footer
        style={{
          background: "#212429",
          color: "hsla(0,0%,100%,0.8)",
          paddingTop: 96,
          paddingBottom: 40,
          borderRadius: "0 0 16px 16px",
          boxShadow: "0 2.5px 2px rgba(0,0,0,0.06), 0 1px 0 rgba(0,0,0,0.05), 0 2px 2px rgba(0,0,0,0.15), 0 4px 6px rgba(0,0,0,0.1)",
          backdropFilter: "blur(60px)",
        }}
      >
        {/* Top — Large section links + social */}
        <div className="mx-auto flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12" style={{ maxWidth: 1240, padding: "0 24px" }}>
          {/* Section Links — GatesNotes: 40px, weight 500 */}
          <div className="flex flex-wrap gap-8">
            {sectionLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-white hover:text-accent transition-colors duration-350"
                style={{
                  fontSize: 40,
                  fontWeight: 500,
                  lineHeight: "125%",
                  letterSpacing: "-0.8px",
                  transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-white/80 hover:text-accent transition-colors duration-350"
                style={{ transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" }}
              >
                <span className="sr-only">{s.label}</span>
                <s.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom — Legal links + copyright */}
        <div
          className="mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-20"
          style={{ maxWidth: 1240, padding: "0 24px" }}
        >
          <div className="flex flex-wrap gap-10">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[#919499] hover:text-white transition-colors duration-350"
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: "125%",
                  letterSpacing: "0.07px",
                  transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <p style={{ fontSize: 14, color: "#919499" }}>
            &copy; {new Date().getFullYear()} Traverse Minds UG
          </p>
        </div>
      </footer>

      {/* Brand Signature Area — like GatesNotes signature SVG section */}
      <div className="text-center" style={{ paddingTop: 80 }}>
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm" style={{ background: "#212429" }}>
            <span className="text-xs font-black tracking-tighter text-white">TM</span>
          </div>
        </div>
        <p style={{ fontSize: 14, color: "#919499", letterSpacing: "0.6px", textTransform: "uppercase" as const, fontWeight: 700 }}>
          Built for Africa. Driven by Evidence.
        </p>
      </div>
    </div>
  );
}
