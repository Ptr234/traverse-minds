"use client";

import { cn } from "@/lib/utils";

interface TrustLogoStripProps {
  /** "dark" renders white text on transparent; "light" (default) renders dark text */
  variant?: "light" | "dark";
  /** Override the default placeholder labels */
  logos?: string[];
  className?: string;
}

const DEFAULT_LOGOS = [
  "Partner 1",
  "Partner 2",
  "Partner 3",
  "Partner 4",
  "Partner 5",
  "Partner 6",
];

export function TrustLogoStrip({
  variant = "light",
  logos = DEFAULT_LOGOS,
  className,
}: TrustLogoStripProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden py-8",
        className,
      )}
      aria-label="Trusted partners"
    >
      {/* Fade edges */}
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-24",
          isDark
            ? "bg-gradient-to-r from-primary to-transparent"
            : "bg-gradient-to-r from-bg-light to-transparent",
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-24",
          isDark
            ? "bg-gradient-to-l from-primary to-transparent"
            : "bg-gradient-to-l from-bg-light to-transparent",
        )}
      />

      {/* Scrolling track — pauses on hover via group-hover */}
      <div
        className="flex w-max animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused]"
      >
        {/* Original + duplicate for seamless loop */}
        {[...logos, ...logos].map((label, i) => (
          <div
            key={`${label}-${i}`}
            className={cn(
              "mx-6 flex h-14 w-40 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold tracking-wide transition-all duration-300",
              "grayscale hover:grayscale-0 hover:opacity-100",
              isDark
                ? "border-white/10 bg-white/5 text-white/50 hover:border-accent hover:text-white"
                : "border-border-light bg-surface-elevated text-brand-medium opacity-60 hover:border-accent hover:text-primary hover:opacity-100",
            )}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
