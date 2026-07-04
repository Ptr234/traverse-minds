"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  school: string;
  ageGroup: "14-16" | "17-18" | "19-21" | "22-25";
  motivation: string;
  consent: boolean;
  honeypot?: string;
}

const inp = (err: boolean) =>
  cn(
    "h-12 w-full rounded-lg border bg-white px-4 text-base text-brand-charcoal outline-none transition-all placeholder:text-brand-muted focus:border-brand-teal focus:ring-1 focus:ring-brand-teal",
    err ? "border-red-500" : "border-light-border"
  );

export function StudentRegistrationForm() {
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormData>();

  const onSubmit = async (data: StudentFormData) => {
    if (data.honeypot) return;
    setErr("");
    try {
      const res = await fetch("/api/accuracy-mentorship/student-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          school: data.school,
          ageGroup: data.ageGroup,
          motivation: data.motivation,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Error");
      setDone(true);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Registration failed. Please try again.");
    }
  };

  if (done)
    return (
      <div className="flex flex-col items-center rounded-xl border border-light-border bg-light-card px-6 py-12 text-center">
        <CheckCircle2 className="h-12 w-12 text-brand-teal" />
        <h3 className="mt-4 font-display text-2xl text-brand-charcoal">
          Registration Received!
        </h3>
        <p className="mt-2 max-w-md text-brand-medium">
          Thank you for your interest. We'll review your application and contact you within 5 business days.
        </p>
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="absolute -left-full overflow-hidden h-0 w-0 opacity-0" aria-hidden>
        <input tabIndex={-1} autoComplete="off" {...register("honeypot")} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-charcoal">
            First Name *
          </label>
          <input
            type="text"
            autoComplete="given-name"
            className={inp(!!errors.firstName)}
            {...register("firstName", { required: "Required" })}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-charcoal">
            Last Name *
          </label>
          <input
            type="text"
            autoComplete="family-name"
            className={inp(!!errors.lastName)}
            {...register("lastName", { required: "Required" })}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-charcoal">
          Email *
        </label>
        <input
          type="email"
          autoComplete="email"
          className={inp(!!errors.email)}
          {...register("email", {
            required: "Required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email",
            },
          })}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-charcoal">
          Phone Number *
        </label>
        <input
          type="tel"
          autoComplete="tel"
          className={inp(!!errors.phone)}
          {...register("phone", { required: "Required" })}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-charcoal">
          School/Institution *
        </label>
        <input
          type="text"
          className={inp(!!errors.school)}
          {...register("school", { required: "Required" })}
        />
        {errors.school && (
          <p className="mt-1 text-sm text-red-600">{errors.school.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-charcoal">
          Age Group *
        </label>
        <select
          className={cn(
            inp(!!errors.ageGroup),
            "appearance-none bg-white cursor-pointer"
          )}
          {...register("ageGroup", { required: "Required" })}
        >
          <option value="">Select your age group</option>
          <option value="14-16">14-16 years</option>
          <option value="17-18">17-18 years</option>
          <option value="19-21">19-21 years</option>
          <option value="22-25">22-25 years</option>
        </select>
        {errors.ageGroup && (
          <p className="mt-1 text-sm text-red-600">
            {errors.ageGroup.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-charcoal">
          Tell us why you're interested in this program *
        </label>
        <textarea
          rows={4}
          className={cn(
            inp(!!errors.motivation),
            "resize-none py-3"
          )}
          {...register("motivation", {
            required: "Required",
            minLength: {
              value: 20,
              message: "Please provide at least 20 characters",
            },
          })}
        />
        {errors.motivation && (
          <p className="mt-1 text-sm text-red-600">
            {errors.motivation.message}
          </p>
        )}
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          className="mt-1 h-5 w-5 shrink-0 rounded accent-brand-green"
          {...register("consent", { required: "Required" })}
        />
        <label className="text-sm text-brand-medium">
          I agree to Traverse Minds Africa's{" "}
          <a
            href="/privacy"
            target="_blank"
            className="text-brand-teal underline"
          >
            Privacy Policy
          </a>
          . *
        </label>
      </div>
      {errors.consent && (
        <p className="text-sm text-red-600">{errors.consent.message}</p>
      )}
      {err && (
        <div className="rounded-lg border border-red-500/30 bg-red-50 p-3 text-sm text-red-600">
          {err}
        </div>
      )}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Registering..." : "Apply Now"}
      </Button>
    </form>
  );
}
