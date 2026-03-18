"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DivisionCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
  accentColor: string;
  className?: string;
}

export function DivisionCard({
  name,
  description,
  icon: Icon,
  href,
  accentColor,
  className,
}: DivisionCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col gap-4 rounded-2xl border border-border-light bg-white p-6 transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-elevated",
        className,
      )}
      style={{ boxShadow: "var(--shadow-card)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent stripe */}
      <span
        className="absolute inset-x-0 top-0 h-1 rounded-t-2xl"
        style={{ backgroundColor: accentColor }}
        aria-hidden="true"
      />

      {/* Hover background flood — 10% opacity of the division color */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          backgroundColor: accentColor,
          opacity: hovered ? 0.1 : 0,
        }}
        aria-hidden="true"
      />

      {/* Content sits above the flood */}
      <div className="relative z-10 flex items-center gap-3">
        <Icon className="h-8 w-8 shrink-0" style={{ color: accentColor }} />
        <h3 className="font-display text-lg font-bold text-primary">{name}</h3>
      </div>

      <p className="relative z-10 text-sm leading-relaxed text-brand-medium line-clamp-1">
        {description}
      </p>

      {/* Arrow slides in on hover */}
      <div
        className="relative z-10 mt-auto flex items-center gap-1 text-sm font-semibold transition-colors duration-300"
        style={{ color: accentColor }}
      >
        <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Explore
        </span>
        <ArrowRight className="h-4 w-4 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
      </div>
    </Link>
  );
}

export type { DivisionCardProps };
