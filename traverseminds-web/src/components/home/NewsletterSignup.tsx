"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Mail, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";

const gnEase = [0.215, 0.61, 0.355, 1] as const;

interface NewsletterFormData {
  email: string;
}

export function NewsletterSignup() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>();

  const onSubmit = async (data: NewsletterFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  };

  return (
    <section style={{ background: "#f0f1f4", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56 }}>
      <div style={{ maxWidth: 596, margin: "0 auto", padding: "0 24px 80px" }} className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: gnEase }}
        >
          <Mail className="mx-auto mb-4" style={{ height: 24, width: 24, color: "#ff4c00" }} />

          <TextReveal
            as="h2"
            variant="fade-up"
            staggerSpeed={0.03}
            delay={0.1}
            className="font-display"
            style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 500, lineHeight: "125%", letterSpacing: "-0.8px", color: "#000" }}
          >
            Stay ahead of the threat landscape.
          </TextReveal>

          <p style={{ marginTop: 16, fontSize: 16, color: "#515459", lineHeight: "125%", maxWidth: 480, margin: "16px auto 0" }}>
            Get our weekly intelligence briefing on East African cybersecurity
            trends, policy updates, and exclusive event invitations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.1, ease: gnEase }}
          style={{ marginTop: 40 }}
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4"
              style={{ padding: 32, borderRadius: 8, background: "rgba(43,146,57,0.08)", border: "1px solid rgba(43,146,57,0.2)" }}
            >
              <div className="flex items-center justify-center" style={{ height: 48, width: 48, background: "#2b9239", borderRadius: 4 }}>
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <div className="text-center">
                <h3 style={{ fontSize: 21, fontWeight: 500, color: "#000" }}>Subscription Confirmed</h3>
                <p style={{ color: "#515459", marginTop: 4, fontSize: 16 }}>Check your inbox to verify your email address.</p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="relative" noValidate>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="newsletter-email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your professional email"
                  aria-describedby={errors.email ? "newsletter-error" : undefined}
                  aria-invalid={!!errors.email}
                  className={cn("flex-1 px-4 outline-none", errors.email ? "border-red-400" : "")}
                  style={{
                    height: 48,
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: "125%",
                    color: "#000",
                    background: "#fff",
                    border: errors.email ? "1px solid #d63a3a" : "1px solid rgba(81,84,89,0.16)",
                    borderRadius: 4,
                    transition: "border-color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)",
                  }}
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address" },
                  })}
                />
                <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Sending...</span>
                  ) : (
                    <span className="flex items-center gap-2">Subscribe <ArrowRight className="h-4 w-4" /></span>
                  )}
                </Button>
              </div>
              {errors.email && (
                <motion.p id="newsletter-error" role="alert" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  style={{ position: "absolute", left: 12, bottom: -24, fontSize: 14, color: "#d63a3a", fontWeight: 500 }}>
                  {errors.email.message}
                </motion.p>
              )}
            </form>
          )}

          <p style={{ marginTop: 40, fontSize: 12, color: "#919499", letterSpacing: "0.6px", textTransform: "uppercase" as const, fontWeight: 700 }}>
            Data protection compliant &bull; No spam &bull; Unsubscribe anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
