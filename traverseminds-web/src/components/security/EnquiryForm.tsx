"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface EnquiryFormData {
  name: string;
  organisation: string;
  email: string;
  phone?: string;
  serviceType: string;
  message: string;
  consent: boolean;
  honeypot?: string;
}

const serviceOptions = [
  "Penetration Testing", "ISO 27001 Compliance", "Bank of Uganda Audit",
  "Threat Modelling", "Incident Response", "Regulatory Advisory", "General Enquiry",
];

const inputClasses = (hasError: boolean) =>
  cn(
    "h-12 w-full rounded-lg border bg-white px-4 text-base text-brand-charcoal outline-none transition-all placeholder:text-brand-muted focus:border-brand-teal focus:ring-1 focus:ring-brand-teal",
    hasError ? "border-red-500" : "border-light-border"
  );

export function EnquiryForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EnquiryFormData>();

  const onSubmit = async (data: EnquiryFormData) => {
    if (data.honeypot) return;
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, division: "security" }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Something went wrong");
      setIsSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Failed to submit.");
    }
  };

  if (isSubmitted) {
    return (
      <div id="enquiry" className="flex flex-col items-center justify-center rounded-xl border border-light-border bg-light-card px-6 py-16 text-center">
        <CheckCircle2 className="h-12 w-12 text-brand-teal" />
        <h3 className="mt-4 font-display text-2xl text-brand-charcoal">Enquiry Received</h3>
        <p className="mt-2 max-w-md text-brand-medium">
          Thank you. A member of our security team will respond within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <section id="enquiry" className="bg-light-surface px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber">Get Started</span>
          <h2 className="mt-3 font-display text-2xl text-brand-green md:text-3xl">Request a Free Security Assessment</h2>
          <p className="mt-3 text-brand-medium">Tell us about your organisation. We respond within 1 business day.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5" noValidate>
          <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
            <input tabIndex={-1} autoComplete="off" {...register("honeypot")} />
          </div>

          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-brand-charcoal">Full Name *</label>
            <input id="name" type="text" autoComplete="name" className={inputClasses(!!errors.name)}
              {...register("name", { required: "Required", minLength: { value: 2, message: "Required" } })} />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="organisation" className="mb-1.5 block text-sm font-medium text-brand-charcoal">Organisation *</label>
            <input id="organisation" type="text" autoComplete="organization" className={inputClasses(!!errors.organisation)}
              {...register("organisation", { required: "Required" })} />
            {errors.organisation && <p className="mt-1 text-sm text-red-600">{errors.organisation.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-brand-charcoal">Email *</label>
            <input id="email" type="email" autoComplete="email" className={inputClasses(!!errors.email)}
              {...register("email", { required: "Required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } })} />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-brand-charcoal">Phone <span className="text-brand-muted">(optional)</span></label>
            <input id="phone" type="tel" autoComplete="tel" className={inputClasses(false)} {...register("phone")} />
          </div>

          <div>
            <label htmlFor="serviceType" className="mb-1.5 block text-sm font-medium text-brand-charcoal">Service Required *</label>
            <select id="serviceType" className={inputClasses(!!errors.serviceType)}
              {...register("serviceType", { required: "Select a service" })}>
              <option value="">Select a service...</option>
              {serviceOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
            </select>
            {errors.serviceType && <p className="mt-1 text-sm text-red-600">{errors.serviceType.message}</p>}
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-brand-charcoal">Tell us about your needs *</label>
            <textarea id="message" rows={4}
              className={cn(inputClasses(!!errors.message), "h-auto py-3")}
              {...register("message", { required: "Required", minLength: { value: 20, message: "At least 20 characters" } })} />
            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
          </div>

          <div className="flex items-start gap-3">
            <input id="consent" type="checkbox" className="mt-1 h-5 w-5 shrink-0 rounded accent-brand-green"
              {...register("consent", { required: "Required" })} />
            <label htmlFor="consent" className="text-sm text-brand-medium">
              I agree to Traverse Minds&apos; <a href="/privacy" target="_blank" className="text-brand-teal underline">Privacy Policy</a> and Uganda PDPA 2019. *
            </label>
          </div>
          {errors.consent && <p className="text-sm text-red-600">{errors.consent.message}</p>}

          {serverError && <div className="rounded-lg border border-red-500/30 bg-red-50 p-3 text-sm text-red-600">{serverError}</div>}

          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Enquiry"}
          </Button>
        </form>
      </div>
    </section>
  );
}
