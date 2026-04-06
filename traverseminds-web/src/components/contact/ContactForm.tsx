"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CheckCircle2, Loader2, ChevronRight } from "lucide-react";

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
];

const useCaseOptions = [
  { value: "journalist", label: "Journalist" },
  { value: "lawyer", label: "Lawyer" },
  { value: "researcher", label: "Researcher" },
  { value: "government", label: "Government" },
  { value: "other", label: "Other" },
];

const inputClasses = (hasError?: boolean) => cn(
  "h-12 w-full border-b bg-transparent px-0 text-base outline-none transition-all duration-300 placeholder:text-black/20 focus:border-accent",
  hasError ? "border-red-500" : "border-black/10"
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
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Error");
      setDone(true);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed.");
    }
  };

  if (done)
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald/10 text-emerald mb-6">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="font-display text-2xl font-bold text-black mb-2">Message Sent</h3>
        <p className="text-black/60">We will respond within 1 business day.</p>
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10" noValidate>
      <div className="absolute -left-full opacity-0 overflow-hidden h-0 w-0" aria-hidden>
        <input tabIndex={-1} autoComplete="off" {...register("honeypot")} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Full Name</label>
          <input
            type="text"
            className={inputClasses(!!errors.name)}
            placeholder="Jane Doe"
            {...register("name", { required: "Name required" })}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Organisation</label>
          <input
            type="text"
            className={inputClasses(!!errors.organisation)}
            placeholder="Company Name"
            {...register("organisation", { required: "Organisation required" })}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Email Address</label>
          <input
            type="email"
            className={inputClasses(!!errors.email)}
            placeholder="jane@organization.com"
            {...register("email", { 
              required: "Email required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" }
            })}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Division</label>
          <select
            className={inputClasses(!!errors.division)}
            {...register("division", { required: "Select division" })}
          >
            <option value="">Select division...</option>
            {divisionOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedDivision === "security" && (
        <div className="space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Budget Range</label>
          <select
            className={inputClasses(!!errors.budgetRange)}
            {...register("budgetRange", { required: "Select budget" })}
          >
            <option value="">Select budget range...</option>
            {budgetRangeOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      )}

      {selectedDivision === "public-record" && (
        <div className="space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Use Case</label>
          <select
            className={inputClasses(!!errors.useCase)}
            {...register("useCase", { required: "Select use case" })}
          >
            <option value="">How will you use the data?</option>
            {useCaseOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Message</label>
        <textarea
          rows={1}
          className={cn(inputClasses(!!errors.message), "h-auto py-3 resize-none min-h-[48px]")}
          placeholder="Tell us about your needs..."
          {...register("message", { required: "Message required" })}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = `${target.scrollHeight}px`;
          }}
        />
      </div>

      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          id="consent"
          className="mt-1 h-4 w-4 rounded border-black/10 accent-accent"
          {...register("consent", { required: true })}
        />
        <label htmlFor="consent" className="text-[10px] text-black/40 uppercase tracking-widest leading-relaxed">
          I consent to processing of my data in accordance with the 
          <a href="/privacy" className="text-accent font-bold hover:underline ml-1">Privacy Policy</a>.
        </label>
      </div>

      {err && <p className="text-xs font-bold text-red-500 uppercase tracking-widest">{err}</p>}

      <Button
        type="submit"
        variant="primary"
        className="w-full group py-6 h-auto text-sm"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <span className="flex items-center justify-center gap-2">
            Send Enquiry
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        )}
      </Button>
    </form>
  );
}
