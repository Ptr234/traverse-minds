"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, CalendarDays, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const bottomNavItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Divisions", href: "/about", icon: Layers },
  { label: "Events", href: "/events", icon: CalendarDays },
  { label: "Contact", href: "/contact", icon: Mail },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-x-0 bottom-0 z-80 md:hidden">
      <nav className="mx-3 mb-3 rounded-2xl border border-border-light/30 bg-white/70 backdrop-blur-xl shadow-lg">
        <div className="flex items-center justify-around">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-0.5 px-3 py-2 transition-colors duration-300",
                  isActive
                    ? "text-accent"
                    : "text-primary/40 hover:text-primary/70"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive && "drop-shadow-sm")} />
                <span
                  className={cn(
                    "text-[10px] font-semibold leading-none tracking-wide",
                    isActive ? "text-accent" : "text-primary/40"
                  )}
                >
                  {item.label}
                </span>
                {isActive && (
                  <span className="mt-0.5 h-0.5 w-4 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
