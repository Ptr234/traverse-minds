"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CheckCircle2, Loader2 } from "lucide-react";

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

const budgetRangeOptions = [
  "Below $5,000",
  "$5,000 - $15,000",
  "$15,000 - $50,000",
  "$50,000 - $100,000",
  "Above $100,000",
  "Not yet determined",
];

const useCaseOptions = [
  { value: "journalist", label: "Journalist" },
  { value: "lawyer", label: "Lawyer" },
  { value: "researcher", label: "Researcher" },
  { value: "government", label: "Government" },
  { value: "other", label: "Other" },
];

const howHeardOptions = [
  "Google Search",
  "LinkedIn",
  "WhatsApp",
  "Referral",
  "Event",
  "Other",
];

const inp = (err: boolean) =>
  cn(
    "h-12 w-full rounded-xl border bg-white px-4 text-base text-primary outline-none transition-all duration-200 placeholder:text-brand-muted/50 focus:border-accent focus:ring-2 focus:ring-accent/15",
    err ? "border-red-400 focus:border-red-400 focus:ring-red-400/15" : "border-border-light"
  );

export function ContactForm() {
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const selectedDivision = useWatch({ control, name: "division" });

  const onSubmit = async (data: ContactFormData) => {
    if (data.honeypot) return;
    setErr("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          organisation: data.organisation,
          email: data.email,
          phone: data.phone,
          division: data.division,
          budgetRange: data.budgetRange,
          useCase: data.useCase,
          message: data.message,
          howHeard: data.howHeard,
          serviceType: data.division,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Error");
      setDone(true);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed.");
    }
  };

  if (done)
    return (
      <div className="flex flex-col items-center rounded-2xl border border-emerald/15 bg-emerald/5 px-6 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald text-white">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold text-primary">
          Message Sent
        </h3>
        <p className="mt-2 max-w-md text-brand-medium/60">
          We will respond within 1 business day.
        </p>
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot - hidden from real users, traps bots */}
      <div className="absolute -left-full opacity-0 overflow-hidden h-0 w-0" aria-hidden>
        <input
          tabIndex={-1}
          autoComplete="off"
          {...register("honeypot")}
        />
      </div>

      {/* Full Name */}
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-primary">
          Full Name <span className="text-accent">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          className={inp(!!errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          aria-invalid={!!errors.name}
          {...register("name", { required: "Full name is required" })}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="mt-1.5 text-sm text-red-500 font-medium">{errors.name.message}</p>
        )}
      </div>

      {/* Organisation */}
      <div>
        <label htmlFor="contact-org" className="mb-1.5 block text-sm font-medium text-primary">
          Organisation <span className="text-accent">*</span>
        </label>
        <input
          id="contact-org"
          type="text"
          autoComplete="organization"
          className={inp(!!errors.organisation)}
          aria-describedby={errors.organisation ? "org-error" : undefined}
          aria-invalid={!!errors.organisation}
          {...register("organisation", {
            required: "Organisation is required",
          })}
        />
        {errors.organisation && (
          <p id="org-error" role="alert" className="mt-1.5 text-sm text-red-500 font-medium">
            {errors.organisation.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-primary">
          Email <span className="text-accent">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          className={inp(!!errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={!!errors.email}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1.5 text-sm text-red-500 font-medium">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-primary">
          Phone{" "}
          <span className="text-brand-muted">(optional)</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          className={inp(false)}
          {...register("phone")}
        />
      </div>

      {/* Division Selector */}
      <div>
        <label htmlFor="contact-division" className="mb-1.5 block text-sm font-medium text-primary">
          Division <span className="text-accent">*</span>
        </label>
        <select
          id="contact-division"
          className={inp(!!errors.division)}
          aria-describedby={errors.division ? "division-error" : undefined}
          aria-invalid={!!errors.division}
          {...register("division", { required: "Please select a division" })}
        >
          <option value="">Select a division...</option>
          {divisionOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {errors.division && (
          <p id="division-error" role="alert" className="mt-1.5 text-sm text-red-500 font-medium">
            {errors.division.message}
          </p>
        )}
      </div>

      {/* Conditional: Security - Budget Range */}
      {selectedDivision === "security" && (
        <div>
          <label htmlFor="contact-budget" className="mb-1.5 block text-sm font-medium text-primary">
            Budget Range <span className="text-accent">*</span>
          </label>
          <select
            id="contact-budget"
            className={inp(!!errors.budgetRange)}
            aria-describedby={errors.budgetRange ? "budget-error" : undefined}
            aria-invalid={!!errors.budgetRange}
            {...register("budgetRange", {
              required:
                selectedDivision === "security"
                  ? "Please select a budget range"
                  : false,
            })}
          >
            <option value="">Select budget range...</option>
            {budgetRangeOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {errors.budgetRange && (
            <p id="budget-error" role="alert" className="mt-1.5 text-sm text-red-500 font-medium">
              {errors.budgetRange.message}
            </p>
          )}
        </div>
      )}

      {/* Conditional: Public Record Africa - Use Case */}
      {selectedDivision === "public-record" && (
        <div>
          <label htmlFor="contact-usecase" className="mb-1.5 block text-sm font-medium text-primary">
            Use Case <span className="text-accent">*</span>
          </label>
          <select
            id="contact-usecase"
            className={inp(!!errors.useCase)}
            aria-describedby={errors.useCase ? "usecase-error" : undefined}
            aria-invalid={!!errors.useCase}
            {...register("useCase", {
              required:
                selectedDivision === "public-record"
                  ? "Please select your use case"
                  : false,
            })}
          >
            <option value="">How will you use Public Record Africa?</option>
            {useCaseOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {errors.useCase && (
            <p id="usecase-error" role="alert" className="mt-1.5 text-sm text-red-500 font-medium">
              {errors.useCase.message}
            </p>
          )}
        </div>
      )}

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-primary">
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={4}
          className={cn(inp(!!errors.message), "h-auto py-3 resize-y")}
          aria-describedby={errors.message ? "message-error" : "message-hint"}
          aria-invalid={!!errors.message}
          {...register("message", {
            required: "Message is required",
            minLength: {
              value: 20,
              message: "Please provide at least 20 characters",
            },
          })}
        />
        {errors.message ? (
          <p id="message-error" role="alert" className="mt-1.5 text-sm text-red-500 font-medium">
            {errors.message.message}
          </p>
        ) : (
          <p id="message-hint" className="mt-1.5 text-xs text-brand-muted">
            Minimum 20 characters
          </p>
        )}
      </div>

      {/* How did you hear about us */}
      <div>
        <label htmlFor="contact-howheard" className="mb-1.5 block text-sm font-medium text-primary">
          How did you hear about us?{" "}
          <span className="text-brand-muted">(optional)</span>
        </label>
        <select id="contact-howheard" className={inp(false)} {...register("howHeard")}>
          <option value="">Select...</option>
          {howHeardOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      {/* PDPA Consent Checkbox */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          className="mt-1 h-5 w-5 shrink-0 rounded border-border-light accent-accent"
          aria-describedby={errors.consent ? "consent-error" : undefined}
          {...register("consent", {
            required: "You must agree to the privacy policy to proceed",
          })}
        />
        <label htmlFor="consent" className="text-sm text-brand-medium/70 leading-relaxed">
          I consent to the collection and processing of my personal data in
          accordance with Traverse Minds&apos;{" "}
          <a
            href="/privacy"
            target="_blank"
            className="text-accent font-semibold underline underline-offset-2 hover:text-accent-hover transition-colors"
          >
            Privacy Policy
          </a>{" "}
          and the Uganda Data Protection and Privacy Act (PDPA) 2019. <span className="text-accent">*</span>
        </label>
      </div>
      {errors.consent && (
        <p id="consent-error" role="alert" className="text-sm text-red-500 font-medium">{errors.consent.message}</p>
      )}

      {/* Error message */}
      {err && (
        <div className="rounded-xl border border-red-400/30 bg-red-50 p-4 text-sm text-red-600 font-medium" role="alert">
          {err}
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </span>
        ) : (
          "Send Enquiry"
        )}
      </Button>
    </form>
  );
}
