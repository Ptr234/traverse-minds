"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { SectionHeader } from "@/components/magazine/primitives";

const input = "h-12 w-full border border-white/20 bg-white/5 px-3.5 text-[15px] text-white placeholder:text-white/40 outline-none focus:border-accent";

/**
 * Capability statement request. There is no public PDF, so the request goes to the team through
 * /api/contact (which emails the team and confirms to the requester) and the team replies with it.
 */
export function CapabilityDownload() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, division: "security", useCase: "Capability statement request", message: "Please send me the Traverse Security capability statement." }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "We could not send your request.");
      form.reset();
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not send your request.");
      setStatus("idle");
    }
  }

  return (
    <section id="capability" className="relative overflow-hidden bg-bg-dark text-white">
      <div className="tech-grid-dark absolute inset-0" aria-hidden />
      <div className="container-max relative py-14 lg:py-20">
        <SectionHeader title="Capability statement" dark />
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1]">Request our capability statement.</h2>
            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-white/65">
              An overview of our security services, methodology, the frameworks we work with, and how engagements are structured, for
              procurement and due-diligence teams. We email it to you within one working day.
            </p>
          </div>

          {status === "done" ? (
            <div className="flex items-start gap-3 border-l-[3px] border-emerald bg-white/5 p-6" role="status">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald" aria-hidden />
              <div>
                <p className="font-serif text-[21px] font-semibold">Request received.</p>
                <p className="mt-1 text-[15px] text-white/65">We have emailed you a confirmation and will send the capability statement within one working day.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-3">
              <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
              <label className="sr-only" htmlFor="cap-name">Full name</label>
              <input id="cap-name" name="name" required minLength={2} maxLength={120} autoComplete="name" placeholder="Full name" className={input} />
              <label className="sr-only" htmlFor="cap-email">Work email</label>
              <input id="cap-email" name="email" type="email" required autoComplete="email" placeholder="Work email" className={input} />
              <label className="sr-only" htmlFor="cap-org">Organisation</label>
              <input id="cap-org" name="organisation" required maxLength={160} autoComplete="organization" placeholder="Organisation" className={input} />
              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-1 inline-flex h-12 items-center justify-center gap-2 bg-accent px-6 text-[14px] font-bold uppercase tracking-wider text-white disabled:opacity-60"
              >
                {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
                Request the statement
                {status === "sending" ? null : <ArrowRight className="h-4 w-4" aria-hidden />}
              </button>
              {error && <p className="border-l-2 border-accent pl-3 text-[14px] text-white/70" role="alert">{error}</p>}
              <p className="text-[12px] text-white/50">
                Handled under our <a href="/privacy" className="underline hover:text-accent">privacy policy</a>.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
