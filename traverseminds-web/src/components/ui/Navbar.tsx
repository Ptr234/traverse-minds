"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Security", href: "/security" },
  { label: "Events", href: "/events" },
  { label: "Research", href: "/think-tank" },
  { label: "Media", href: "/media" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

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
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
      </motion.nav>

      {/* Fullscreen Mobile Menu */}
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

            <div className="relative flex h-full flex-col pt-28 pb-10 px-8">
              <nav className="flex-1">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, idx) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + idx * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
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
                          <ChevronRight className={cn(
                            "h-5 w-5 transition-transform duration-300",
                            isActive ? "text-accent" : "text-brand-muted group-hover:translate-x-1"
                          )} />
                        </Link>
                      </motion.div>
                    );
                  })}
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
