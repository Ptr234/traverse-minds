"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

interface ContactFormData {
  name: string;
  organisation: string;
  email: string;
  phone?: string;
  division: string;
  budgetRange?: string;
  useCase?: string;
  message: string;
  howHeard?: string;
  consent: boolean;
  honeypot?: string;
}

const divisionOptions = [
  { value: "security", label: "Traverse Security" },
  { value: "events", label: "Traverse Events" },
  { value: "public-record", label: "Public Record Africa" },
  { value: "literacy", label: "Digital Literacy" },
  { value: "media", label: "Traverse Media" },
  { value: "think-tank", label: "Think Tank" },
  { value: "general", label: "General Enquiry" },
];

const budgetRangeOptions = ["Below $5,000", "$5,000 - $15,000", "$15,000 - $50,000", "$50,000 - $100,000", "Above $100,000"];

const useCaseOptions = [
  { value: "journalist", label: "Journalist" },
  { value: "lawyer", label: "Lawyer" },
  { value: "researcher", label: "Researcher" },
  { value: "government", label: "Government" },
  { value: "other", label: "Other" },
];

// Links elsewhere on the site open /contact?subject=..., which pre-selects the division and starts the message
const SUBJECTS: Record<string, { division: string; message: string }> = {
  speaking: { division: "events", message: "I'd like to propose a talk at a Traverse Minds event." },
  sponsorship: { division: "events", message: "I'd like to discuss sponsoring a Traverse Minds event." },
  "community-outreach": { division: "literacy", message: "I'd like to invite you to run a digital safety workshop for our community." },
  "podcast-guest": { division: "media", message: "I'd like to pitch a topic for the Facts & Figures podcast." },
  "media-kit": { division: "media", message: "Please send me the Traverse Minds media kit." },
  interview: { division: "media", message: "I'd like to request an interview." },
};

const label = "mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-gn-300";
const field = (hasError?: boolean) =>
  `w-full border bg-white px-3.5 py-3 text-[15px] text-black outline-none focus:border-accent ${hasError ? "border-red-700" : "border-black/15"}`;
const errorText = "mt-1 text-[13px] text-red-700";

export function ContactForm() {
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const { register, handleSubmit, control, setValue, formState: { errors, isSubmitting } } = useForm<ContactFormData>();
  const selectedDivision = useWatch({ control, name: "division" });

  useEffect(() => {
    const subject = SUBJECTS[new URLSearchParams(window.location.search).get("subject") ?? ""];
    if (subject) {
      setValue("division", subject.division);
      setValue("message", subject.message);
    }
  }, [setValue]);

  const onSubmit = async (data: ContactFormData) => {
    if (data.honeypot) return;
    setErr("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "We could not send your message.");
      setDone(true);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "We could not send your message.");
    }
  };

  if (done)
    return (
      <div className="flex items-start gap-3 border-l-[3px] border-emerald bg-white p-6" role="status">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald" aria-hidden />
        <div>
          <p className="font-serif text-[22px] font-semibold text-black">Message sent.</p>
          <p className="mt-1 text-[15px] text-gn-400">We have emailed you a confirmation and will respond within one working day.</p>
        </div>
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2" noValidate>
      <div className="hidden" aria-hidden>
        <input tabIndex={-1} autoComplete="off" {...register("honeypot")} />
      </div>

      <div>
        <label htmlFor="c-name" className={label}>Full name *</label>
        <input id="c-name" type="text" autoComplete="name" className={field(!!errors.name)} aria-invalid={!!errors.name}
          {...register("name", { required: "Please tell us your name." })} />
        {errors.name && <p className={errorText}>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="c-org" className={label}>Organisation *</label>
        <input id="c-org" type="text" autoComplete="organization" className={field(!!errors.organisation)} aria-invalid={!!errors.organisation}
          {...register("organisation", { required: "Please tell us your organisation." })} />
        {errors.organisation && <p className={errorText}>{errors.organisation.message}</p>}
      </div>
      <div>
        <label htmlFor="c-email" className={label}>Email *</label>
        <input id="c-email" type="email" autoComplete="email" className={field(!!errors.email)} aria-invalid={!!errors.email}
          {...register("email", { required: "Please enter your email.", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email." } })} />
        {errors.email && <p className={errorText}>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="c-division" className={label}>Division *</label>
        <select id="c-division" className={field(!!errors.division)} aria-invalid={!!errors.division}
          {...register("division", { required: "Please choose a division." })}>
          <option value="">Select a division</option>
          {divisionOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {errors.division && <p className={errorText}>{errors.division.message}</p>}
      </div>

      {selectedDivision === "security" && (
        <div className="sm:col-span-2">
          <label htmlFor="c-budget" className={label}>Budget range *</label>
          <select id="c-budget" className={field(!!errors.budgetRange)} {...register("budgetRange", { required: "Please choose a budget range." })}>
            <option value="">Select a budget range</option>
            {budgetRangeOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          {errors.budgetRange && <p className={errorText}>{errors.budgetRange.message}</p>}
        </div>
      )}

      {selectedDivision === "public-record" && (
        <div className="sm:col-span-2">
          <label htmlFor="c-usecase" className={label}>How will you use the data? *</label>
          <select id="c-usecase" className={field(!!errors.useCase)} {...register("useCase", { required: "Please choose an option." })}>
            <option value="">Select one</option>
            {useCaseOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {errors.useCase && <p className={errorText}>{errors.useCase.message}</p>}
        </div>
      )}

      <div className="sm:col-span-2">
        <label htmlFor="c-message" className={label}>Message *</label>
        <textarea id="c-message" rows={5} className={`${field(!!errors.message)} resize-y`} placeholder="Tell us about your needs." aria-invalid={!!errors.message}
          {...register("message", { required: "Please write a short message." })} />
        {errors.message && <p className={errorText}>{errors.message.message}</p>}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="c-consent" className="flex items-start gap-3 text-[14px] leading-relaxed text-gn-300">
          <input id="c-consent" type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-accent" {...register("consent", { required: "Please confirm consent so we can reply." })} />
          <span>
            I consent to Traverse Minds Africa processing my data to respond to this enquiry, in line with the{" "}
            <a href="/privacy" className="font-semibold text-accent hover:underline">privacy policy</a>.
          </span>
        </label>
        {errors.consent && <p className={errorText}>{errors.consent.message}</p>}
      </div>

      {err && <p className="border-l-2 border-red-700 pl-3 text-[14px] text-red-700 sm:col-span-2" role="alert">{err}</p>}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-[14px] font-bold uppercase tracking-wider text-white disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          Send enquiry
          {isSubmitting ? null : <ArrowRight className="h-4 w-4" aria-hidden />}
        </button>
      </div>
    </form>
  );
}
