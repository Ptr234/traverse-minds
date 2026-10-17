// Public Record plans. Shared by the pricing page and the pricing-enquiry function, so the price and
// features in confirmation emails come from here and never from the browser.

export type Billing = "monthly" | "annual";

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  featured?: boolean;
}

export const PRICING_PLANS: Record<Billing, PricingPlan[]> = {
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

export const findPlan = (name: string, billing: Billing) => PRICING_PLANS[billing].find((p) => p.name === name);
