"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface RsvpFormData { name: string; email: string; organisation: string; dietary?: string; consent: boolean; honeypot?: string; }
interface RsvpFormProps { eventTitle: string; }

const inp = (err: boolean) => cn(
  "h-12 w-full rounded-lg border bg-white px-4 text-base text-brand-charcoal outline-none transition-all placeholder:text-brand-muted focus:border-brand-teal focus:ring-1 focus:ring-brand-teal",
  err ? "border-red-500" : "border-light-border"
);

export function RsvpForm({ eventTitle }: RsvpFormProps) {
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RsvpFormData>();

  const onSubmit = async (data: RsvpFormData) => {
    if (data.honeypot) return;
    setErr("");
    try {
      const res = await fetch("/api/rsvp", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, organisation: data.organisation, dietary: data.dietary, eventTitle }) });
      if (!res.ok) throw new Error((await res.json()).error || "Error");
      setDone(true);
    } catch (e) { setErr(e instanceof Error ? e.message : "Failed."); }
  };

  if (done) return (
    <div className="flex flex-col items-center rounded-xl border border-light-border bg-light-card px-6 py-12 text-center">
      <CheckCircle2 className="h-12 w-12 text-brand-teal" />
      <h3 className="mt-4 font-display text-2xl text-brand-charcoal">You&apos;re registered!</h3>
      <p className="mt-2 max-w-md text-brand-medium">Check your inbox for confirmation and calendar invite.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="absolute -left-[9999px] opacity-0" aria-hidden><input tabIndex={-1} autoComplete="off" {...register("honeypot")} /></div>
      <div><label className="mb-1.5 block text-sm font-medium text-brand-charcoal">Full Name *</label>
        <input type="text" autoComplete="name" className={inp(!!errors.name)} {...register("name", { required: "Required" })} />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}</div>
      <div><label className="mb-1.5 block text-sm font-medium text-brand-charcoal">Email *</label>
        <input type="email" autoComplete="email" className={inp(!!errors.email)} {...register("email", { required: "Required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid" } })} />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}</div>
      <div><label className="mb-1.5 block text-sm font-medium text-brand-charcoal">Organisation *</label>
        <input type="text" autoComplete="organization" className={inp(!!errors.organisation)} {...register("organisation", { required: "Required" })} />
        {errors.organisation && <p className="mt-1 text-sm text-red-600">{errors.organisation.message}</p>}</div>
      <div><label className="mb-1.5 block text-sm font-medium text-brand-charcoal">Dietary Requirements <span className="text-brand-muted">(optional)</span></label>
        <input type="text" placeholder="e.g. vegetarian, halal, none" className={inp(false)} {...register("dietary")} /></div>
      <div className="flex items-start gap-3">
        <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 rounded accent-brand-green" {...register("consent", { required: "Required" })} />
        <label className="text-sm text-brand-medium">I agree to Traverse Minds&apos; <a href="/privacy" target="_blank" className="text-brand-teal underline">Privacy Policy</a>. *</label>
      </div>
      {errors.consent && <p className="text-sm text-red-600">{errors.consent.message}</p>}
      {err && <div className="rounded-lg border border-red-500/30 bg-red-50 p-3 text-sm text-red-600">{err}</div>}
      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Registering..." : "Register Now"}</Button>
    </form>
  );
}
