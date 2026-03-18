"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

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
  { value: "public-record", label: "Public Record EA" },
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
    "h-12 w-full rounded-lg border bg-white px-4 text-base text-brand-charcoal outline-none transition-all placeholder:text-brand-muted focus:border-brand-teal focus:ring-1 focus:ring-brand-teal",
    err ? "border-red-500" : "border-light-border"
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
      <div className="flex flex-col items-center rounded-xl border border-light-border bg-light-card px-6 py-16 text-center">
        <CheckCircle2 className="h-12 w-12 text-brand-teal" />
        <h3 className="mt-4 font-display text-2xl text-brand-charcoal">
          Message Sent
        </h3>
        <p className="mt-2 max-w-md text-brand-medium">
          We will respond within 1 business day.
        </p>
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot - hidden from real users, traps bots */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden>
        <input
          tabIndex={-1}
          autoComplete="off"
          {...register("honeypot")}
        />
      </div>

      {/* Full Name */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-charcoal">
          Full Name *
        </label>
        <input
          type="text"
          autoComplete="name"
          className={inp(!!errors.name)}
          {...register("name", { required: "Full name is required" })}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Organisation */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-charcoal">
          Organisation *
        </label>
        <input
          type="text"
          autoComplete="organization"
          className={inp(!!errors.organisation)}
          {...register("organisation", {
            required: "Organisation is required",
          })}
        />
        {errors.organisation && (
          <p className="mt-1 text-sm text-red-600">
            {errors.organisation.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-charcoal">
          Email *
        </label>
        <input
          type="email"
          autoComplete="email"
          className={inp(!!errors.email)}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-charcoal">
          Phone{" "}
          <span className="text-brand-muted">(optional)</span>
        </label>
        <input
          type="tel"
          autoComplete="tel"
          className={inp(false)}
          {...register("phone")}
        />
      </div>

      {/* Division Selector */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-charcoal">
          Division *
        </label>
        <select
          className={inp(!!errors.division)}
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
          <p className="mt-1 text-sm text-red-600">
            {errors.division.message}
          </p>
        )}
      </div>

      {/* Conditional: Security - Budget Range */}
      {selectedDivision === "security" && (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-charcoal">
            Budget Range *
          </label>
          <select
            className={inp(!!errors.budgetRange)}
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
            <p className="mt-1 text-sm text-red-600">
              {errors.budgetRange.message}
            </p>
          )}
        </div>
      )}

      {/* Conditional: Public Record EA - Use Case */}
      {selectedDivision === "public-record" && (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-charcoal">
            Use Case *
          </label>
          <select
            className={inp(!!errors.useCase)}
            {...register("useCase", {
              required:
                selectedDivision === "public-record"
                  ? "Please select your use case"
                  : false,
            })}
          >
            <option value="">How will you use Public Record EA?</option>
            {useCaseOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {errors.useCase && (
            <p className="mt-1 text-sm text-red-600">
              {errors.useCase.message}
            </p>
          )}
        </div>
      )}

      {/* Message */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-charcoal">
          Message *
        </label>
        <textarea
          rows={4}
          className={cn(inp(!!errors.message), "h-auto py-3")}
          {...register("message", {
            required: "Message is required",
            minLength: {
              value: 20,
              message: "Please provide at least 20 characters",
            },
          })}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* How did you hear about us */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-charcoal">
          How did you hear about us?{" "}
          <span className="text-brand-muted">(optional)</span>
        </label>
        <select className={inp(false)} {...register("howHeard")}>
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
          className="mt-1 h-5 w-5 shrink-0 rounded accent-brand-green"
          {...register("consent", {
            required: "You must agree to the privacy policy to proceed",
          })}
        />
        <label htmlFor="consent" className="text-sm text-brand-medium">
          I consent to the collection and processing of my personal data in
          accordance with Traverse Minds&apos;{" "}
          <a
            href="/privacy"
            target="_blank"
            className="text-brand-teal underline"
          >
            Privacy Policy
          </a>{" "}
          and the Uganda Data Protection and Privacy Act (PDPA) 2019. *
        </label>
      </div>
      {errors.consent && (
        <p className="text-sm text-red-600">{errors.consent.message}</p>
      )}

      {/* Error message */}
      {err && (
        <div className="rounded-lg border border-red-500/30 bg-red-50 p-3 text-sm text-red-600">
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
        {isSubmitting ? "Sending..." : "Send Enquiry"}
      </Button>
    </form>
  );
}
