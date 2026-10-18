"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/magazine/primitives";
import { TextReveal } from "@/components/ui/TextReveal";
import { cn } from "@/lib/utils";

const waitlistSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  organisation: z.string().optional(),
  persona: z.string().min(1, "Please select your primary role"),
  countryInterest: z.array(z.string()).min(1, "Select at least one country"),
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
  { label: "Nigeria", value: "nigeria" },
  { label: "South Africa", value: "south-africa" },
];

const inputClasses = (hasError?: boolean) => cn(
  "h-12 w-full border bg-white px-3.5 text-[15px] text-black outline-none placeholder:text-gn-500 focus:border-accent",
  hasError ? "border-red-700" : "border-black/15"
);

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
      <section className="bg-bg-light">
        <div className="container-max max-w-xl py-14 lg:py-20">
          <div className="mb-6 inline-flex text-emerald">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h3 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] text-black mb-4">You&apos;re on the list</h3>
          <p className="mb-8 text-[17px] leading-relaxed text-gn-400">
            Thank you for your interest. We&apos;ll reach out as soon as we open access for your cohort.
          </p>
          <Button
            variant="outline"
            onClick={() => setStatus("idle")}
          >
            Back to Public Record
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="scroll-mt-24 bg-bg-light">
      <div className="container-max py-14 lg:py-20">
        <SectionHeader title="Early access" />
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-2">
            <TextReveal variant="blur-in" className="mb-5 font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] text-black">
              Get priority <span className="text-accent">early access</span>
            </TextReveal>
            <p className="mb-8 text-[17px] leading-relaxed text-gn-400">
              Join the private beta. We are onboarding users in small batches to ensure high data integrity and specialized support.
            </p>
            <div className="space-y-4">
              {["Cross-border search", "AI Case Summaries", "Real-time alerts"].map(item => (
                <div key={item} className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-wider text-gn-300">
                  <div className="h-1.5 w-1.5 bg-accent" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 border border-black/10 bg-white p-6 lg:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <label className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-gn-300">Full Name</label>
                  <input
                    type="text"
                    {...register("name")}
                    className={inputClasses(!!errors.name)}
                    placeholder="Jane Doe"
                  />
                  {errors.name && <p className="mt-1 text-[13px] text-red-700">{errors.name.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-gn-300">Work Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    className={inputClasses(!!errors.email)}
                    placeholder="jane@organization.com"
                  />
                  {errors.email && <p className="mt-1 text-[13px] text-red-700">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <label className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-gn-300">Organisation</label>
                  <input
                    type="text"
                    {...register("organisation")}
                    className={inputClasses()}
                    placeholder="e.g. Acme Legal"
                  />
                </div>

                <div className="space-y-1">
                  <label className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-gn-300">Primary Role</label>
                  <select
                    {...register("persona")}
                    className={inputClasses(!!errors.persona)}
                  >
                    <option value="">Select role...</option>
                    {personas.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                  {errors.persona && <p className="mt-1 text-[13px] text-red-700">{errors.persona.message}</p>}
                </div>
              </div>

              <div className="space-y-4">
                <label className="block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-gn-300">Jurisdictions of Interest</label>
                <div className="flex flex-wrap gap-2">
                  {countries.map(c => (
                    <label 
                      key={c.value} 
                      className={cn(
                        "group relative cursor-pointer border px-4 py-2 font-mono text-[12px] uppercase tracking-wide transition-colors",
                        "hover:border-accent hover:bg-accent/5"
                      )}
                      style={{ 
                        borderColor: "rgba(0,0,0,0.1)",
                        backgroundColor: "transparent"
                      }}
                    >
                      <input
                        type="checkbox"
                        value={c.value}
                        {...register("countryInterest")}
                        className="sr-only peer"
                      />
                      <span className="peer-checked:text-accent transition-colors">{c.label}</span>
                      <div className="pointer-events-none absolute inset-0 border-2 border-accent opacity-0 transition-opacity peer-checked:opacity-100" />
                    </label>
                  ))}
                </div>
                {errors.countryInterest && <p className="mt-1 text-[13px] text-red-700">{errors.countryInterest.message}</p>}
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full group py-6 h-auto text-sm"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Join the Private Beta
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
                <p className="mt-4 text-[13px] leading-relaxed text-gn-400">
                  Your details are used only to contact you about Public Record access, under Uganda&apos;s Data Protection and Privacy Act, 2019.
                </p>
              </div>

              {status === "error" && (
                <p className="text-center text-xs font-bold text-red-700 uppercase tracking-wider">
                  Submission failed. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
