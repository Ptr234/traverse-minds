"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ArrowUpRight,
  ChevronRight,
  ChevronDown,
  Shield,
  Database,
  BookOpen,
  Mic,
  Brain,
} from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const divisions = [
  {
    label: "Traverse Security",
    href: "/security",
    description: "Cybersecurity for banks & government",
    icon: Shield,
  },
  {
    label: "Public Record EA",
    href: "/public-record",
    description: "AI-powered public document platform",
    icon: Database,
  },
  {
    label: "Digital Literacy",
    href: "/literacy",
    description: "Cyber safety training for all",
    icon: BookOpen,
  },
  {
    label: "Traverse Media",
    href: "/media",
    description: "Facts & Figures Podcast",
    icon: Mic,
  },
  {
    label: "Think Tank",
    href: "/think-tank",
    description: "Policy research & analysis",
    icon: Brain,
  },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Divisions", href: "#divisions" }, // triggers mega-menu
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* ------------------------------------------------------------------ */
/*  Mobile links: flat list for drawer (divisions grouped separately)  */
/* ------------------------------------------------------------------ */

const mobileMainLinks = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [mobileDivisionsOpen, setMobileDivisionsOpen] = useState(false);
  const pathname = usePathname();
  const megaRef = useRef<HTMLDivElement>(null);
  const megaTriggerRef = useRef<HTMLButtonElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---- scroll detection ---- */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---- lock body scroll for mobile menu ---- */
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  /* ---- close mega-menu on outside click ---- */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        megaRef.current &&
        !megaRef.current.contains(e.target as Node) &&
        megaTriggerRef.current &&
        !megaTriggerRef.current.contains(e.target as Node)
      ) {
        setIsMegaOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---- close mega-menu on route change ---- */
  useEffect(() => {
    setIsMegaOpen(false);
    setIsMobileOpen(false);
  }, [pathname]);

  /* ---- hover helpers for mega-menu (desktop) ---- */
  const openMega = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsMegaOpen(true);
  }, []);

  const scheduleMegaClose = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => setIsMegaOpen(false), 250);
  }, []);

  /* ---- helpers ---- */
  const isDivisionActive = divisions.some((d) => pathname === d.href);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className={cn(
          "fixed top-0 inset-x-0 z-100 transition-all duration-500",
          isScrolled ? "py-3" : "py-5"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "relative flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500",
              isScrolled
                ? "glass-panel shadow-lg"
                : "glass-panel shadow-sm"
            )}
          >
            {/* Logo */}
            <Link href="/" className="relative z-110 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white transition-all duration-500">
                <span className="text-sm font-black tracking-tighter">TM</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-primary transition-colors duration-500">
                Traverse<span className="text-accent">Minds</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => {
                /* --- Divisions trigger (mega-menu) --- */
                if (link.href === "#divisions") {
                  return (
                    <div
                      key="divisions-trigger"
                      className="relative"
                      onMouseEnter={openMega}
                      onMouseLeave={scheduleMegaClose}
                    >
                      <button
                        ref={megaTriggerRef}
                        onClick={() => setIsMegaOpen((p) => !p)}
                        className={cn(
                          "relative flex items-center gap-1 px-4 py-2 text-[13px] font-medium transition-all duration-300 rounded-lg cursor-pointer",
                          isDivisionActive || isMegaOpen
                            ? "text-accent"
                            : "text-primary/60 hover:text-primary hover:bg-primary/5"
                        )}
                      >
                        {link.label}
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-transform duration-300",
                            isMegaOpen && "rotate-180"
                          )}
                        />
                        {isDivisionActive && !isMegaOpen && (
                          <motion.div
                            layoutId="nav-indicator"
                            className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-accent"
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                      </button>
                    </div>
                  );
                }

                /* --- Normal link --- */
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-[13px] font-medium transition-all duration-300 rounded-lg",
                      isActive
                        ? "text-accent"
                        : "text-primary/60 hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-accent"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden items-center gap-3 md:flex">
              <Button
                variant="primary"
                size="sm"
                href="/contact"
                className="shadow-none"
              >
                Get Started
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="relative z-110 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary transition-all duration-300 md:hidden"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {isMobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ======== Desktop Mega-Menu Dropdown ======== */}
        <AnimatePresence>
          {isMegaOpen && (
            <motion.div
              ref={megaRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:block"
              onMouseEnter={openMega}
              onMouseLeave={scheduleMegaClose}
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-2">
                <div className="glass-panel rounded-2xl shadow-xl border border-border-light/40 p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent/80 mb-4">
                    Our Divisions
                  </p>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                    {divisions.map((div) => {
                      const Icon = div.icon;
                      const isActive = pathname === div.href;
                      return (
                        <Link
                          key={div.href}
                          href={div.href}
                          className={cn(
                            "group/mega flex items-start gap-4 rounded-xl p-4 transition-all duration-300",
                            isActive
                              ? "bg-accent/10 text-accent"
                              : "hover:bg-primary/5"
                          )}
                        >
                          <div
                            className={cn(
                              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                              isActive
                                ? "bg-accent/20 text-accent"
                                : "bg-primary/5 text-primary/60 group-hover/mega:bg-accent/10 group-hover/mega:text-accent"
                            )}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0">
                            <span
                              className={cn(
                                "block text-sm font-semibold tracking-tight transition-colors duration-300",
                                isActive
                                  ? "text-accent"
                                  : "text-primary group-hover/mega:text-accent"
                              )}
                            >
                              {div.label}
                            </span>
                            <span className="mt-0.5 block text-xs leading-snug text-brand-muted">
                              {div.description}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ======== Fullscreen Mobile Menu ======== */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-90 bg-bg-light"
          >
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
              <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-emerald/5 blur-3xl" />
            </div>

            <div className="relative flex h-full flex-col pt-28 pb-10 px-8 overflow-y-auto">
              <nav className="flex-1">
                <div className="flex flex-col gap-2">
                  {/* Main links */}
                  {mobileMainLinks.map((link, idx) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.05 + idx * 0.05,
                          duration: 0.4,
                          ease: [0.16, 1, 0.3, 1] as const,
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={cn(
                            "group flex items-center justify-between rounded-2xl px-6 py-5 transition-all duration-300",
                            isActive
                              ? "bg-accent/10 text-accent"
                              : "text-primary hover:bg-primary/5"
                          )}
                        >
                          <div className="flex items-center gap-5">
                            <span className="font-mono text-xs text-brand-muted">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <span className="text-2xl font-bold tracking-tight">
                              {link.label}
                            </span>
                          </div>
                          <ChevronRight
                            className={cn(
                              "h-5 w-5 transition-transform duration-300",
                              isActive
                                ? "text-accent"
                                : "text-brand-muted group-hover:translate-x-1"
                            )}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Divisions Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 + mobileMainLinks.length * 0.05,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }}
                  >
                    <button
                      onClick={() => setMobileDivisionsOpen((p) => !p)}
                      className={cn(
                        "group flex w-full items-center justify-between rounded-2xl px-6 py-5 transition-all duration-300 cursor-pointer",
                        isDivisionActive
                          ? "bg-accent/10 text-accent"
                          : "text-primary hover:bg-primary/5"
                      )}
                    >
                      <div className="flex items-center gap-5">
                        <span className="font-mono text-xs text-brand-muted">
                          {String(mobileMainLinks.length + 1).padStart(2, "0")}
                        </span>
                        <span className="text-2xl font-bold tracking-tight">
                          Divisions
                        </span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-brand-muted transition-transform duration-300",
                          mobileDivisionsOpen && "rotate-180 text-accent"
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {mobileDivisionsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 pl-4 pt-1 pb-2">
                            {divisions.map((div) => {
                              const Icon = div.icon;
                              const isActive = pathname === div.href;
                              return (
                                <Link
                                  key={div.href}
                                  href={div.href}
                                  onClick={() => setIsMobileOpen(false)}
                                  className={cn(
                                    "flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300",
                                    isActive
                                      ? "bg-accent/10 text-accent"
                                      : "text-primary/80 hover:bg-primary/5"
                                  )}
                                >
                                  <div
                                    className={cn(
                                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                                      isActive
                                        ? "bg-accent/20 text-accent"
                                        : "bg-primary/5 text-primary/50"
                                    )}
                                  >
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  <div className="min-w-0">
                                    <span
                                      className={cn(
                                        "block text-base font-semibold tracking-tight",
                                        isActive ? "text-accent" : "text-primary"
                                      )}
                                    >
                                      {div.label}
                                    </span>
                                    <span className="block text-xs text-brand-muted leading-snug">
                                      {div.description}
                                    </span>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="space-y-4"
              >
                <Button
                  variant="primary"
                  size="xl"
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full justify-center"
                >
                  Get Started
                  <ArrowUpRight className="h-5 w-5" />
                </Button>
                <p className="text-center text-xs text-brand-muted">
                  hello@traverseminds.ug
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
