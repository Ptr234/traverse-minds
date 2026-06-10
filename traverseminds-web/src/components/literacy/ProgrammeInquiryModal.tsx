"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { X, CheckCircle2, ArrowRight, Loader2, Mail, Shield, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  phone?: string;
  programme: string;
  message: string;
  consent: boolean;
  honeypot?: string;
}

const inputCls = (err?: boolean) =>
  cn(
    "h-12 w-full border bg-white px-4 text-sm text-black outline-none placeholder:text-black/25 transition-colors",
    err ? "border-red-400 focus:border-red-400" : "border-black/10 focus:border-black/30"
  );

interface Props {
  open: boolean;
  onClose: () => void;
  programmeTitle: string;
  audience: string;
}

export function ProgrammeInquiryModal({ open, onClose, programmeTitle, audience }: Props) {
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
    
    const submissionData = {
      ...data,
      subject: `Programme Inquiry: ${programmeTitle}`,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
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

  const getAudienceLabel = () => {
    switch (audience) {
      case "students": return "school";
      case "business": return "organisation";
      case "government": return "department";
      default: return "team";
    }
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-lg overflow-hidden bg-white shadow-2xl pointer-events-auto"
              style={{ borderRadius: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute right-6 top-6 z-10 p-2 text-black/20 hover:text-black transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-8 sm:p-10">
                {done ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center bg-emerald-50 text-emerald-600 rounded-full">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-primary">Inquiry Sent!</h3>
                    <p className="mt-4 text-brand-medium">
                      Thank you for your interest in <strong>{programmeTitle}</strong>. 
                      Our team will contact you shortly to discuss securing your {getAudienceLabel()}.
                    </p>
                    <Button onClick={onClose} variant="primary" className="mt-8">
                      Back to Page
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="h-px w-8 bg-accent" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Enquiry</span>
                      </div>
                      <h2 className="font-display text-3xl font-bold text-primary leading-tight">
                        Ready to secure your {getAudienceLabel()}?
                      </h2>
                      <p className="mt-2 text-brand-medium">
                        Fill in your details below and we&apos;ll get back to you with more information about <strong>{programmeTitle}</strong>.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="sr-only" aria-hidden="true">
                        <input tabIndex={-1} autoComplete="off" {...register("honeypot")} />
                      </div>

                      <input type="hidden" value={programmeTitle} {...register("programme")} />

                      <div>
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-black/40">Full Name</label>
                        <input
                          type="text"
                          placeholder="Your Name"
                          className={inputCls(!!errors.name)}
                          style={{ borderRadius: 12 }}
                          {...register("name", { required: "Name is required" })}
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-black/40">Work Email</label>
                        <input
                          type="email"
                          placeholder="email@organisation.com"
                          className={inputCls(!!errors.email)}
                          style={{ borderRadius: 12 }}
                          {...register("email", { 
                            required: "Email is required",
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" }
                          })}
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-black/40">Message (Optional)</label>
                        <textarea
                          rows={3}
                          placeholder="Any specific questions or requirements?"
                          className={cn(inputCls(false), "h-auto py-3")}
                          style={{ borderRadius: 12 }}
                          {...register("message")}
                        />
                      </div>

                      <div className="flex items-start gap-3 pt-2">
                        <input
                          id="inquiry-consent"
                          type="checkbox"
                          className="mt-1 h-4 w-4 shrink-0 accent-accent"
                          {...register("consent", { required: true })}
                        />
                        <label htmlFor="inquiry-consent" className="text-[11px] leading-relaxed text-black/50">
                          I agree to the processing of my data to receive information about this programme.
                        </label>
                      </div>

                      {serverErr && (
                        <p className="text-xs text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">{serverErr}</p>
                      )}

                      <div className="pt-4">
                        <Button 
                          type="submit" 
                          variant="accent" 
                          size="lg" 
                          className="w-full justify-between group"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2 mx-auto"><Loader2 className="h-4 w-4 animate-spin" /> Sending...</span>
                          ) : (
                            <>
                              <span>Enquire Now</span>
                              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </>
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
