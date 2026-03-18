"use client";

import { cn } from "@/lib/utils";

const filters = [
  { value: "all", label: "All" },
  { value: "security", label: "Security" },
  { value: "events", label: "Events" },
  { value: "ai", label: "AI / Public Record" },
  { value: "literacy", label: "Literacy" },
  { value: "media", label: "Media" },
  { value: "thinktank", label: "Think Tank" },
];

interface DivisionFilterProps {
  active: string;
  onChange: (value: string) => void;
}

export function DivisionFilter({ active, onChange }: DivisionFilterProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={cn(
            "min-h-11 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300",
            active === f.value
              ? "bg-brand-green text-white"
              : "border border-light-border bg-white text-brand-medium hover:border-brand-green hover:text-brand-charcoal"
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
