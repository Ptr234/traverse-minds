import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { SITE_URL } from "@/lib/site";

export type Crumb = { name: string; href: string };

/** BreadcrumbList structured data. Use on its own where a visible trail would not fit the design. */
export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      // trailingSlash is enabled, so canonical URLs end in "/"
      item: `${SITE_URL}${c.href === "/" ? "/" : `${c.href.replace(/\/$/, "")}/`}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

/** Visible breadcrumb trail plus its structured data. `tone="dark"` for use on dark heroes. */
export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const muted = tone === "dark" ? "rgba(255,255,255,0.55)" : "#6b6e73";
  const current = tone === "dark" ? "#ffffff" : "#212429";
  return (
    <>
      <BreadcrumbJsonLd items={items} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5" style={{ fontSize: 13 }}>
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" style={{ color: current }}>{c.name}</span>
                ) : (
                  <>
                    <Link href={c.href} className="hover:underline" style={{ color: muted }}>{c.name}</Link>
                    <ChevronRight className="h-3 w-3" style={{ color: muted }} aria-hidden />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
