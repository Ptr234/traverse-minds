"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { GAPageViews } from "./GAPageViews";

// GA4 web stream "Traverse" (https://traverseminds.com)
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-G5FPDNDLBE";
export const COOKIE_CONSENT_KEY = "tm-cookie-consent";
const CONSENT_EVENT = "tm-consent-change";

const readConsent = () => {
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY);
  } catch {
    return null;
  }
};

const subscribe = (onChange: () => void) => {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange); // a choice made in another tab
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
};

/**
 * Google Analytics 4 in "basic" consent mode: nothing from Google loads, and no request is sent,
 * until the visitor accepts the cookie banner (Uganda PDPA 2019; the privacy policy promises
 * analytics only with consent). The config sends the first page_view; GAPageViews sends one per
 * later route change, because Next.js navigates without full page loads.
 */
export function GoogleAnalytics() {
  const consent = useSyncExternalStore(subscribe, readConsent, () => null);

  // Keep local development traffic out of the property
  if (process.env.NODE_ENV !== "production" || !GA_MEASUREMENT_ID || consent !== "accepted") return null;

  return (
    <>
      <Script id="ga-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <GAPageViews />
    </>
  );
}

/** Called by the cookie banner after it stores the choice. Ads signals stay denied: the site runs no advertising. */
export function updateAnalyticsConsent(choice: "accepted" | "declined") {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  // If GA was already running (accepted earlier, now declined), stop storage right away
  gtag?.("consent", "update", { analytics_storage: choice === "accepted" ? "granted" : "denied" });
  window.dispatchEvent(new Event(CONSENT_EVENT));
}
