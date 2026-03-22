"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <>
      {/* Page content fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease }}
      >
        {children}
      </motion.div>

      {/* Curtain wipe overlay — slides up on entry */}
      <motion.div
        className="fixed inset-0 z-[9998] bg-primary pointer-events-none origin-bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.1 }}
      />

      {/* Accent line that follows the curtain */}
      <motion.div
        className="fixed left-0 right-0 h-[2px] z-[9999] pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, var(--color-accent) 50%, transparent 100%)",
        }}
        initial={{ top: "0%" }}
        animate={{ top: "-5%" }}
        transition={{ duration: 0.8, ease, delay: 0.1 }}
      />
    </>
  );
}
