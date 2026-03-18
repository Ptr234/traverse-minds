"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

const waitlistSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  organisation: z.string().optional(),
  persona: z.string().min(1, "Please select your primary role"),
  countryInterest: z.array(z.string()).min(1, "Select at least one country"),
  message: z.string().optional(),
});

type WaitlistValues = z.infer<typeof waitlistSchema>;

const personas = [
  { label: "Legal Professional", value: "legal" },
  { label: "Researcher / Academic", value: "researcher" },
  { label: "Journalist", value: "journalist" },
  { label: "Policy Maker", value: "policy" },
  { label: "Business Intelligence", value: "business" },
  { label: "Other", value: "other" },
];

const countries = [
  { label: "Uganda", value: "uganda" },
  { label: "Kenya", value: "kenya" },
  { label: "Tanzania", value: "tanzania" },
  { label: "Rwanda", value: "rwanda" },
  { label: "Burundi", value: "burundi" },
];

export function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitlistValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      countryInterest: [],
    },
  });

  const onSubmit = async (data: WaitlistValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit");
      
      setStatus("success");
      reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-xl border border-light-border">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle className="h-10 w-10" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-bold text-brand-green">You&apos;re on the list!</h3>
        <p className="mt-4 text-brand-medium">
          Thank you for your interest in Public Record EA. We&apos;ll notify you 
          as soon as we&apos;re ready for your early access.
        </p>
        <Button 
          variant="outline" 
          className="mt-8"
          onClick={() => setStatus("idle")}
        >
          Back to site
        </Button>
      </div>
    );
  }

  return (
    <section id="waitlist" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-brand-green md:text-4xl">
              Join the <span className="text-brand-amber">Private Beta</span>
            </h2>
            <p className="mt-4 text-brand-medium">
              We are onboarding users in small batches to ensure the highest 
              quality of service. Reserve your spot today.
            </p>
          </div>

          <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="mt-12 space-y-6 rounded-2xl border border-light-border bg-brand-offwhite p-6 md:p-10"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-green">Full Name *</label>
                <input
                  {...register("name")}
                  className="w-full rounded-lg border border-light-border bg-white px-4 py-3 text-sm focus:border-brand-teal focus:outline-none"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-green">Email Address *</label>
                <input
                  {...register("email")}
                  className="w-full rounded-lg border border-light-border bg-white px-4 py-3 text-sm focus:border-brand-teal focus:outline-none"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-green">Organisation (Optional)</label>
                <input
                  {...register("organisation")}
                  className="w-full rounded-lg border border-light-border bg-white px-4 py-3 text-sm focus:border-brand-teal focus:outline-none"
                  placeholder="e.g. Acme Law"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-green">Your Primary Role *</label>
                <select
                  {...register("persona")}
                  className="w-full rounded-lg border border-light-border bg-white px-4 py-3 text-sm focus:border-brand-teal focus:outline-none"
                >
                  <option value="">Select a role</option>
                  {personas.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
                {errors.persona && <p className="text-xs text-red-500">{errors.persona.message}</p>}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-brand-green">Country Interest (Select all that apply) *</label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {countries.map(c => (
                  <label key={c.value} className="flex items-center gap-2 rounded-lg border border-light-border bg-white p-3 cursor-pointer hover:bg-brand-offwhite transition-colors">
                    <input
                      type="checkbox"
                      value={c.value}
                      {...register("countryInterest")}
                      className="h-4 w-4 rounded border-light-border text-brand-teal focus:ring-brand-teal"
                    />
                    <span className="text-sm text-brand-medium">{c.label}</span>
                  </label>
                ))}
              </div>
              {errors.countryInterest && <p className="text-xs text-red-500">{errors.countryInterest.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-green">Specific Research Needs (Optional)</label>
              <textarea
                {...register("message")}
                rows={4}
                className="w-full rounded-lg border border-light-border bg-white px-4 py-3 text-sm focus:border-brand-teal focus:outline-none"
                placeholder="What specific types of records are you interested in?"
              />
            </div>

            <p className="text-xs text-brand-muted">
              By joining the waitlist, you agree to our Privacy Policy and consent 
              to receive updates about Public Record EA. We respect your data in 
              accordance with Uganda PDPA 2019.
            </p>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Request Early Access"
              )}
            </Button>
            
            {status === "error" && (
              <p className="text-center text-sm font-medium text-red-500">
                Something went wrong. Please try again or contact hello@traverseminds.ug
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
