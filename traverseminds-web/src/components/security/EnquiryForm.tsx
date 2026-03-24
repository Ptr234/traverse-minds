"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";

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
    "h-12 w-full border bg-white px-5 text-base outline-none",
    hasError ? "border-red-400" : ""
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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center border border-emerald/15 bg-emerald/5 px-8 py-20 text-center"
        style={{ borderRadius: 16 }}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald text-white mb-5">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="font-display text-2xl font-bold" style={{ color: "#000" }}>Enquiry Received</h3>
        <p className="mt-2 max-w-md" style={{ color: "#515459" }}>
          Thank you. A member of our security team will respond within 1 business day.
        </p>
      </motion.div>
    );
  }

  return (
    <SectionReveal variant="scale-fade" delay={0.15}>
      <div className="border bg-white p-8 md:p-10" style={{ borderRadius: 16, borderColor: "rgba(0,0,0,0.1)", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1), 0 2px 2px 0 rgba(0,0,0,0.15), 0 1px 0 0 rgba(0,0,0,0.05)" }}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div className="sr-only" aria-hidden="true">
            <input tabIndex={-1} autoComplete="off" {...register("honeypot")} />
          </div>

          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium" style={{ color: "#000" }}>Full Name *</label>
            <input id="name" type="text" autoComplete="name" placeholder="John Doe" className={inputClasses(!!errors.name)}
              style={{ borderRadius: 8, borderColor: errors.name ? undefined : "rgba(0,0,0,0.1)", color: "#000", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
              {...register("name", { required: "Required", minLength: { value: 2, message: "Required" } })} />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="organisation" className="mb-1.5 block text-sm font-medium" style={{ color: "#000" }}>Organisation *</label>
            <input id="organisation" type="text" autoComplete="organization" placeholder="Acme Corp" className={inputClasses(!!errors.organisation)}
              style={{ borderRadius: 8, borderColor: errors.organisation ? undefined : "rgba(0,0,0,0.1)", color: "#000", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
              {...register("organisation", { required: "Required" })} />
            {errors.organisation && <p className="mt-1 text-sm text-red-500">{errors.organisation.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium" style={{ color: "#000" }}>Email *</label>
              <input id="email" type="email" autoComplete="email" placeholder="john@acme.com" className={inputClasses(!!errors.email)}
                style={{ borderRadius: 8, borderColor: errors.email ? undefined : "rgba(0,0,0,0.1)", color: "#000", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                {...register("email", { required: "Required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } })} />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium" style={{ color: "#000" }}>Phone <span style={{ color: "#919499" }}>(optional)</span></label>
              <input id="phone" type="tel" autoComplete="tel" placeholder="+256 700 000 000" className={inputClasses(false)}
                style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", color: "#000", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                {...register("phone")} />
            </div>
          </div>

          <div>
            <label htmlFor="serviceType" className="mb-1.5 block text-sm font-medium" style={{ color: "#000" }}>Service Required *</label>
            <select id="serviceType" className={inputClasses(!!errors.serviceType)}
              style={{ borderRadius: 8, borderColor: errors.serviceType ? undefined : "rgba(0,0,0,0.1)", color: "#000", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
              {...register("serviceType", { required: "Select a service" })}>
              <option value="">Select a service...</option>
              {serviceOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
            </select>
            {errors.serviceType && <p className="mt-1 text-sm text-red-500">{errors.serviceType.message}</p>}
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium" style={{ color: "#000" }}>Tell us about your needs *</label>
            <textarea id="message" rows={4} placeholder="Describe your security requirements..."
              className={cn(inputClasses(!!errors.message), "h-auto py-4")}
              style={{ borderRadius: 8, borderColor: errors.message ? undefined : "rgba(0,0,0,0.1)", color: "#000", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
              {...register("message", { required: "Required", minLength: { value: 20, message: "At least 20 characters" } })} />
            {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
          </div>

          <div className="flex items-start gap-3 pt-2">
            <input id="consent" type="checkbox" className="mt-1 h-5 w-5 shrink-0 rounded accent-accent"
              {...register("consent", { required: "Required" })} />
            <label htmlFor="consent" className="text-sm" style={{ color: "#515459" }}>
              I agree to Traverse Minds&apos; <a href="/privacy" target="_blank" className="text-accent underline underline-offset-2">Privacy Policy</a> and Uganda PDPA 2019. *
            </label>
          </div>
          {errors.consent && <p className="text-sm text-red-500">{errors.consent.message}</p>}

          {serverError && (
            <div className="border border-red-200 bg-red-50 p-4 text-sm text-red-600" style={{ borderRadius: 8 }}>{serverError}</div>
          )}

          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Enquiry"}
            {!isSubmitting && <ArrowRight className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </SectionReveal>
  );
}
