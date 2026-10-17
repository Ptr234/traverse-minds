"use client";

import { useState, useSyncExternalStore } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const TOPICS = [
  { value: "security", label: "Cybersecurity (Traverse Security)" },
  { value: "literacy", label: "Staff training (Digital Literacy)" },
  { value: "think-tank", label: "Research and policy (Think Tank)" },
  { value: "public-record", label: "Public Record Africa" },
  { value: "events", label: "Events and partnerships" },
  { value: "media", label: "Media and the podcast" },
  { value: "general", label: "Something else" },
];

const noSubscribe = () => () => {};
// Earliest bookable day is tomorrow, in Kampala time; computed in the browser because the site is static
const tomorrowInKampala = () => {
  const d = new Date(Date.now() + 24 * 3600 * 1000);
  return d.toLocaleDateString("en-CA", { timeZone: "Africa/Kampala" });
};

const field = "mt-1.5 w-full border border-black/15 bg-white px-3.5 py-3 text-[15px] text-black outline-none focus:border-accent";
const label = "font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-gn-300";

/**
 * "Book an intro call": collects a preferred day and time, then /api/schedule-call emails the team
 * and sends the visitor a confirmation that their call is being scheduled.
 */
export function ScheduleCall() {
  const minDate = useSyncExternalStore(noSubscribe, tomorrowInKampala, () => "");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/schedule-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "We could not send your request.");
      setSentTo(String(data.email));
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not send your request.");
      setStatus("idle");
    }
  }

  return (
    <section id="schedule-call" className="bg-bg-light" aria-labelledby="schedule-call-heading">
      <div className="container-max py-14 lg:py-20">
        <div className="grid gap-10 border-t-2 border-black pt-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">
              <span className="h-2 w-2 bg-accent" aria-hidden />
              Intro call
            </p>
            <h2 id="schedule-call-heading" className="mt-4 font-serif text-[clamp(28px,3.6vw,40px)] font-semibold leading-tight text-black">
              Book a 30-minute call with our team.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-gn-400">
              Tell us when suits you. We will email a calendar invitation with a video link within one working day.
              No commitment, no sales pitch.
            </p>
            <ul className="mt-6 space-y-2 font-mono text-[12px] uppercase tracking-wide text-gn-300">
              <li className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 bg-accent" aria-hidden /> Monday to Friday</li>
              <li className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 bg-accent" aria-hidden /> 9:00 AM to 5:00 PM EAT</li>
              <li className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 bg-accent" aria-hidden /> Video or phone</li>
            </ul>
          </div>

          {status === "done" ? (
            <div className="flex flex-col justify-center border border-black/10 bg-white p-8 lg:p-10" role="status">
              <CheckCircle2 className="h-8 w-8 text-emerald" aria-hidden />
              <p className="mt-4 font-serif text-[24px] font-semibold text-black">Your call is being scheduled.</p>
              <p className="mt-2 text-[15px] leading-relaxed text-gn-400">
                We have sent a confirmation to <strong className="text-black">{sentTo}</strong>. Your calendar invitation will
                follow within one working day.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5 border border-black/10 bg-white p-6 sm:grid-cols-2 lg:p-8">
              {/* Bot trap: hidden from people and screen readers */}
              <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

              <label className="block">
                <span className={label}>Full name *</span>
                <input name="name" required minLength={2} maxLength={120} autoComplete="name" className={field} />
              </label>
              <label className="block">
                <span className={label}>Email *</span>
                <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
              </label>
              <label className="block">
                <span className={label}>Organisation</span>
                <input name="organisation" maxLength={160} autoComplete="organization" className={field} />
              </label>
              <label className="block">
                <span className={label}>Phone</span>
                <input name="phone" type="tel" maxLength={40} autoComplete="tel" className={field} />
              </label>
              <label className="block">
                <span className={label}>Preferred date *</span>
                <input name="preferredDate" type="date" required min={minDate || undefined} className={field} />
              </label>
              <label className="block">
                <span className={label}>Preferred time</span>
                <select name="timeWindow" defaultValue="any" className={field}>
                  <option value="morning">Morning (9 AM to 12 PM)</option>
                  <option value="afternoon">Afternoon (12 to 5 PM)</option>
                  <option value="any">Any time</option>
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className={label}>Topic</span>
                <select name="topic" defaultValue="security" className={field}>
                  {TOPICS.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className={label}>What would you like to discuss?</span>
                <textarea name="notes" rows={3} maxLength={2000} className={`${field} resize-y`} />
              </label>

              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-[14px] font-bold uppercase tracking-wider text-white hover:bg-accent-hover disabled:opacity-60"
                >
                  {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
                  Schedule a call
                  {status === "sending" ? null : <ArrowRight className="h-4 w-4" aria-hidden />}
                </button>
                <p className="text-[12px] text-gn-500">We only use your details to arrange this call.</p>
              </div>
              {error && <p className="border-l-2 border-accent pl-3 text-[14px] text-gn-300 sm:col-span-2" role="alert">{error}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
