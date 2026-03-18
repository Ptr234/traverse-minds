"use client";

import { useState } from "react";
import { Hero } from "@/components/public-record/Hero";
import { Features } from "@/components/public-record/Features";
import { Coverage } from "@/components/public-record/Coverage";
import { WaitlistForm } from "@/components/public-record/WaitlistForm";
import { Button } from "@/components/ui/Button";
import { Scale, Search, BookOpen, Building2, ShieldCheck, ArrowRight } from "lucide-react";

const audiences = [
  {
    icon: Scale,
    title: "Law Firms",
    desc: "Search court records, regulatory filings, and legal precedents across all five EAC jurisdictions in seconds.",
  },
  {
    icon: Search,
    title: "Investigative Journalists",
    desc: "Access public documents, company registrations, and government records to power evidence-based reporting.",
  },
  {
    icon: BookOpen,
    title: "Researchers",
    desc: "Build datasets from public records for academic research, policy analysis, and impact assessments.",
  },
  {
    icon: Building2,
    title: "Government Bodies",
    desc: "Monitor regulatory compliance, cross-reference public filings, and streamline inter-agency information sharing.",
  },
];

const pricingPlans = {
  monthly: [
    { name: "Individual", price: "UGX 50k", period: "/mo", features: ["1,000 searches/mo", "Basic AI summaries", "5 smart alerts", "Email support"] },
    { name: "Professional", price: "UGX 150k", period: "/mo", featured: true, features: ["Unlimited searches", "Advanced AI summaries", "50 smart alerts", "Bulk export", "Priority support"] },
    { name: "Enterprise", price: "Custom", period: "", features: ["Team access", "API access", "White-glove onboarding", "Custom record indexing", "Dedicated account manager"] },
  ],
  annual: [
    { name: "Individual", price: "UGX 500k", period: "/yr", features: ["1,000 searches/mo", "Basic AI summaries", "5 smart alerts", "Email support"] },
    { name: "Professional", price: "UGX 1.5M", period: "/yr", featured: true, features: ["Unlimited searches", "Advanced AI summaries", "50 smart alerts", "Bulk export", "Priority support"] },
    { name: "Enterprise", price: "Custom", period: "", features: ["Team access", "API access", "White-glove onboarding", "Custom record indexing", "Dedicated account manager"] },
  ],
};

export default function PublicRecordPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const plans = pricingPlans[billing];

  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <Coverage />

      {/* Who it's for */}
      <section className="relative bg-white section-padding overflow-hidden border-t border-border-light">
        <div className="absolute inset-0 dot-grid-light opacity-30 pointer-events-none" />

        <div className="container-max relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">Audience</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Who it&apos;s for
            </h2>
            <p className="mt-3 text-brand-medium/60 max-w-xl mx-auto">
              Public Record EA serves professionals who need fast, reliable access to East African public documents.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {audiences.map((a) => (
              <div
                key={a.title}
                className="group flex flex-col items-center text-center rounded-2xl border border-border-light bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated hover:border-accent/15"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:scale-110">
                  <a.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-primary">{a.title}</h3>
                <p className="mt-3 text-sm text-brand-medium/60 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ethics & Data Governance */}
      <section className="relative bg-primary section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-accent/5 blur-[120px]" />

        <div className="container-max relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-4 py-1.5 mb-5">
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/55">Ethics</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
              Ethics & Data Governance
            </h2>

            <div className="mt-8 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                <ShieldCheck className="h-8 w-8 text-accent" />
              </div>
            </div>

            <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              We provide the AI intelligence layer. We never sell or restrict access to public data that is already freely available.
            </p>

            <p className="mt-4 text-sm text-white/35 max-w-xl mx-auto">
              All data indexed by Public Record EA is sourced from publicly accessible government registries, court systems, and regulatory bodies. We add value through search, summarisation, and monitoring — not through data restriction.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative bg-white section-padding overflow-hidden border-t border-border-light">
        <div className="absolute inset-0 dot-grid-light opacity-30 pointer-events-none" />

        <div className="container-max relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">Pricing</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="mt-3 text-brand-medium/60 max-w-xl mx-auto">
              Choose the plan that fits your research needs.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-border-light bg-surface-elevated p-1">
              <button
                onClick={() => setBilling("monthly")}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  billing === "monthly"
                    ? "bg-accent text-white shadow-sm"
                    : "text-brand-medium/60 hover:text-primary"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("annual")}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  billing === "annual"
                    ? "bg-accent text-white shadow-sm"
                    : "text-brand-medium/60 hover:text-primary"
                }`}
              >
                Annual
                <span className="ml-1.5 text-[10px] font-bold uppercase tracking-wider opacity-70">Save 2 mo</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl border p-8 transition-all duration-500 hover:-translate-y-1 ${
                  plan.featured
                    ? "border-accent shadow-elevated ring-1 ring-accent/20 bg-white relative"
                    : "border-border-light bg-white hover:shadow-card"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    Most Popular
                  </div>
                )}
                <h3 className="font-display text-lg font-bold text-primary">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-bold text-accent">{plan.price}</span>
                  <span className="text-sm text-brand-muted">{plan.period}</span>
                </div>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-brand-medium/60">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button
                    variant={plan.featured ? "primary" : "outline"}
                    className="w-full"
                    href="#waitlist"
                  >
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaitlistForm />
    </div>
  );
}
