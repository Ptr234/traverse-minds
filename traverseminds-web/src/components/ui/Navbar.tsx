"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Security", href: "/security" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-in-out border-b border-transparent",
          isScrolled
            ? "glass py-2"
            : "bg-transparent py-4 md:py-6"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <span className="font-display text-2xl font-bold tracking-tight text-brand-green md:text-3xl transition-all group-hover:opacity-90">
                Traverse <span className="text-brand-amber">Minds</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium text-brand-medium transition-colors hover:text-brand-green group py-2"
                >
                  {link.label}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 bg-brand-amber transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden items-center gap-4 md:flex">
              <Button variant="primary" size="sm" href="/contact" className="shadow-lg shadow-brand-green/20">
                Get Started
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg text-brand-charcoal md:hidden hover:bg-black/5 transition-colors"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-md"
              onClick={() => setIsMobileOpen(false)}
              aria-hidden
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 right-0 w-full max-w-xs bg-white/95 backdrop-blur-xl shadow-2xl border-l border-white/20"
            >
              <div className="flex h-20 items-center justify-between px-6 border-b border-gray-100">
                <span className="font-display text-xl font-bold text-brand-green">
                  Traverse <span className="text-brand-amber">Minds</span>
                </span>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-brand-charcoal hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col gap-2 px-6 pt-8">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="block rounded-xl px-4 py-3 text-lg font-medium text-brand-medium transition-all hover:bg-brand-offwhite hover:text-brand-green hover:pl-6"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 border-t border-gray-100 pt-8"
                >
                  <Button variant="primary" size="lg" href="/contact" className="w-full justify-center">
                    Get in Touch
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
