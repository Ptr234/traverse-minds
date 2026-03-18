import { Metadata } from "next";
import { Hero } from "@/components/public-record/Hero";
import { Features } from "@/components/public-record/Features";
import { Coverage } from "@/components/public-record/Coverage";
import { WaitlistForm } from "@/components/public-record/WaitlistForm";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Public Record EA | AI-Powered East Africa Public Document Platform",
  description: "Search, summarise, and monitor thousands of public documents, court records, and regulatory updates across East Africa.",
};

export default function PublicRecordPage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <Coverage />

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
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 max-w-5xl mx-auto">
            {[
              { name: "Individual", price: "UGX 50k", period: "/mo", features: ["1,000 searches/mo", "Basic AI summaries", "5 smart alerts", "Email support"] },
              { name: "Professional", price: "UGX 150k", period: "/mo", featured: true, features: ["Unlimited searches", "Advanced AI summaries", "50 smart alerts", "Bulk export", "Priority support"] },
              { name: "Enterprise", price: "Custom", period: "", features: ["Team access", "API access", "White-glove onboarding", "Custom record indexing", "Dedicated account manager"] },
            ].map((plan) => (
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
