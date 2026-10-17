"use client";

import { useState, useSyncExternalStore } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const noSubscribe = () => () => {};
// "Apply" links on open roles add ?role=<title>; read it in the browser (the page is static)
const roleFromUrl = () => new URLSearchParams(window.location.search).get("role") ?? "";

const field = "mt-1.5 w-full border border-black/15 bg-white px-3.5 py-3 text-[15px] text-black outline-none focus:border-accent";
const label = "font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-gn-300";

const GENERAL = ["Internship or fellowship", "Speculative application"];

/** Job application form; posts to /api/apply, which emails the team and the applicant. */
export function ApplicationForm({ roles }: { roles: string[] }) {
  const requested = useSyncExternalStore(noSubscribe, roleFromUrl, () => "");
  const options = [...roles, ...GENERAL];
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/api/apply", { method: "POST", body: new FormData(form) });
      if (!res.ok) throw new Error("Failed to submit");
      form.reset();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="border border-black/10 bg-white p-8 lg:p-10" role="status">
        <CheckCircle2 className="h-8 w-8 text-emerald" aria-hidden />
        <p className="mt-4 font-serif text-[24px] font-semibold text-black">Application received.</p>
        <p className="mt-2 text-[15px] leading-relaxed text-gn-400">
          Thank you for your interest in Traverse Minds Africa. We will review your application and reply within five working days.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-[14px] font-semibold text-black underline underline-offset-4 hover:text-accent">
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 border border-black/10 bg-white p-6 sm:grid-cols-2 lg:p-8">
      <label className="block sm:col-span-2">
        <span className={label}>Role *</span>
        <select
          key={requested}
          name="role"
          required
          defaultValue={options.includes(requested) ? requested : options[0]}
          className={field}
        >
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className={label}>Full name *</span>
        <input name="name" required minLength={2} maxLength={120} autoComplete="name" placeholder="Jane Nakamya" className={field} />
      </label>
      <label className="block">
        <span className={label}>Email *</span>
        <input name="email" type="email" required maxLength={200} autoComplete="email" placeholder="jane@example.com" className={field} />
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>Phone *</span>
        <input name="phone" type="tel" required maxLength={40} autoComplete="tel" placeholder="+256 700 000 000" className={field} />
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>Cover letter *</span>
        <textarea
          name="coverLetter"
          rows={6}
          required
          maxLength={10000}
          placeholder="Tell us about yourself, your experience, and why you want to join Traverse Minds Africa."
          className={`${field} resize-y`}
        />
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>CV *</span>
        <input
          name="cv"
          type="file"
          required
          accept=".pdf,.doc,.docx"
          className={`${field} cursor-pointer file:mr-4 file:border-0 file:bg-black file:px-3 file:py-1.5 file:font-mono file:text-[11px] file:uppercase file:tracking-wider file:text-white`}
        />
        <span className="mt-1.5 block text-[12px] text-gn-500">PDF, DOC or DOCX, up to 5 MB.</span>
      </label>

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-[14px] font-bold uppercase tracking-wider text-white hover:bg-accent-hover disabled:opacity-60"
        >
          {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          Submit application
          {status === "sending" ? null : <ArrowRight className="h-4 w-4" aria-hidden />}
        </button>
        <p className="text-[12px] text-gn-500">We only use your details to assess your application.</p>
      </div>
      {status === "error" && (
        <p className="border-l-2 border-accent pl-3 text-[14px] text-gn-300 sm:col-span-2" role="alert">
          Something went wrong. Please try again, or email your application to traversemindsug@gmail.com.
        </p>
      )}
    </form>
  );
}
