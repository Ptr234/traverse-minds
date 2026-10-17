"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Sends one GA4 page_view per route, including in-app navigations that don't reload the page. */
export function GAPageViews() {
  const pathname = usePathname();

  useEffect(() => {
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    // Wait a tick so document.title reflects the new page
    const t = setTimeout(() => {
      gtag?.("event", "page_view", {
        page_location: window.location.href,
        page_path: pathname,
        page_title: document.title,
      });
    }, 0);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
