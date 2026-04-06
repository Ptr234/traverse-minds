"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionReveal } from "@/components/ui/SectionReveal";
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
  "h-12 w-full border-b bg-transparent px-0 text-base outline-none transition-all duration-300 placeholder:text-black/20 focus:border-accent",
  hasError ? "border-red-500" : "border-black/10"
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
      <section className="py-24 bg-white">
        <div className="container-max max-w-xl mx-auto px-6 text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald/10 text-emerald mb-8">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h3 className="font-display text-3xl font-bold text-black mb-4">You&apos;re on the list</h3>
          <p className="text-black/60 mb-10 leading-relaxed">
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
    <section id="waitlist" className="py-24 bg-[#fafbfc] border-t border-black/5">
      <div className="container-max max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          <div className="lg:col-span-2">
            <TextReveal variant="blur-in" className="font-display text-4xl font-bold leading-tight text-black mb-6">
              Get priority <span className="text-accent">early access</span>
            </TextReveal>
            <p className="text-black/60 leading-relaxed mb-8">
              Join the private beta. We are onboarding users in small batches to ensure high data integrity and specialized support.
            </p>
            <div className="space-y-4">
              {["Cross-border search", "AI Case Summaries", "Real-time alerts"].map(item => (
                <div key={item} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-black/40">
                  <div className="h-1 w-4 bg-accent" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 md:p-12 shadow-2xl shadow-black/5 border border-black/5 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Full Name</label>
                  <input
                    type="text"
                    {...register("name")}
                    className={inputClasses(!!errors.name)}
                    placeholder="Jane Doe"
                  />
                  {errors.name && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase">{errors.name.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Work Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    className={inputClasses(!!errors.email)}
                    placeholder="jane@organization.com"
                  />
                  {errors.email && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Organisation</label>
                  <input
                    type="text"
                    {...register("organisation")}
                    className={inputClasses()}
                    placeholder="e.g. Acme Legal"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Primary Role</label>
                  <select
                    {...register("persona")}
                    className={inputClasses(!!errors.persona)}
                  >
                    <option value="">Select role...</option>
                    {personas.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                  {errors.persona && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase">{errors.persona.message}</p>}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 block">Jurisdictions of Interest</label>
                <div className="flex flex-wrap gap-2">
                  {countries.map(c => (
                    <label 
                      key={c.value} 
                      className={cn(
                        "group relative px-4 py-2 border transition-all cursor-pointer rounded-full text-xs font-bold",
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
                      <div className="absolute inset-0 border border-accent opacity-0 peer-checked:opacity-100 rounded-full transition-opacity pointer-events-none" />
                    </label>
                  ))}
                </div>
                {errors.countryInterest && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase">{errors.countryInterest.message}</p>}
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
                <p className="mt-6 text-[10px] leading-relaxed text-black/30 text-center uppercase tracking-widest">
                  Secure processing in accordance with Uganda PDPA 2019.
                </p>
              </div>

              {status === "error" && (
                <p className="text-center text-xs font-bold text-red-500 uppercase tracking-wider">
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
