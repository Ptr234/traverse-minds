"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SponsorshipFormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  sponsorshipLevel: "Partner" | "Champion" | "Founder" | "Custom";
  message: string;
  honeypot?: string;
}

const inp = (err: boolean) =>
  cn(
    "h-12 w-full rounded-sm border bg-white px-4 text-base outline-none transition-all placeholder:text-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500",
    err ? "border-red-500" : "border-gray-300"
  );

export function SponsorshipForm() {
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SponsorshipFormData>();

  const onSubmit = async (data: SponsorshipFormData) => {
    if (data.honeypot) return;
    setErr("");
    try {
      const res = await fetch("/api/accuracy-mentorship/sponsor-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          organization: data.organization,
          sponsorshipLevel: data.sponsorshipLevel,
          message: data.message,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        setErr(error.error || "Failed to submit inquiry");
        return;
      }

      setDone(true);
      reset();
      setTimeout(() => setDone(false), 5000);
    } catch (error) {
      setErr("Network error. Please try again.");
      console.error(error);
    }
  };

  if (done) {
    return (
      <div className="flex items-center justify-center gap-3 rounded-sm border border-green-200 bg-green-50 p-4">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <div>
          <p className="font-semibold text-green-900">
            Thank you for your inquiry
          </p>
          <p className="text-sm text-green-700">
            We'll be in touch shortly to discuss sponsorship opportunities.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <input
        type="text"
        {...register("honeypot")}
        style={{ display: "none" }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: "#000" }}>
            Full Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            className={inp(!!errors.name)}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: "#000" }}>
            Email
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            className={inp(!!errors.email)}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: "#000" }}>
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="+256..."
            className={inp(!!errors.phone)}
            {...register("phone")}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: "#000" }}>
            Organization
          </label>
          <input
            type="text"
            placeholder="Your organization"
            className={inp(!!errors.organization)}
            {...register("organization", {
              required: "Organization is required",
            })}
          />
          {errors.organization && (
            <p className="text-xs text-red-500 mt-1">
              {errors.organization.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: "#000" }}>
          Sponsorship Level of Interest
        </label>
        <select
          className={inp(!!errors.sponsorshipLevel)}
          {...register("sponsorshipLevel")}
          style={{
            height: 48,
            paddingTop: 12,
            paddingBottom: 12,
          }}
        >
          <option value="Partner">Partner ($1,000 - $5,000)</option>
          <option value="Champion">Champion ($5,000 - $15,000)</option>
          <option value="Founder">Founder ($15,000+)</option>
          <option value="Custom">Custom arrangement</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: "#000" }}>
          Additional Message
        </label>
        <textarea
          placeholder="Tell us about your sponsorship interests and any questions..."
          className={cn(
            "w-full rounded-sm border bg-white px-4 py-3 text-base outline-none transition-all placeholder:text-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500",
            errors.message ? "border-red-500" : "border-gray-300"
          )}
          rows={4}
          {...register("message")}
        />
      </div>

      {err && (
        <div className="rounded-sm bg-red-50 border border-red-200 p-3">
          <p className="text-sm text-red-700">{err}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Submitting..." : "Submit Sponsorship Inquiry"}
      </Button>
    </form>
  );
}
