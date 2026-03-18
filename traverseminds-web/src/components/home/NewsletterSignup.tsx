"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Mail, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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
    <section className="relative overflow-hidden bg-surface-elevated section-padding">
      {/* Background */}
      <div className="absolute inset-0 dot-grid-light opacity-50 pointer-events-none" />
      <div className="absolute top-0 right-0 h-80 w-80 -translate-y-1/2 translate-x-1/3 rounded-full bg-accent/5 blur-[100px]" />
      <div className="absolute bottom-0 left-0 h-80 w-80 translate-y-1/2 -translate-x-1/3 rounded-full bg-emerald/5 blur-[100px]" />

      <div className="container-max relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 ring-1 ring-primary/10">
              <Mail className="h-6 w-6 text-accent" />
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary">
              Stay ahead of the{" "}
              <span className="text-gradient-accent">threat landscape</span>.
            </h2>

            <p className="mt-4 text-base text-brand-medium/60 leading-relaxed max-w-lg mx-auto">
              Get our weekly intelligence briefing on East African cybersecurity
              trends, policy updates, and exclusive event invitations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 rounded-2xl bg-emerald/5 border border-emerald/15 p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald text-white">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-primary">Subscription Confirmed</h3>
                  <p className="text-brand-medium/60 mt-1">
                    Check your inbox to verify your email address.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative mx-auto max-w-lg"
                noValidate
              >
                <div className="relative flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your professional email"
                    className={cn(
                      "h-14 w-full rounded-2xl border bg-white px-6 text-base text-primary placeholder:text-brand-muted/50 outline-none transition-all duration-300 focus:ring-2 focus:ring-accent/20 shadow-sm",
                      errors.email
                        ? "border-red-400 focus:border-red-400"
                        : "border-border-light focus:border-accent"
                    )}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="h-14 px-8 shrink-0"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Subscribe
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-3 -bottom-7 text-sm text-red-500 font-medium"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </form>
            )}

            <p className="mt-10 text-xs text-brand-muted/50 uppercase tracking-widest">
              Data protection compliant &bull; No spam &bull; Unsubscribe anytime
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
