"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface ContactFormData {
  name: string; organisation: string; email: string; phone?: string;
  division: string; message: string; howHeard?: string; consent: boolean; honeypot?: string;
}

const divisionOptions = [
  { value: "security", label: "Traverse Security" },
  { value: "events", label: "Traverse Events" },
  { value: "general", label: "General Enquiry" },
];

const howHeardOptions = ["Google Search", "LinkedIn", "WhatsApp", "Referral", "Event", "Other"];

const inp = (err: boolean) => cn(
  "h-12 w-full rounded-lg border bg-white px-4 text-base text-brand-charcoal outline-none transition-all placeholder:text-brand-muted focus:border-brand-teal focus:ring-1 focus:ring-brand-teal",
  err ? "border-red-500" : "border-light-border"
);

export function ContactForm() {
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    if (data.honeypot) return;
    setErr("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, organisation: data.organisation, email: data.email, phone: data.phone, division: data.division, message: data.message, serviceType: data.division }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Error");
      setDone(true);
    } catch (e) { setErr(e instanceof Error ? e.message : "Failed."); }
  };

  if (done) return (
    <div className="flex flex-col items-center rounded-xl border border-light-border bg-light-card px-6 py-16 text-center">
      <CheckCircle2 className="h-12 w-12 text-brand-teal" />
      <h3 className="mt-4 font-display text-2xl text-brand-charcoal">Message Sent</h3>
      <p className="mt-2 max-w-md text-brand-medium">We will respond within 1 business day.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="absolute -left-[9999px] opacity-0" aria-hidden><input tabIndex={-1} autoComplete="off" {...register("honeypot")} /></div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-charcoal">Full Name *</label>
        <input type="text" autoComplete="name" className={inp(!!errors.name)} {...register("name", { required: "Required" })} />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-charcoal">Organisation *</label>
        <input type="text" autoComplete="organization" className={inp(!!errors.organisation)} {...register("organisation", { required: "Required" })} />
        {errors.organisation && <p className="mt-1 text-sm text-red-600">{errors.organisation.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-charcoal">Email *</label>
        <input type="email" autoComplete="email" className={inp(!!errors.email)} {...register("email", { required: "Required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid" } })} />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-charcoal">Phone <span className="text-brand-muted">(optional)</span></label>
        <input type="tel" autoComplete="tel" className={inp(false)} {...register("phone")} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-charcoal">Division *</label>
        <select className={inp(!!errors.division)} {...register("division", { required: "Required" })}>
          <option value="">Select...</option>
          {divisionOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        {errors.division && <p className="mt-1 text-sm text-red-600">{errors.division.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-charcoal">Message *</label>
        <textarea rows={4} className={cn(inp(!!errors.message), "h-auto py-3")} {...register("message", { required: "Required", minLength: { value: 20, message: "20+ characters" } })} />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-charcoal">How did you hear about us? <span className="text-brand-muted">(optional)</span></label>
        <select className={inp(false)} {...register("howHeard")}><option value="">Select...</option>{howHeardOptions.map((o) => <option key={o} value={o}>{o}</option>)}</select>
      </div>

      <div className="flex items-start gap-3">
        <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 rounded accent-brand-green" {...register("consent", { required: "Required" })} />
        <label className="text-sm text-brand-medium">
          I agree to Traverse Minds&apos; <a href="/privacy" target="_blank" className="text-brand-teal underline">Privacy Policy</a> and Uganda PDPA 2019. *
        </label>
      </div>
      {errors.consent && <p className="text-sm text-red-600">{errors.consent.message}</p>}
      {err && <div className="rounded-lg border border-red-500/30 bg-red-50 p-3 text-sm text-red-600">{err}</div>}

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Enquiry"}
      </Button>
    </form>
  );
}
