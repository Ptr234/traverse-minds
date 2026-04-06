"use client";

import { useState } from "react";
import { Hero } from "@/components/public-record/Hero";
import { Features } from "@/components/public-record/Features";
import { Coverage } from "@/components/public-record/Coverage";
import { WaitlistForm } from "@/components/public-record/WaitlistForm";
import { Button } from "@/components/ui/Button";
import { PageTransition } from "@/components/ui/PageTransition";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { Scale, Search, BookOpen, Building2, ShieldCheck, ArrowRight } from "lucide-react";

const audiences = [
  {
    icon: Scale,
    title: "Law Firms",
    desc: "Search court records, regulatory filings, and legal precedents across all five African jurisdictions in seconds.",
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
      <PageTransition>
      <Hero />
      <Features />
      <Coverage />

      {/* Who it's for */}
      <section style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
        <div className="container-max relative z-10">
          <div className="text-center mb-16">
            <SectionReveal variant="mask-wipe">
              <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Audience</p>
            </SectionReveal>
            <TextReveal variant="blur-in" className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000" }}>
              Who it&apos;s for
            </TextReveal>
            <SectionReveal variant="fade-up" delay={0.1}>
              <p className="mt-3 max-w-xl mx-auto" style={{ color: "#515459" }}>
                Public Record Africa serves professionals who need fast, reliable access to African public documents.
              </p>
            </SectionReveal>
          </div>

          <SectionReveal variant="fade-up" staggerChildren={0.1} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {audiences.map((a) => (
              <RevealItem
                key={a.title}
                variant="scale-fade"
              >
                <div className="group flex flex-col items-center text-center border bg-white p-8" style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1), 0 2px 2px 0 rgba(0,0,0,0.15), 0 1px 0 0 rgba(0,0,0,0.05)" }}>
                  <div className="mb-5 flex h-14 w-14 items-center justify-center bg-primary/5" style={{ borderRadius: 8, transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
                    <a.icon className="h-6 w-6" style={{ color: "#000" }} />
                  </div>
                  <h3 className="font-display text-lg font-bold" style={{ color: "#000" }}>{a.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "#515459" }}>{a.desc}</p>
                </div>
              </RevealItem>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* Ethics & Data Governance */}
      <section style={{ background: "#212429", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
        <div className="container-max relative z-10">
          <SectionReveal variant="fade-blur" className="mx-auto max-w-3xl text-center">
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Ethics</p>

            <TextReveal variant="clip-up" className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
              Ethics &amp; Data Governance
            </TextReveal>

            <div className="mt-8 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center bg-white/10" style={{ borderRadius: 8 }}>
                <ShieldCheck className="h-8 w-8 text-accent" />
              </div>
            </div>

            <p className="mt-6 text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
              We provide the AI intelligence layer. We never sell or restrict access to public data that is already freely available.
            </p>

            <p className="mt-4 text-sm max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.35)" }}>
              All data indexed by Public Record Africa is sourced from publicly accessible government registries, court systems, and regulatory bodies. We add value through search, summarisation, and monitoring -- not through data restriction.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
        <div className="container-max relative z-10">
          <div className="text-center mb-16">
            <SectionReveal variant="clip-right">
              <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Pricing</p>
            </SectionReveal>
            <TextReveal variant="fade-up" className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000" }}>
              Simple, transparent pricing
            </TextReveal>
            <SectionReveal variant="fade-up" delay={0.1}>
              <p className="mt-3 max-w-xl mx-auto" style={{ color: "#515459" }}>
                Choose the plan that fits your research needs.
              </p>
            </SectionReveal>

            {/* Monthly / Annual Toggle */}
            <SectionReveal variant="scale-fade" delay={0.15}>
              <div className="mt-8 inline-flex items-center gap-1 border p-1" style={{ borderRadius: 999, borderColor: "rgba(0,0,0,0.1)", background: "#f0f1f4" }}>
                <button
                  onClick={() => setBilling("monthly")}
                  className={`px-6 py-2.5 min-h-11 text-sm font-semibold cursor-pointer ${
                    billing === "monthly"
                      ? "bg-accent text-white shadow-sm"
                      : ""
                  }`}
                  style={{ borderRadius: 999, transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)", color: billing === "monthly" ? "#fff" : "#515459" }}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBilling("annual")}
                  className={`px-6 py-2.5 min-h-11 text-sm font-semibold cursor-pointer ${
                    billing === "annual"
                      ? "bg-accent text-white shadow-sm"
                      : ""
                  }`}
                  style={{ borderRadius: 999, transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)", color: billing === "annual" ? "#fff" : "#515459" }}
                >
                  Annual
                  <span className="ml-1.5 text-[10px] font-bold uppercase tracking-wider opacity-70">Save 2 mo</span>
                </button>
              </div>
            </SectionReveal>
          </div>

          <SectionReveal variant="fade-up" staggerChildren={0.12} className="grid grid-cols-1 gap-5 md:grid-cols-3 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <RevealItem
                key={plan.name}
                variant="slide-up"
              >
                <div
                  className={`border p-8 ${
                    plan.featured
                      ? "border-accent ring-1 ring-accent/20 bg-white relative"
                      : "bg-white"
                  }`}
                  style={{ borderRadius: 16, transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)", borderColor: plan.featured ? undefined : "rgba(0,0,0,0.1)", boxShadow: plan.featured ? "0 4px 8px 0 rgba(0,0,0,0.1), 0 2px 2px 0 rgba(0,0,0,0.15), 0 1px 0 0 rgba(0,0,0,0.05)" : undefined }}
                >
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent px-4 py-1 text-[10px] font-semibold uppercase tracking-wider text-white" style={{ borderRadius: 999 }}>
                      Most Popular
                    </div>
                  )}
                  <h3 className="font-display text-lg font-bold" style={{ color: "#000" }}>{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-display text-3xl font-bold text-accent">{plan.price}</span>
                    <span className="text-sm" style={{ color: "#919499" }}>{plan.period}</span>
                  </div>
                  <ul className="mt-8 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: "#515459" }}>
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
              </RevealItem>
            ))}
          </SectionReveal>
        </div>
      </section>

      <WaitlistForm />
      </PageTransition>
    </div>
  );
}
