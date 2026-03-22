"use client";

import { motion } from "framer-motion";

interface Orb {
  color: string;
  size: string;
  x: string;
  y: string;
  duration: number;
  delay: number;
}

interface FloatingOrbsProps {
  variant?: "accent" | "emerald" | "mixed" | "subtle";
  className?: string;
  count?: number;
}

const orbPresets: Record<string, Orb[]> = {
  accent: [
    { color: "bg-accent/8", size: "h-80 w-80", x: "10%", y: "20%", duration: 20, delay: 0 },
    { color: "bg-accent/5", size: "h-96 w-96", x: "70%", y: "60%", duration: 25, delay: 2 },
    { color: "bg-accent/6", size: "h-64 w-64", x: "50%", y: "10%", duration: 18, delay: 5 },
  ],
  emerald: [
    { color: "bg-emerald/8", size: "h-80 w-80", x: "20%", y: "30%", duration: 22, delay: 0 },
    { color: "bg-emerald/5", size: "h-96 w-96", x: "80%", y: "50%", duration: 28, delay: 3 },
    { color: "bg-emerald/6", size: "h-64 w-64", x: "40%", y: "80%", duration: 20, delay: 1 },
  ],
  mixed: [
    { color: "bg-accent/8", size: "h-96 w-96", x: "15%", y: "15%", duration: 22, delay: 0 },
    { color: "bg-emerald/6", size: "h-80 w-80", x: "75%", y: "25%", duration: 26, delay: 2 },
    { color: "bg-accent/5", size: "h-72 w-72", x: "60%", y: "70%", duration: 20, delay: 4 },
    { color: "bg-emerald/4", size: "h-64 w-64", x: "25%", y: "75%", duration: 24, delay: 1 },
  ],
  subtle: [
    { color: "bg-white/3", size: "h-96 w-96", x: "20%", y: "20%", duration: 30, delay: 0 },
    { color: "bg-white/2", size: "h-80 w-80", x: "70%", y: "60%", duration: 35, delay: 5 },
  ],
};

export function FloatingOrbs({
  variant = "mixed",
  className = "",
}: FloatingOrbsProps) {
  const orbs = orbPresets[variant];

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[100px] ${orb.color} ${orb.size}`}
          style={{ left: orb.x, top: orb.y }}
          animate={{
            x: [0, 30, -20, 15, 0],
            y: [0, -25, 15, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}
