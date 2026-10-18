"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Sends one GA4 page_view per in-app navigation. The first page is counted by gtag's config call
 * when GA loads, so the initial render is skipped to avoid counting it twice.
 */
export function GAPageViews() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
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
