"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { FileDown, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface DownloadFormData {
  email: string;
  name: string;
  organisation: string;
}

const inputCls = (err: boolean) =>
  cn(
    "h-12 w-full rounded-xl border bg-white px-4 text-sm text-primary outline-none transition-all duration-300 placeholder:text-brand-muted/50 focus:border-accent focus:ring-2 focus:ring-accent/15",
    err ? "border-red-400" : "border-border-light"
  );

export function CapabilityDownload() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<DownloadFormData>();

  const onSubmit = async (data: DownloadFormData) => {
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, division: "security", serviceType: "Capability Statement Download", message: "Requested capability statement PDF." }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Something went wrong");
      setIsUnlocked(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Failed.");
    }
  };

  return (
    <section id="capability" className="relative bg-primary section-padding overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/3 translate-y-1/3 rounded-full bg-accent/5 blur-[120px]" />

      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/6 bg-surface-dark-elevated p-8 md:p-12"
        >
          <div className="flex flex-col items-start gap-10 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <FileDown className="h-6 w-6 text-accent" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
                Capability Statement
              </h2>
              <p className="mt-3 max-w-lg text-white/35 leading-relaxed">
                Download our detailed capability statement covering team credentials, service methodology, and compliance certifications.
              </p>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Team credentials and certifications",
                  "Service methodology overview",
                  "Compliance framework coverage",
                  "Engagement models and pricing",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2.5 text-sm text-white/40">
                    <CheckCircle2 className="h-4 w-4 text-emerald shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full md:w-80">
              {isUnlocked ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center rounded-2xl border border-emerald/20 bg-emerald/10 p-8 text-center"
                >
                  <CheckCircle2 className="h-10 w-10 text-emerald" />
                  <p className="mt-3 font-semibold text-white">Download ready</p>
                  <Button variant="primary" size="lg" className="mt-5 w-full" href="/traverse-minds-capability-statement.pdf">
                    Download PDF
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-white/6 bg-white/3 p-6 backdrop-blur-sm" noValidate>
                  <p className="text-sm font-medium text-white/60">Enter your details to download:</p>
                  <input type="text" placeholder="Full Name" autoComplete="name" className={inputCls(!!errors.name)} {...register("name", { required: "Required" })} />
                  <input type="email" placeholder="Work Email" autoComplete="email" className={inputCls(!!errors.email)} {...register("email", { required: "Required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid" } })} />
                  <input type="text" placeholder="Organisation" autoComplete="organization" className={inputCls(!!errors.organisation)} {...register("organisation", { required: "Required" })} />
                  {serverError && <p className="text-sm text-red-400">{serverError}</p>}
                  <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Unlock Download"}
                  </Button>
                  <p className="text-[11px] text-white/20 text-center">
                    Your data is handled per our <a href="/privacy" className="underline hover:text-accent">Privacy Policy</a>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
