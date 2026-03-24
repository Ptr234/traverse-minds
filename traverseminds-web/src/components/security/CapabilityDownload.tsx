"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { FileDown, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";

interface DownloadFormData {
  email: string;
  name: string;
  organisation: string;
}

const inputCls = (err: boolean) =>
  cn(
    "h-12 w-full border bg-white px-4 text-sm outline-none",
    err ? "border-red-400" : ""
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
    <section id="capability" style={{ background: "#212429", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
      <div className="container-max relative z-10">
        <SectionReveal variant="clip-inset">
          <div className="border border-white/6 bg-surface-dark-elevated p-8 md:p-12" style={{ borderRadius: 16 }}>
            <div className="flex flex-col items-start gap-10 md:flex-row md:items-center">
              <div className="flex-1">
                <SectionReveal variant="fade-up" delay={0.1}>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center bg-accent/10" style={{ borderRadius: 8 }}>
                    <FileDown className="h-6 w-6 text-accent" />
                  </div>
                </SectionReveal>
                <TextReveal
                  as="h2"
                  variant="fade-up"
                  delay={0.15}
                  className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight"
                >
                  Capability Statement
                </TextReveal>
                <SectionReveal variant="fade-up" delay={0.25}>
                  <p className="mt-3 max-w-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Download our detailed capability statement covering team credentials, service methodology, and compliance certifications.
                  </p>
                </SectionReveal>
                <SectionReveal variant="fade-up" delay={0.35}>
                  <ul className="mt-5 space-y-2.5">
                    {[
                      "Team credentials and certifications",
                      "Service methodology overview",
                      "Compliance framework coverage",
                      "Engagement models and pricing",
                    ].map((t) => (
                      <li key={t} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                        <CheckCircle2 className="h-4 w-4 text-emerald shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </SectionReveal>
              </div>

              <SectionReveal variant="slide-up" delay={0.3} className="w-full md:w-80">
                {isUnlocked ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center border border-emerald/20 bg-emerald/10 p-8 text-center"
                    style={{ borderRadius: 8 }}
                  >
                    <CheckCircle2 className="h-10 w-10 text-emerald" />
                    <p className="mt-3 font-semibold text-white">Download ready</p>
                    <Button variant="primary" size="lg" className="mt-5 w-full" href="/traverse-minds-capability-statement.pdf">
                      Download PDF
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border border-white/6 bg-white/3 p-6" style={{ borderRadius: 8 }} noValidate>
                    <p className="text-sm font-medium text-white/60">Enter your details to download:</p>
                    <input type="text" placeholder="Full Name" autoComplete="name" className={inputCls(!!errors.name)} style={{ borderRadius: 8, borderColor: errors.name ? undefined : "rgba(255,255,255,0.1)", color: "#000", transition: "border-color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }} {...register("name", { required: "Required" })} />
                    <input type="email" placeholder="Work Email" autoComplete="email" className={inputCls(!!errors.email)} style={{ borderRadius: 8, borderColor: errors.email ? undefined : "rgba(255,255,255,0.1)", color: "#000", transition: "border-color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }} {...register("email", { required: "Required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid" } })} />
                    <input type="text" placeholder="Organisation" autoComplete="organization" className={inputCls(!!errors.organisation)} style={{ borderRadius: 8, borderColor: errors.organisation ? undefined : "rgba(255,255,255,0.1)", color: "#000", transition: "border-color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }} {...register("organisation", { required: "Required" })} />
                    {serverError && <p className="text-sm text-red-400">{serverError}</p>}
                    <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Processing..." : "Unlock Download"}
                    </Button>
                    <p className="text-[11px] text-white/20 text-center">
                      Your data is handled per our <a href="/privacy" className="underline hover:text-accent">Privacy Policy</a>.
                    </p>
                  </form>
                )}
              </SectionReveal>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
