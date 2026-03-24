"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";

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
      <div className="bg-white p-8 text-center border" style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1), 0 2px 2px 0 rgba(0,0,0,0.15), 0 1px 0 0 rgba(0,0,0,0.05)" }}>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle className="h-10 w-10" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-bold" style={{ color: "#000" }}>You&apos;re on the list!</h3>
        <p className="mt-4" style={{ color: "#515459" }}>
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
    <section id="waitlist" style={{ background: "#ffffff", paddingTop: 56, paddingBottom: 56 }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal variant="fade-blur" className="mx-auto max-w-3xl">
          <div className="text-center">
            <TextReveal variant="slide-up" className="font-display text-3xl font-bold md:text-4xl" style={{ color: "#000" }}>
              Join the Private Beta
            </TextReveal>
            <p className="mt-4" style={{ color: "#515459" }}>
              We are onboarding users in small batches to ensure the highest
              quality of service. Reserve your spot today.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-12 space-y-6 border p-6 md:p-10"
            style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", background: "#f0f1f4" }}
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-bold" style={{ color: "#000" }}>Full Name *</label>
                <input
                  type="text"
                  autoComplete="name"
                  {...register("name")}
                  className="h-12 w-full border bg-white px-4 text-base outline-none"
                  style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", color: "#000", transition: "border-color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold" style={{ color: "#000" }}>Email Address *</label>
                <input
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  className="h-12 w-full border bg-white px-4 text-base outline-none"
                  style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", color: "#000", transition: "border-color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-bold" style={{ color: "#000" }}>Organisation (Optional)</label>
                <input
                  type="text"
                  autoComplete="organization"
                  {...register("organisation")}
                  className="h-12 w-full border bg-white px-4 text-base outline-none"
                  style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", color: "#000", transition: "border-color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                  placeholder="e.g. Acme Law"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold" style={{ color: "#000" }}>Your Primary Role *</label>
                <select
                  {...register("persona")}
                  className="h-12 w-full border bg-white px-4 text-base outline-none"
                  style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", color: "#000", transition: "border-color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                >
                  <option value="">Select a role</option>
                  {personas.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
                {errors.persona && <p className="text-xs text-red-500">{errors.persona.message}</p>}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold" style={{ color: "#000" }}>Country Interest (Select all that apply) *</label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {countries.map(c => (
                  <label key={c.value} className="flex min-h-11 items-center gap-2 border bg-white p-3 cursor-pointer" style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", transition: "background 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
                    <input
                      type="checkbox"
                      value={c.value}
                      {...register("countryInterest")}
                      className="h-5 w-5 rounded accent-accent"
                    />
                    <span className="text-base" style={{ color: "#313439" }}>{c.label}</span>
                  </label>
                ))}
              </div>
              {errors.countryInterest && <p className="text-xs text-red-500">{errors.countryInterest.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold" style={{ color: "#000" }}>Specific Research Needs (Optional)</label>
              <textarea
                {...register("message")}
                rows={4}
                className="w-full border bg-white px-4 py-3 text-base outline-none"
                style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", color: "#000", transition: "border-color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                placeholder="What specific types of records are you interested in?"
              />
            </div>

            <p className="text-xs" style={{ color: "#919499" }}>
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
        </SectionReveal>
      </div>
    </section>
  );
}
