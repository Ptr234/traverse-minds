"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Mail, CheckCircle2 } from "lucide-react";

interface NewsletterFormData {
  email: string;
}

export function NewsletterSignup() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>();

  const onSubmit = async (data: NewsletterFormData) => {
    setServerError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Something went wrong");
      }
      setIsSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Failed to subscribe.");
    }
  };

  return (
    <section className="bg-light-surface px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Mail className="mx-auto h-8 w-8 text-brand-amber" />
        <h2 className="mt-4 font-display text-2xl text-brand-green md:text-3xl">
          Stay informed on East African cybersecurity
        </h2>
        <p className="mt-3 text-brand-muted">
          Research, events, and policy updates — delivered to your inbox.
        </p>

        {isSubmitted ? (
          <div className="mt-8 flex flex-col items-center gap-2">
            <CheckCircle2 className="h-8 w-8 text-brand-teal" />
            <p className="text-lg font-semibold text-brand-charcoal">
              Check your inbox to confirm your subscription.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-center"
            noValidate
          >
            <div className="flex-1 sm:max-w-sm">
              <input
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className={cn(
                  "h-12 w-full rounded-lg border bg-white px-4 text-base text-brand-charcoal outline-none transition-all placeholder:text-brand-muted focus:border-brand-teal focus:ring-1 focus:ring-brand-teal",
                  errors.email ? "border-red-500" : "border-light-border"
                )}
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email" },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-left text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <Button type="submit" variant="primary" size="lg" className="shrink-0" disabled={isSubmitting}>
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        )}

        {serverError && <p className="mt-3 text-sm text-red-600">{serverError}</p>}

        <p className="mt-4 text-xs text-brand-muted">
          By subscribing you agree to our{" "}
          <a href="/privacy" className="underline hover:text-brand-amber">Privacy Policy</a>. PDPA 2019 compliant.
        </p>
      </div>
    </section>
  );
}
