"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

interface TrustLogoStripProps {
  /** "dark" renders white text on transparent; "light" (default) renders dark text */
  variant?: "light" | "dark";
  /** Override the default logo images */
  logos?: { src: string; alt: string }[];
  className?: string;
}

const DEFAULT_LOGOS = [
  { src: "/logo/ucc-logo.png", alt: "Uganda Communications Commission" },
  { src: "/logo/safeboda-logo.svg", alt: "SafeBoda" },
  { src: "/logo/hg-advocates-logo.svg", alt: "H&G Advocates" },
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
        "group relative w-full overflow-hidden py-12",
        className,
      )}
      aria-label="Trusted partners"
    >
      {/* Fade edges */}
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-12 md:w-32",
          isDark
            ? "bg-linear-to-r from-primary to-transparent"
            : "bg-linear-to-r from-bg-light to-transparent",
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-12 md:w-32",
          isDark
            ? "bg-linear-to-l from-primary to-transparent"
            : "bg-linear-to-l from-bg-light to-transparent",
        )}
      />

      {/* Scrolling track — pauses on hover via group-hover */}
      <div
        className="flex w-max animate-[marquee_40s_linear_infinite] items-center group-hover:[animation-play-state:paused]"
      >
        {/* Original + duplicate for seamless loop */}
        {[...logos, ...logos, ...logos].map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className={cn(
              "mx-10 flex h-16 w-48 shrink-0 items-center justify-center transition-all duration-500",
              "opacity-80 hover:opacity-100",
            )}
          >
            <div className="relative h-12 w-full">
              <Image
                src={`${basePath}${logo.src}`}
                alt={logo.alt}
                fill
                className="object-contain"
                sizes="200px"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
