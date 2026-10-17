"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { SectionHeader } from "@/components/magazine/primitives";

/** Weekly briefing sign-up; /api/newsletter stores the address and sends a welcome email. */
export function NewsletterSignup() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "We could not subscribe you. Please try again.");
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not subscribe you. Please try again.");
      setStatus("idle");
    }
  }

  return (
    <section className="bg-bg-light" aria-labelledby="newsletter-heading">
      <div className="container-max py-14 lg:py-20">
        <SectionHeader title="The briefing, by email" />
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-14">
          <div>
            <h2 id="newsletter-heading" className="font-serif text-[clamp(26px,3.2vw,40px)] font-semibold leading-tight text-black">
              Stay ahead of the threat landscape.
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-gn-400">
              A weekly intelligence briefing on African cybersecurity trends, policy updates and event invitations.
            </p>
          </div>

          {status === "done" ? (
            <div className="flex items-start gap-3 border-l-[3px] border-emerald bg-white p-5" role="status">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald" aria-hidden />
              <div>
                <p className="font-serif text-[20px] font-semibold text-black">You&apos;re subscribed.</p>
                <p className="mt-1 text-[15px] text-gn-400">A welcome email is on its way to your inbox.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <label htmlFor="newsletter-email" className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-gn-300">
                Work email
              </label>
              <div className="mt-1.5 flex flex-col gap-2 sm:flex-row">
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@organisation.com"
                  aria-describedby={error ? "newsletter-error" : "newsletter-note"}
                  aria-invalid={!!error}
                  className="h-12 min-w-0 flex-1 border border-black/15 bg-white px-3.5 text-[16px] text-black outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex h-12 items-center justify-center gap-2 bg-black px-6 text-[14px] font-bold uppercase tracking-wider text-white hover:bg-accent disabled:opacity-60"
                >
                  {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
                  Subscribe
                  {status === "sending" ? null : <ArrowRight className="h-4 w-4" aria-hidden />}
                </button>
              </div>
              {error ? (
                <p id="newsletter-error" role="alert" className="mt-2 border-l-2 border-accent pl-3 text-[14px] text-gn-300">{error}</p>
              ) : (
                <p id="newsletter-note" className="mt-2 font-mono text-[11px] uppercase tracking-wide text-gn-500">
                  No spam · Unsubscribe any time · Handled under Uganda&apos;s data protection law
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
