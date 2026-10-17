import Script from "next/script";
import { GAPageViews } from "./GAPageViews";

// GA4 web stream "Traverse" (https://traverseminds.com)
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-G5FPDNDLBE";
export const COOKIE_CONSENT_KEY = "tm-cookie-consent";

/**
 * Google Analytics 4 with Consent Mode v2. Storage is denied until the visitor accepts the cookie
 * banner (Uganda PDPA 2019; our privacy policy promises analytics only with consent). Page views
 * are sent by GAPageViews on every route change (Next.js navigates without full page loads, and
 * GA's history-based page views did not fire for this stream), so automatic page_view is off.
 */
export function GoogleAnalytics() {
  // Keep local development traffic out of the property
  if (process.env.NODE_ENV !== "production" || !GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script id="ga-consent" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
          try {
            if (localStorage.getItem('${COOKIE_CONSENT_KEY}') === 'accepted') {
              gtag('consent', 'update', { analytics_storage: 'granted' });
            }
          } catch (e) {}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <GAPageViews />
    </>
  );
}

/** Called by the cookie banner. Ads signals stay denied: the site runs no advertising. */
export function updateAnalyticsConsent(choice: "accepted" | "declined") {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("consent", "update", { analytics_storage: choice === "accepted" ? "granted" : "denied" });
}
