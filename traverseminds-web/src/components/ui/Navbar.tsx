"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
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
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const divisions = [
  { label: "Traverse Security", href: "/security", description: "Cybersecurity for banks & government", icon: Shield },
  { label: "Public Record EA", href: "/public-record", description: "AI-powered public document platform", icon: Database },
  { label: "Digital Literacy", href: "/literacy", description: "Cyber safety training for all", icon: BookOpen },
  { label: "Traverse Media", href: "/media", description: "Facts & Figures Podcast", icon: Mic },
  { label: "Think Tank", href: "/think-tank", description: "Policy research & analysis", icon: Brain },
];

const navLinks = [
  { label: "Divisions", href: "#divisions" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
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
  const pathname = usePathname();
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

  useEffect(() => {
    setIsMegaOpen(false);
    setIsMobileOpen(false);
  }, [pathname]);

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
            className="shrink-0 flex items-center justify-center hover:!bg-[rgba(0,0,0,0.6)]"
            style={{ ...glassStyle, width: 64, height: 56, pointerEvents: "auto" }}
          >
            {/* Stacked logo like GatesNotes LogoStack.svg */}
            <div className="flex flex-col items-center leading-none">
              <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: "-0.5px", color: "#fff" }}>TM</span>
            </div>
          </Link>

          {/* 2px gap */}
          <div style={{ width: 2, flexShrink: 0 }} />

          {/* ── CENTER SEGMENT: Nav links ── */}
          <div
            className="hidden md:flex items-center flex-1"
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
                      className="flex items-center gap-1 h-full cursor-pointer"
                      style={{
                        padding: "0 24px",
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
                        className="transition-transform duration-200"
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
                  className="flex items-center h-full"
                  style={{
                    padding: "0 24px",
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
              Traverse<span style={{ color: "#ff4c00" }}>Minds</span>
            </span>
          </div>

          {/* 2px gap */}
          <div style={{ width: 2, flexShrink: 0 }} className="hidden md:block" />

          {/* ── RIGHT SEGMENT: Search/CTA button (64x56) ── */}
          <Link
            href="/contact"
            className="hidden md:flex shrink-0 items-center justify-center hover:!bg-[rgba(0,0,0,0.6)]"
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

        {/* ======== Desktop Mega-Menu (Expanded) ======== */}
        <AnimatePresence>
          {isMegaOpen && (
            <motion.div
              ref={megaRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
              className="hidden md:block"
              style={{
                pointerEvents: "auto",
                background: "rgba(225, 228, 233, 0.96)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                borderBottom: "1px solid #d1d4d9",
                boxShadow: "0 2px 4px rgba(0,0,0,0.16)",
                marginTop: 8,
              }}
              onMouseEnter={openMega}
              onMouseLeave={scheduleMegaClose}
            >
              <div style={{ maxWidth: 1240, margin: "0 auto", padding: "48px 24px 64px" }}>
                <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.6px", color: "#515459", marginBottom: 24 }}>
                  Our Divisions
                </p>
                {/* GatesNotes divider line */}
                <div style={{ width: 80, height: 1, background: "rgba(81,84,89,0.64)", marginBottom: 35 }} />
                <div className="grid grid-cols-2 lg:grid-cols-3" style={{ gap: "16px 48px" }}>
                  {divisions.map((div) => {
                    const Icon = div.icon;
                    const isActive = pathname === div.href;
                    return (
                      <Link
                        key={div.href}
                        href={div.href}
                        className="group flex items-start gap-4"
                        style={{
                          padding: "12px 0",
                          fontSize: 24,
                          fontWeight: 500,
                          letterSpacing: "-0.24px",
                          color: isActive ? "#ff4c00" : "#000",
                          transition: "color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "#ff4c00"; }}
                        onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "#000"; }}
                      >
                        <Icon style={{ height: 20, width: 20, marginTop: 6, opacity: 0.4, flexShrink: 0 }} />
                        <div>
                          <span className="block">{div.label}</span>
                          <span className="block" style={{ fontSize: 14, fontWeight: 400, color: "#919499", letterSpacing: "0", marginTop: 2 }}>
                            {div.description}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
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
            className="fixed inset-0 z-90"
            style={{
              background: "rgba(225, 228, 233, 0.96)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <div style={{ maxWidth: 1240, margin: "0 auto", padding: "96px 24px 40px", height: "100%", display: "flex", flexDirection: "column" as const }}>
              <nav style={{ flex: 1, paddingTop: 32 }}>
                {["Divisions", "Events", "Blog", "About", "Contact"].map((label) => {
                  const href = label === "Divisions" ? "/security" : `/${label.toLowerCase()}`;
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setIsMobileOpen(false)}
                      className="block"
                      style={{
                        padding: "20px 0",
                        fontSize: 24,
                        fontWeight: 500,
                        letterSpacing: "-0.24px",
                        color: isActive ? "#ff4c00" : "#000",
                        borderBottom: "1px solid #d1d4d9",
                        transition: "color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#ff4c00"; }}
                      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "#000"; }}
                    >
                      {label}
                    </Link>
                  );
                })}
              </nav>
              <p style={{ fontSize: 14, color: "#919499" }}>hello@traverseminds.ug</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
