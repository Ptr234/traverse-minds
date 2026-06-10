"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { X, CheckCircle2, ArrowRight, Loader2, Users, ShieldCheck, Trophy, Headphones } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  organisation: string;
  email: string;
  phone?: string;
  teamSize: string;
  sector: string;
  deliveryFormat: string;
  timeline?: string;
  message: string;
  consent: boolean;
  honeypot?: string;
}

const teamSizes = ["10 – 50", "51 – 100", "101 – 250", "251 – 500", "500+"];
const sectors = ["Government / Public Sector", "Corporate / SME", "School / University", "NGO / Civil Society", "Other"];
const formats = ["In-person", "Online", "Hybrid", "Custom On-site"];

const perks = [
  { icon: Users, text: "Tailored to your team size and sector" },
  { icon: ShieldCheck, text: "Uganda PDPA 2019 & East Africa compliance focus" },
  { icon: Trophy, text: "Certified instructors with field experience" },
  { icon: Headphones, text: "Dedicated account manager post-training" },
];

const inputCls = (err?: boolean) =>
  cn(
    "h-12 w-full border bg-white px-4 text-sm text-black outline-none placeholder:text-black/25 transition-colors",
    err ? "border-red-400 focus:border-red-400" : "border-black/10 focus:border-black/30"
  );

interface Props {
  open: boolean;
  onClose: () => void;
}

export function BulkTrainingModal({ open, onClose }: Props) {
  const [done, setDone] = useState(false);
  const [serverErr, setServerErr] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  useEffect(() => {
    if (open) {
      setDone(false);
      setServerErr("");
      reset();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open, reset]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onSubmit = async (data: FormData) => {
    if (data.honeypot) return;
    setServerErr("");
    try {
      const res = await fetch("/api/bulk-training-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Something went wrong.");
      }
      setDone(true);
    } catch (err) {
      setServerErr(err instanceof Error ? err.message : "Failed to submit.");
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-black"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative flex w-full max-w-3xl overflow-hidden bg-white"
              style={{ borderRadius: 20, maxHeight: "92vh", boxShadow: "0 32px 64px rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.1)" }}
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center text-white/50 transition-colors hover:text-white lg:text-black/30 lg:hover:text-black"
                style={{ borderRadius: 999 }}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Left panel */}
              <div
                className="hidden lg:flex lg:w-72 xl:w-80 shrink-0 flex-col justify-between p-8"
                style={{
                  background: "linear-gradient(160deg, #0a0a0a 0%, #212429 100%)",
                  borderRadius: "20px 0 0 20px",
                }}
              >
                <div>
                  <span
                    className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
                    style={{ background: "#ff4c00", borderRadius: 999 }}
                  >
                    Bulk Training
                  </span>
                  <h2 className="mt-5 font-display text-2xl font-bold leading-snug text-white">
                    Train your entire organisation.
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Get a custom quote for your team — any size, any sector, delivered your way.
                  </p>
                </div>

                <div className="space-y-5">
                  {perks.map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-start gap-3">
                      <div
                        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center"
                        style={{ background: "rgba(255,76,0,0.12)", borderRadius: 8 }}
                      >
                        <Icon className="h-4 w-4" style={{ color: "#ff4c00" }} />
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{text}</p>
                    </div>
                  ))}
                </div>

                <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>
                  We respond within 1 business day with a tailored proposal.
                </p>
              </div>

              {/* Right panel */}
              <div className="flex-1 overflow-y-auto">
                {done ? (
                  <div className="flex h-full flex-col items-center justify-center px-8 py-16 text-center">
                    <div
                      className="mb-5 flex h-16 w-16 items-center justify-center"
                      style={{ background: "rgba(16,185,129,0.1)", borderRadius: 999 }}
                    >
                      <CheckCircle2 className="h-8 w-8" style={{ color: "#10b981" }} />
                    </div>
                    <h3 className="font-display text-2xl font-bold" style={{ color: "#000" }}>
                      Quote request received.
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed" style={{ color: "#515459" }}>
                      We&apos;ve sent a confirmation to your inbox. A member of our training team will reach out within <strong>1 business day</strong> with a tailored proposal.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-8 text-sm font-semibold"
                      style={{ color: "#ff4c00" }}
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-6 py-8 md:px-8 space-y-5">
                    {/* Mobile header */}
                    <div className="lg:hidden mb-2">
                      <span
                        className="inline-block mb-3 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
                        style={{ background: "#ff4c00", borderRadius: 999 }}
                      >
                        Bulk Training
                      </span>
                      <h2 className="font-display text-xl font-bold" style={{ color: "#000" }}>Request a Bulk Training Quote</h2>
                      <p className="mt-1 text-sm" style={{ color: "#515459" }}>We&apos;ll send a tailored proposal within 1 business day.</p>
                    </div>

                    {/* Honeypot */}
                    <div className="sr-only" aria-hidden="true">
                      <input tabIndex={-1} autoComplete="off" {...register("honeypot")} />
                    </div>

                    {/* Name + Organisation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "#000" }}>Full Name *</label>
                        <input
                          type="text"
                          autoComplete="name"
                          placeholder="Jane Nakato"
                          className={inputCls(!!errors.name)}
                          style={{ borderRadius: 8 }}
                          {...register("name", { required: "Required", minLength: { value: 2, message: "Required" } })}
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "#000" }}>Organisation *</label>
                        <input
                          type="text"
                          autoComplete="organization"
                          placeholder="Ministry / Company name"
                          className={inputCls(!!errors.organisation)}
                          style={{ borderRadius: 8 }}
                          {...register("organisation", { required: "Required" })}
                        />
                        {errors.organisation && <p className="mt-1 text-xs text-red-500">{errors.organisation.message}</p>}
                      </div>
                    </div>

                    {/* Email + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "#000" }}>Work Email *</label>
                        <input
                          type="email"
                          autoComplete="email"
                          placeholder="jane@organisation.com"
                          className={inputCls(!!errors.email)}
                          style={{ borderRadius: 8 }}
                          {...register("email", {
                            required: "Required",
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
                          })}
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "#515459" }}>
                          Phone <span className="normal-case font-normal">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          autoComplete="tel"
                          placeholder="+256 700 000 000"
                          className={inputCls(false)}
                          style={{ borderRadius: 8 }}
                          {...register("phone")}
                        />
                      </div>
                    </div>

                    {/* Team size + Sector */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "#000" }}>Team Size *</label>
                        <select
                          className={inputCls(!!errors.teamSize)}
                          style={{ borderRadius: 8 }}
                          {...register("teamSize", { required: "Required" })}
                        >
                          <option value="">Select size...</option>
                          {teamSizes.map((s) => <option key={s} value={s}>{s} participants</option>)}
                        </select>
                        {errors.teamSize && <p className="mt-1 text-xs text-red-500">{errors.teamSize.message}</p>}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "#000" }}>Sector *</label>
                        <select
                          className={inputCls(!!errors.sector)}
                          style={{ borderRadius: 8 }}
                          {...register("sector", { required: "Required" })}
                        >
                          <option value="">Select sector...</option>
                          {sectors.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.sector && <p className="mt-1 text-xs text-red-500">{errors.sector.message}</p>}
                      </div>
                    </div>

                    {/* Delivery format */}
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider" style={{ color: "#000" }}>Preferred Delivery Format *</label>
                      <div className="flex flex-wrap gap-2">
                        {formats.map((f) => (
                          <label
                            key={f}
                            className="relative flex cursor-pointer items-center gap-2 border px-4 py-2 text-sm font-medium transition-colors"
                            style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)" }}
                          >
                            <input
                              type="radio"
                              value={f}
                              className="sr-only peer"
                              {...register("deliveryFormat", { required: "Select a format" })}
                            />
                            <span className="peer-checked:text-accent transition-colors">{f}</span>
                            <div className="absolute inset-0 border border-accent opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" style={{ borderRadius: 8 }} />
                          </label>
                        ))}
                      </div>
                      {errors.deliveryFormat && <p className="mt-1 text-xs text-red-500">{errors.deliveryFormat.message}</p>}
                    </div>

                    {/* Timeline */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "#515459" }}>
                        Preferred Timeline <span className="normal-case font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Q3 2025, within 3 months, flexible..."
                        className={inputCls(false)}
                        style={{ borderRadius: 8 }}
                        {...register("timeline")}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "#000" }}>Specific Needs / Additional Notes *</label>
                      <textarea
                        rows={3}
                        placeholder="Describe your training goals, any specific threats your team faces, languages needed, etc."
                        className={cn(inputCls(!!errors.message), "h-auto py-3")}
                        style={{ borderRadius: 8 }}
                        {...register("message", { required: "Required", minLength: { value: 10, message: "Please add more detail" } })}
                      />
                      {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
                    </div>

                    {/* Consent */}
                    <div className="flex items-start gap-3 pt-1">
                      <input
                        id="bulk-consent"
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
                        {...register("consent", { required: "Required" })}
                      />
                      <label htmlFor="bulk-consent" className="text-xs leading-relaxed" style={{ color: "#515459" }}>
                        I agree to Traverse Minds Africa&apos;s{" "}
                        <a href="/privacy" target="_blank" className="text-accent underline underline-offset-2">Privacy Policy</a>{" "}
                        and the processing of my details for this quote request. *
                      </label>
                    </div>
                    {errors.consent && <p className="text-xs text-red-500">{errors.consent.message}</p>}

                    {serverErr && (
                      <div className="border border-red-200 bg-red-50 p-3 text-sm text-red-600" style={{ borderRadius: 8 }}>
                        {serverErr}
                      </div>
                    )}

                    <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Submitting&hellip;</>
                      ) : (
                        <>Request Quote <ArrowRight className="h-4 w-4" /></>
                      )}
                    </Button>

                    <p className="text-center text-[10px]" style={{ color: "rgba(0,0,0,0.3)" }}>
                      No commitment required &middot; We respond within 1 business day &middot; Uganda PDPA 2019 compliant
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
