"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
    "h-12 w-full rounded-xl border bg-white px-5 text-base text-primary outline-none transition-all duration-300 placeholder:text-brand-muted/50 focus:border-accent focus:ring-2 focus:ring-accent/15",
    hasError ? "border-red-400" : "border-border-light"
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
      <section id="enquiry" className="section-padding">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="container-max flex flex-col items-center justify-center rounded-3xl border border-emerald/15 bg-emerald/5 px-8 py-20 text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald text-white mb-5">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h3 className="font-display text-2xl font-bold text-primary">Enquiry Received</h3>
          <p className="mt-2 max-w-md text-brand-medium/60">
            Thank you. A member of our security team will respond within 1 business day.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="enquiry" className="relative bg-surface-elevated section-padding overflow-hidden">
      <div className="absolute inset-0 dot-grid-light opacity-40 pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">Get Started</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight">
              Request a free security assessment
            </h2>
            <p className="mt-3 text-brand-medium/60">
              Tell us about your organisation. We respond within 1 business day.
            </p>
          </div>

          <div className="rounded-3xl border border-border-light bg-white p-8 md:p-10 shadow-card">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div className="sr-only" aria-hidden="true">
                <input tabIndex={-1} autoComplete="off" {...register("honeypot")} />
              </div>

              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-primary">Full Name *</label>
                <input id="name" type="text" autoComplete="name" placeholder="John Doe" className={inputClasses(!!errors.name)}
                  {...register("name", { required: "Required", minLength: { value: 2, message: "Required" } })} />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="organisation" className="mb-1.5 block text-sm font-medium text-primary">Organisation *</label>
                <input id="organisation" type="text" autoComplete="organization" placeholder="Acme Corp" className={inputClasses(!!errors.organisation)}
                  {...register("organisation", { required: "Required" })} />
                {errors.organisation && <p className="mt-1 text-sm text-red-500">{errors.organisation.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-primary">Email *</label>
                  <input id="email" type="email" autoComplete="email" placeholder="john@acme.com" className={inputClasses(!!errors.email)}
                    {...register("email", { required: "Required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } })} />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-primary">Phone <span className="text-brand-muted">(optional)</span></label>
                  <input id="phone" type="tel" autoComplete="tel" placeholder="+256 700 000 000" className={inputClasses(false)} {...register("phone")} />
                </div>
              </div>

              <div>
                <label htmlFor="serviceType" className="mb-1.5 block text-sm font-medium text-primary">Service Required *</label>
                <select id="serviceType" className={inputClasses(!!errors.serviceType)}
                  {...register("serviceType", { required: "Select a service" })}>
                  <option value="">Select a service...</option>
                  {serviceOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                </select>
                {errors.serviceType && <p className="mt-1 text-sm text-red-500">{errors.serviceType.message}</p>}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-primary">Tell us about your needs *</label>
                <textarea id="message" rows={4} placeholder="Describe your security requirements..."
                  className={cn(inputClasses(!!errors.message), "h-auto py-4")}
                  {...register("message", { required: "Required", minLength: { value: 20, message: "At least 20 characters" } })} />
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input id="consent" type="checkbox" className="mt-1 h-5 w-5 shrink-0 rounded accent-accent"
                  {...register("consent", { required: "Required" })} />
                <label htmlFor="consent" className="text-sm text-brand-medium/60">
                  I agree to Traverse Minds&apos; <a href="/privacy" target="_blank" className="text-accent underline underline-offset-2 hover:text-accent-hover">Privacy Policy</a> and Uganda PDPA 2019. *
                </label>
              </div>
              {errors.consent && <p className="text-sm text-red-500">{errors.consent.message}</p>}

              {serverError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">{serverError}</div>
              )}

              <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                {!isSubmitting && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
