"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Shield,
  Database,
  BookOpen,
  Mic,
  Brain,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const divisions = [
  { label: "Traverse Security", href: "/security", description: "Cybersecurity for banks & government", icon: Shield, tagline: "Protection" },
  { label: "Public Record Africa", href: "/public-record", description: "AI-powered public document platform", icon: Database, tagline: "Transparency" },
  { label: "Digital Literacy", href: "/literacy", description: "Cyber safety training for all", icon: BookOpen, tagline: "Education" },
  { label: "Traverse Media", href: "/media", description: "Facts & Figures Podcast", icon: Mic, tagline: "Storytelling" },
  { label: "Think Tank", href: "/think-tank", description: "Policy research & analysis", icon: Brain, tagline: "Insight" },
];

const navLinks = [
  { label: "Divisions", href: "#divisions" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Mentorship", href: "/accuracy-mentorship" },
  { label: "Meet Christine", href: "/meet-christine" },
];

const ease = [0.215, 0.61, 0.355, 1] as const;

/* GatesNotes glass segment style */
const glassStyle: React.CSSProperties = {
  background: "rgba(0, 0, 0, 0.8)",
  backdropFilter: "blur(40px)",
  WebkitBackdropFilter: "blur(40px)",
  borderRadius: 4,
  transition: "background 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)",
};

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [mobileDivisionsOpen, setMobileDivisionsOpen] = useState(false);
  const pathname = usePathname();
  // URLs end in a slash (trailingSlash export); a section also counts as current on its subpages
  const path = (pathname ?? "/").replace(/(.)\/$/, "$1");
  const isCurrent = (href: string) => path === href || path.startsWith(`${href}/`);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMegaOpen(false);
    setIsMobileOpen(false);
    setMobileDivisionsOpen(false);
  }

  const megaRef = useRef<HTMLDivElement>(null);
  const megaTriggerRef = useRef<HTMLButtonElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // When the pointer opens the menu on hover, the click that usually follows must not close it again
  const hoverOpenedAt = useRef(0);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (megaRef.current && !megaRef.current.contains(e.target as Node) &&
          megaTriggerRef.current && !megaTriggerRef.current.contains(e.target as Node)) {
        setIsMegaOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape" && megaRef.current) {
        setIsMegaOpen(false);
        megaTriggerRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const openMega = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsMegaOpen(true);
  }, []);

  const scheduleMegaClose = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => setIsMegaOpen(false), 250);
  }, []);

  const isDivisionActive = divisions.some((d) => isCurrent(d.href));

  return (
    <>
      {/* ======== GatesNotes Segmented Header ======== */}
      <nav
        className="fixed top-0 inset-x-0 z-100"
        style={{ pointerEvents: "none", paddingTop: 24 }}
      >
        <div
          className="mx-auto flex items-center"
          style={{ maxWidth: 1240, padding: "0 24px" }}
        >
          {/* ── LEFT SEGMENT: Logo button (64x56) ── */}
          <Link
            href="/"
            className="shrink-0 flex items-center justify-center hover:bg-[rgba(0,0,0,0.6)]!"
            style={{ ...glassStyle, width: 64, height: 56, pointerEvents: "auto" }}
          >
            <Image
              src="/traverselogo/icon-white.svg"
              alt="Traverse Minds Africa"
              width={38}
              height={38}
              priority
            />
          </Link>

          {/* 2px gap */}
          <div style={{ width: 2, flexShrink: 0 }} />

          {/* ── CENTER SEGMENT: Nav links ── */}
          <div
            className="hidden lg:flex items-center justify-center flex-1"
            style={{ ...glassStyle, height: 56, pointerEvents: "auto" }}
          >
            {navLinks.map((link) => {
              if (link.href === "#divisions") {
                return (
                  <div
                    key="divisions-trigger"
                    className="relative h-full"
                    onMouseEnter={() => {
                      if (!isMegaOpen) hoverOpenedAt.current = Date.now();
                      openMega();
                    }}
                    onMouseLeave={scheduleMegaClose}
                  >
                    <button
                      ref={megaTriggerRef}
                      onClick={() => {
                        if (Date.now() - hoverOpenedAt.current < 600) return;
                        setIsMegaOpen((p) => !p);
                      }}
                      aria-expanded={isMegaOpen}
                      aria-controls="divisions-menu"
                      className="flex items-center gap-1 h-full cursor-pointer px-6 group focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent"
                      style={{
                        fontSize: 16,
                        fontWeight: 400,
                        letterSpacing: "0.02em",
                        color: isDivisionActive || isMegaOpen ? "#fff" : "#d3d3d3",
                        borderBottom: isDivisionActive || isMegaOpen ? "2px solid #fff" : "2px solid transparent",
                        transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderBottomColor = "#fff"; }}
                      onMouseLeave={(e) => {
                        if (!isDivisionActive && !isMegaOpen) {
                          e.currentTarget.style.color = "#d3d3d3";
                          e.currentTarget.style.borderBottomColor = "transparent";
                        }
                      }}
                    >
                      {link.label}
                      <ChevronDown
                        className="transition-transform duration-300"
                        style={{ height: 14, width: 14, transform: isMegaOpen ? "rotate(180deg)" : "none" }}
                      />
                    </button>
                  </div>
                );
              }

              const isActive = isCurrent(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center h-full px-6"
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    letterSpacing: "0.02em",
                    color: isActive ? "#fff" : "#d3d3d3",
                    borderBottom: isActive ? "2px solid #fff" : "2px solid transparent",
                    transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderBottomColor = "#fff"; }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "#d3d3d3";
                      e.currentTarget.style.borderBottomColor = "transparent";
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* ── MOBILE: Center logo bar ── */}
          <div
            className="lg:hidden flex items-center justify-center flex-1"
            style={{
              ...glassStyle,
              height: 48,
              borderRadius: 0,
              pointerEvents: "auto",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.3px", color: "#fff" }}>
              Traverse<span style={{ color: "#ff4c00" }}>Minds</span> Africa
            </span>
          </div>

          {/* 2px gap */}
          <div style={{ width: 2, flexShrink: 0 }} className="hidden lg:block" />

          {/* ── RIGHT SEGMENT: Search/CTA button (64x56) ── */}
          <Link
            href="/contact"
            className="hidden lg:flex shrink-0 items-center justify-center hover:bg-[rgba(0,0,0,0.6)]!"
            style={{ ...glassStyle, width: 64, height: 56, pointerEvents: "auto" }}
          >
            <Search style={{ height: 20, width: 20, color: "#fff" }} />
          </Link>

          {/* ── MOBILE: Hamburger (right segment) ── */}
          <button
            className="lg:hidden shrink-0 flex items-center justify-center"
            style={{
              ...glassStyle,
              width: 58,
              height: 48,
              borderRadius: "0 4px 4px 0",
              pointerEvents: "auto",
            }}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              {isMobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X style={{ height: 20, width: 20, color: "#fff" }} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu style={{ height: 20, width: 20, color: "#fff" }} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* ======== Desktop Mega-Menu: dark glass to match the nav, magazine index inside ======== */}
        <AnimatePresence>
          {isMegaOpen && (
            <motion.div
              ref={megaRef}
              id="divisions-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease }}
              className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-full max-w-[1240px] px-6"
              style={{ pointerEvents: "auto", paddingTop: 2 }}
              onMouseEnter={openMega}
              onMouseLeave={scheduleMegaClose}
            >
              <div
                className="relative overflow-hidden text-white shadow-2xl"
                style={{ background: "rgba(0, 0, 0, 0.88)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)" }}
              >
                <div className="tech-grid-dark absolute inset-0" aria-hidden />
                <div className="relative grid grid-cols-12">
                  {/* Intro column */}
                  <div className="col-span-4 border-r border-white/10 p-10">
                    <p className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                      <span className="h-2 w-2 bg-accent" aria-hidden />
                      Our divisions
                    </p>
                    <p className="mt-5 font-serif text-[26px] font-semibold leading-[1.2]">
                      One company, working across Africa&apos;s digital frontier.
                    </p>
                    <p className="mt-4 text-[14px] leading-relaxed text-white/60">
                      Security, open records, education, media and research, each feeding the others.
                    </p>
                    <Link
                      href="/about"
                      onClick={() => setIsMegaOpen(false)}
                      className="group mt-8 inline-flex items-center gap-2 text-[14px] font-semibold text-white hover:text-accent"
                    >
                      The Traverse model
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Division index */}
                  <ul className="col-span-8 grid grid-cols-2 gap-px bg-white/10">
                    {divisions.map((div, i) => {
                      const Icon = div.icon;
                      const isActive = isCurrent(div.href);
                      return (
                        <li key={div.href} className={i === divisions.length - 1 && divisions.length % 2 ? "col-span-2" : ""}>
                          <Link
                            href={div.href}
                            onClick={() => setIsMegaOpen(false)}
                            aria-current={isActive ? "page" : undefined}
                            className={`group relative flex h-full items-start gap-4 px-7 py-6 transition-colors hover:bg-[#151618] focus-visible:bg-[#151618] focus-visible:outline-none ${isActive ? "bg-[#151618]" : "bg-[#0b0b0c]"}`}
                          >
                            <span className={`absolute inset-y-0 left-0 w-[3px] origin-top bg-accent transition-transform duration-300 ${isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100"}`} aria-hidden />
                            <span className="pt-1 font-mono text-[12px] text-white/35">{String(i + 1).padStart(2, "0")}</span>
                            <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${isActive ? "text-accent" : "text-white/60 group-hover:text-accent"}`} aria-hidden />
                            <span className="min-w-0 grow">
                              <span className="flex items-center justify-between gap-3">
                                <span className="font-serif text-[19px] font-semibold leading-tight">{div.label}</span>
                                <ArrowRight className="h-4 w-4 shrink-0 -translate-x-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden />
                              </span>
                              <span className="mt-1.5 block text-[14px] leading-snug text-white/55">{div.description}</span>
                              <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">{div.tagline}</span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Footer strip */}
                <div className="relative flex items-center justify-between border-t border-white/10 px-10 py-4">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-white/40">Kampala · Supporting Africa&apos;s digital transformation since 2024</span>
                  <div className="flex items-center gap-7">
                    <Link href="/careers" onClick={() => setIsMegaOpen(false)} className="font-mono text-[11px] uppercase tracking-wider text-white/60 hover:text-white">Careers</Link>
                    <Link href="/privacy" onClick={() => setIsMegaOpen(false)} className="font-mono text-[11px] uppercase tracking-wider text-white/60 hover:text-white">Legal</Link>
                    <Link href="/contact" onClick={() => setIsMegaOpen(false)} className="inline-flex items-center gap-2 bg-accent px-4 py-2 text-[12px] font-bold uppercase tracking-wider text-white hover:bg-accent-hover">
                      Launch inquiry <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ======== Fullscreen Mobile Menu ======== */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="fixed inset-0 z-90 overflow-y-auto"
            style={{
              background: "#ffffff",
              paddingTop: 80,
            }}
          >
            <div className="px-6 pb-20">
              <nav className="flex flex-col">
                {navLinks.map((link) => {
                  if (link.label === "Divisions") {
                    return (
                      <div key="mobile-divisions" className="border-b border-gn-700/50">
                        <button
                          onClick={() => setMobileDivisionsOpen(!mobileDivisionsOpen)}
                          aria-expanded={mobileDivisionsOpen}
                          className="w-full flex items-center justify-between py-6 text-2xl font-medium tracking-tight"
                        >
                          {link.label}
                          <ChevronDown 
                            className="transition-transform duration-300"
                            style={{ transform: mobileDivisionsOpen ? "rotate(180deg)" : "none" }}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileDivisionsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <ul className="mb-6 border-t-2 border-black">
                                {divisions.map((div, i) => {
                                  const isActive = isCurrent(div.href);
                                  return (
                                    <li key={div.href} className="border-b border-black/10">
                                      <Link
                                        href={div.href}
                                        onClick={() => setIsMobileOpen(false)}
                                        aria-current={isActive ? "page" : undefined}
                                        className={`flex items-start gap-3 border-l-[3px] py-4 pl-3 ${isActive ? "border-accent" : "border-transparent"}`}
                                      >
                                        <span className="pt-0.5 font-mono text-[12px] text-gn-500">{String(i + 1).padStart(2, "0")}</span>
                                        <span className="min-w-0 grow">
                                          <span className={`block font-serif text-[18px] font-semibold leading-tight ${isActive ? "text-accent" : "text-black"}`}>{div.label}</span>
                                          <span className="mt-1 block text-[14px] leading-snug text-gn-400">{div.description}</span>
                                        </span>
                                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-gn-500" aria-hidden />
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  const isActive = isCurrent(link.href);
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="block py-6 text-2xl font-medium tracking-tight border-b border-gn-700/50"
                      style={{ color: isActive ? "#ff4c00" : "#000" }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              
              <div className="mt-12 space-y-8">
                <div>
                  <p className="eyebrow-muted mb-4">Get in touch</p>
                  <a href="mailto:traversemindsug@gmail.com" className="text-lg font-medium text-gn-100">traversemindsug@gmail.com</a>
                </div>
                <div className="flex gap-4">
                  {/* Social links could go here */}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
