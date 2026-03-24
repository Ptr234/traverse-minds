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
            "min-h-11 px-5 py-2.5 text-sm font-medium",
            active === f.value
              ? "bg-accent text-white"
              : "border bg-white"
          )}
          style={{
            borderRadius: 999,
            transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)",
            borderColor: active === f.value ? "transparent" : "rgba(0,0,0,0.1)",
            color: active === f.value ? "#fff" : "#515459",
          }}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
