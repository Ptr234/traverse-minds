import Link from "next/link";
import type { ThreatWatchItem } from "@/lib/cisa";

const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });

/**
 * Scrolling strip of the latest flaws CISA has confirmed as exploited. The list is rendered twice so
 * the CSS marquee loops seamlessly; the copy is hidden from screen readers. Hover or focus pauses it.
 */
export function ThreatTicker({ items }: { items: ThreatWatchItem[] }) {
  if (items.length === 0) return null;

  const entries = (copy: boolean) =>
    items.map((t) => (
      <li key={`${copy ? "b" : "a"}${t.cveId}`} className="flex shrink-0 items-center gap-2 pr-10">
        <span className="text-accent">{t.cveId}</span>
        <span className="text-white/85">
          {t.vendor} {t.product}
        </span>
        {t.ransomware && <span className="border border-accent/60 px-1 text-[10px] text-accent">RANSOMWARE</span>}
        <span className="text-white/40">+{shortDate(t.dateAdded)}</span>
      </li>
    ));

  return (
    <div className="container-max w-full pt-4">
      <Link
        href="/security"
        className="group flex items-stretch overflow-hidden bg-primary font-mono text-[12px] focus-visible:outline-2 focus-visible:outline-accent"
        aria-label="Threat Watch: latest exploited vulnerabilities, see the full list on the Security page"
      >
        <span className="flex shrink-0 items-center gap-2 bg-accent px-3 py-2 font-semibold uppercase tracking-wider text-white">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" aria-hidden />
          Threat Watch
        </span>
        <div className="relative min-w-0 grow overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,#000_3%,#000_92%,transparent)]">
          <div className="flex w-max animate-[marquee_60s_linear_infinite] pl-4 group-hover:[animation-play-state:paused] group-focus-visible:[animation-play-state:paused]">
            <ul className="flex">{entries(false)}</ul>
            <ul className="flex" aria-hidden>{entries(true)}</ul>
          </div>
        </div>
      </Link>
    </div>
  );
}
