"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  featured?: boolean;
}

interface Props {
  plan: PricingPlan | null;
  billing: "monthly" | "annual";
  onClose: () => void;
}

export function PricingModal({ plan, billing, onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (plan) {
      setName("");
      setEmail("");
      setStatus("idle");
      setErrorMsg("");
    }
  }, [plan]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    if (plan) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [plan]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!plan) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/pricing-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          planName: plan.name,
          planPrice: plan.price + plan.period,
          planFeatures: plan.features,
          billing,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {plan && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.215, 0.61, 0.355, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-md bg-white" style={{ borderRadius: 20, boxShadow: "0 32px 64px rgba(0,0,0,0.18), 0 8px 16px rgba(0,0,0,0.08)" }}>

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center text-black/30 transition-colors hover:text-black"
                style={{ borderRadius: 999 }}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              {status === "success" ? (
                <div className="px-8 py-12 text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center bg-emerald/10" style={{ borderRadius: 999 }}>
                    <CheckCircle2 className="h-8 w-8" style={{ color: "#10b981" }} />
                  </div>
                  <h3 className="font-display text-2xl font-bold" style={{ color: "#000" }}>
                    {plan.name === "Enterprise" ? "Request received." : "You're on the list."}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "#515459" }}>
                    {plan.name === "Enterprise"
                      ? `Our sales team will reach out to ${email} within 1 business day to discuss your requirements.`
                      : `We've sent the details to ${email}. We'll notify you as soon as early access opens for the ${plan.name} plan.`}
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
                <>
                  {/* Plan header */}
                  <div
                    className="px-8 pt-8 pb-6"
                    style={{
                      borderBottom: "1px solid rgba(0,0,0,0.07)",
                      background: plan.featured ? "linear-gradient(135deg, #fff8f6 0%, #fff 100%)" : undefined,
                      borderRadius: "20px 20px 0 0",
                    }}
                  >
                    {plan.featured && (
                      <span
                        className="mb-3 inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
                        style={{ background: "#ff4c00", borderRadius: 999 }}
                      >
                        Most Popular
                      </span>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-3xl font-bold" style={{ color: "#ff4c00" }}>
                        {plan.price}
                      </span>
                      <span className="text-sm" style={{ color: "#919499" }}>{plan.period}</span>
                    </div>
                    <h2 className="mt-1 font-display text-xl font-bold" style={{ color: "#000" }}>
                      {plan.name === "Enterprise" ? "Enterprise Plan" : `${plan.name} Plan`}
                    </h2>
                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-1.5 text-xs" style={{ color: "#515459" }}>
                          <div className="h-1 w-1 rounded-full shrink-0" style={{ background: "#ff4c00" }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="px-8 py-7 space-y-4" noValidate>
                    <p className="text-sm font-semibold" style={{ color: "#000" }}>
                      {plan.name === "Enterprise"
                        ? "Tell us about your team and we'll be in touch."
                        : "Reserve your spot — we'll notify you when early access opens."}
                    </p>

                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={status === "loading"}
                        className="w-full border border-black/10 bg-transparent px-4 py-3 text-sm text-black placeholder:text-black/25 outline-none transition-colors focus:border-black/30"
                        style={{ borderRadius: 8 }}
                      />
                      <input
                        type="email"
                        placeholder="Work email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={status === "loading"}
                        className="w-full border border-black/10 bg-transparent px-4 py-3 text-sm text-black placeholder:text-black/25 outline-none transition-colors focus:border-black/30"
                        style={{ borderRadius: 8 }}
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-xs font-semibold" style={{ color: "#ef4444" }}>{errorMsg}</p>
                    )}

                    <Button
                      variant="primary"
                      className="w-full"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending&hellip;
                        </>
                      ) : (
                        <>
                          {plan.name === "Enterprise" ? "Contact Sales" : "Reserve My Spot"}
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>

                    <p className="text-center text-[10px]" style={{ color: "rgba(0,0,0,0.3)" }}>
                      No payment required now &middot; Secure &middot; Uganda PDPA 2019 compliant
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
