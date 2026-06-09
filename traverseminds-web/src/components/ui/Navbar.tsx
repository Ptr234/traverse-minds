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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openMega = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsMegaOpen(true);
  }, []);

  const scheduleMegaClose = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => setIsMegaOpen(false), 250);
  }, []);

  const isDivisionActive = divisions.some((d) => pathname === d.href);

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
            className="hidden md:flex items-center justify-center flex-1"
            style={{ ...glassStyle, height: 56, pointerEvents: "auto" }}
          >
            {navLinks.map((link) => {
              if (link.href === "#divisions") {
                return (
                  <div
                    key="divisions-trigger"
                    className="relative h-full"
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleMegaClose}
                  >
                    <button
                      ref={megaTriggerRef}
                      onClick={() => setIsMegaOpen((p) => !p)}
                      className="flex items-center gap-1 h-full cursor-pointer px-6 group"
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

              const isActive = pathname === link.href;
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
            className="md:hidden flex items-center justify-center flex-1"
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
          <div style={{ width: 2, flexShrink: 0 }} className="hidden md:block" />

          {/* ── RIGHT SEGMENT: Search/CTA button (64x56) ── */}
          <Link
            href="/contact"
            className="hidden md:flex shrink-0 items-center justify-center hover:bg-[rgba(0,0,0,0.6)]!"
            style={{ ...glassStyle, width: 64, height: 56, pointerEvents: "auto" }}
          >
            <Search style={{ height: 20, width: 20, color: "#fff" }} />
          </Link>

          {/* ── MOBILE: Hamburger (right segment) ── */}
          <button
            className="md:hidden shrink-0 flex items-center justify-center"
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

        {/* ======== Desktop Mega-Menu (Enhanced) ======== */}
        <AnimatePresence>
          {isMegaOpen && (
            <motion.div
              ref={megaRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease }}
              className="hidden md:block"
              style={{
                pointerEvents: "auto",
                background: "#ffffff",
                borderBottom: "1px solid #d1d4d9",
                boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                marginTop: 8,
              }}
              onMouseEnter={openMega}
              onMouseLeave={scheduleMegaClose}
            >
              <div className="container-max grid grid-cols-12 gap-12 py-16">
                {/* Left Sidebar Info */}
                <div className="col-span-3 border-r border-gn-700/50 pr-8">
                  <p className="eyebrow-muted mb-6">Our Ecosystem</p>
                  <h3 className="text-2xl font-medium leading-tight mb-4 tracking-tight">
                    Integrated solutions for a <span className="text-accent">digital-first</span> Africa.
                  </h3>
                  <p className="text-gn-400 text-sm leading-relaxed mb-8">
                    Six specialized divisions working in synergy to secure, inform, and empower the African region.
                  </p>
                  <Link 
                    href="/about" 
                    onClick={() => setIsMegaOpen(false)}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-gn-100 hover:text-accent transition-colors"
                  >
                    The Traverse Model
                    <div className="w-5 h-px bg-gn-100 group-hover:bg-accent group-hover:w-8 transition-all duration-300" />
                  </Link>
                </div>

                {/* Main Divisions Grid */}
                <div className="col-span-9 grid grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                  {divisions.map((div) => {
                    const Icon = div.icon;
                    const isActive = pathname === div.href;
                    return (
                      <Link
                        key={div.href}
                        href={div.href}
                        onClick={() => setIsMegaOpen(false)}
                        className="group flex flex-col items-start"
                      >
                        <div className="mb-4 flex items-center justify-center w-10 h-10 rounded-lg bg-gn-900 group-hover:bg-accent-muted transition-colors duration-300">
                          <Icon 
                            className="transition-all duration-300 group-hover:scale-110" 
                            style={{ 
                              height: 20, 
                              width: 20, 
                              color: isActive ? "#ff4c00" : "#515459",
                              opacity: isActive ? 1 : 0.8
                            }} 
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold tracking-tight text-gn-100 group-hover:text-accent transition-colors">
                              {div.label}
                            </span>
                          </div>
                          <span className="block text-sm text-gn-500 leading-snug group-hover:text-gn-400 transition-colors">
                            {div.description}
                          </span>
                          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-gn-600 mt-2 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                            {div.tagline} &rarr;
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
              
              {/* Bottom Strip */}
              <div className="bg-gn-900/50 border-t border-gn-700/30 py-4">
                <div className="container-max flex items-center justify-between">
                  <span className="text-xs text-gn-500 font-medium italic">
                    Supporting Africa digital transformation since 2024.
                  </span>
                  <div className="flex gap-6">
                    <Link href="/careers" className="text-xs font-bold uppercase tracking-wider text-gn-400 hover:text-gn-100 transition-colors">Careers</Link>
                    <Link href="/contact" className="text-xs font-bold uppercase tracking-wider text-gn-400 hover:text-gn-100 transition-colors">Consultancy</Link>
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
                              className="overflow-hidden bg-gn-900/30 rounded-lg mb-4"
                            >
                              <div className="p-4 grid gap-6">
                                {divisions.map((div) => (
                                  <Link
                                    key={div.href}
                                    href={div.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className="flex items-center gap-4"
                                  >
                                    <div className="w-8 h-8 rounded bg-white flex items-center justify-center shadow-sm">
                                      <div.icon size={16} className="text-gn-400" />
                                    </div>
                                    <div>
                                      <p className="font-bold text-sm text-gn-100">{div.label}</p>
                                      <p className="text-xs text-gn-500">{div.tagline}</p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  const isActive = pathname === link.href;
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
