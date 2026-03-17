"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { FileDown, CheckCircle2 } from "lucide-react";

interface DownloadFormData { email: string; name: string; organisation: string; }

const inputCls = (err: boolean) => cn(
  "h-12 w-full rounded-lg border bg-white px-4 text-base text-brand-charcoal outline-none transition-all placeholder:text-brand-muted focus:border-brand-teal focus:ring-1 focus:ring-brand-teal",
  err ? "border-red-500" : "border-light-border"
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
    } catch (err) { setServerError(err instanceof Error ? err.message : "Failed."); }
  };

  return (
    <section id="capability" className="bg-light-bg px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-xl border border-light-border bg-light-card p-8 md:p-12">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex-1">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-amber/10">
                <FileDown className="h-7 w-7 text-brand-amber" />
              </div>
              <h2 className="font-display text-2xl text-brand-green md:text-3xl">Capability Statement</h2>
              <p className="mt-3 max-w-lg text-brand-medium">
                Download our detailed capability statement covering team credentials, service methodology, and compliance certifications.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-brand-medium">
                {["Team credentials and certifications", "Service methodology overview", "Compliance framework coverage", "Engagement models and pricing"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-teal" />{t}</li>
                ))}
              </ul>
            </div>

            <div className="w-full md:w-80">
              {isUnlocked ? (
                <div className="flex flex-col items-center rounded-xl border border-brand-teal/20 bg-brand-teal/5 p-6 text-center">
                  <CheckCircle2 className="h-10 w-10 text-brand-teal" />
                  <p className="mt-3 font-semibold text-brand-charcoal">Download ready</p>
                  <Button variant="secondary" size="lg" className="mt-4 w-full" href="/traverse-minds-capability-statement.pdf">Download PDF</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border border-light-border bg-light-surface p-6" noValidate>
                  <p className="text-sm font-medium text-brand-charcoal">Enter your details to download:</p>
                  <input type="text" placeholder="Full Name" autoComplete="name" className={inputCls(!!errors.name)} {...register("name", { required: "Required" })} />
                  <input type="email" placeholder="Work Email" autoComplete="email" className={inputCls(!!errors.email)} {...register("email", { required: "Required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid" } })} />
                  <input type="text" placeholder="Organisation" autoComplete="organization" className={inputCls(!!errors.organisation)} {...register("organisation", { required: "Required" })} />
                  {serverError && <p className="text-sm text-red-600">{serverError}</p>}
                  <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Processing..." : "Unlock Download"}</Button>
                  <p className="text-xs text-brand-muted">Your data is handled per our <a href="/privacy" className="underline hover:text-brand-teal">Privacy Policy</a>.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
