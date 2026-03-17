"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./Button";

const COOKIE_CONSENT_KEY = "tm-cookie-consent";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { if (!localStorage.getItem(COOKIE_CONSENT_KEY)) setIsVisible(true); }, []);
  const handle = (v: string) => { localStorage.setItem(COOKIE_CONSENT_KEY, v); setIsVisible(false); };
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-light-border bg-white p-4 shadow-lg sm:p-6">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex-1 text-sm leading-relaxed text-brand-medium">
          We use cookies to improve your experience per Uganda&apos;s PDPA 2019.{" "}
          <Link href="/privacy" className="font-medium text-brand-green underline hover:text-brand-teal">Read our Privacy Policy</Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <Button variant="ghost" size="sm" onClick={() => handle("declined")}>Decline</Button>
          <Button variant="primary" size="sm" onClick={() => handle("accepted")}>Accept</Button>
        </div>
      </div>
    </div>
  );
}
