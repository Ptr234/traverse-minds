import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";

// TODO: Replace with Sanity CMS dynamic data
const mockPost = {
  title: "The Top 5 Cyber Threats Facing Ugandan Banks in 2026",
  division: "Security",
  date: "12 March 2026",
  readTime: "6 min read",
  image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1200&q=80",
  author: {
    name: "Christine Masika",
    role: "Founder & CEO",
    photo: "/Christine.jpg",
  },
  content: `
    <p>Uganda's banking sector is undergoing rapid digital transformation. Mobile banking, internet banking, and agent banking have expanded financial access across the country — but they've also expanded the attack surface for cybercriminals.</p>
    <p>Based on our security assessments across multiple Ugandan financial institutions in 2025-2026, here are the five most pressing cyber threats we're seeing.</p>
    <h2>1. Ransomware Targeting Core Banking Systems</h2>
    <p>Ransomware attacks on financial institutions have increased by over 300% across East Africa in the past two years. Attackers are specifically targeting core banking systems, knowing that downtime costs banks millions in lost transactions and regulatory penalties.</p>
    <h2>2. Mobile Banking API Vulnerabilities</h2>
    <p>As banks rush to deploy mobile banking solutions, API security is often an afterthought. We've found critical vulnerabilities in mobile banking APIs that could allow attackers to access customer accounts, initiate unauthorised transfers, or extract personal data.</p>
    <h2>3. Insider Threats and Privileged Access Abuse</h2>
    <p>Not all threats come from outside. Insider threats — whether malicious or negligent — remain one of the most difficult risks to manage. Banks with weak access controls and no privileged access monitoring are particularly vulnerable.</p>
    <h2>4. Social Engineering and Business Email Compromise</h2>
    <p>Phishing attacks targeting bank employees have become more sophisticated. Business email compromise (BEC) schemes targeting treasury and finance teams are costing Ugandan organisations significant sums.</p>
    <h2>5. Compliance Gaps with Bank of Uganda Regulations</h2>
    <p>Bank of Uganda's cybersecurity guidelines require supervised institutions to maintain specific security controls. Many banks are not fully compliant, leaving them exposed to both cyber attacks and regulatory action.</p>
    <h2>What Banks Should Do Now</h2>
    <p>The good news is that these threats are manageable with the right approach. Regular penetration testing, compliance auditing against Bank of Uganda guidelines, employee security awareness training, and incident response planning can dramatically reduce risk.</p>
    <p>If your institution needs a security assessment, <a href="/security#enquiry">contact our team</a> for a confidential conversation.</p>
  `,
};

export function generateStaticParams() {
  // Placeholder — will be populated from Sanity CMS when posts are published
  return [{ slug: "placeholder" }];
}

export const metadata: Metadata = {
  title: mockPost.title,
  description: "Based on our security assessments across Ugandan financial institutions, here are the five most pressing cyber threats we're seeing.",
};

export default function BlogPostPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0">
          <Image src={mockPost.image} alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-brand-green/85 to-brand-green/60" />
        </div>
        <div className="relative mx-auto max-w-3xl">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <span className="mb-3 inline-block rounded-full bg-brand-amber px-3 py-1 text-xs font-semibold text-white">
            {mockPost.division}
          </span>
          <h1 className="font-display text-3xl leading-snug text-white md:text-4xl lg:text-5xl">
            {mockPost.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image src={mockPost.author.photo} alt={mockPost.author.name} fill className="object-cover" sizes="40px" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{mockPost.author.name}</p>
                <p className="text-xs text-white/50">{mockPost.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/40">
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{mockPost.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{mockPost.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-light-bg px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <article
            className="prose max-w-none prose-headings:font-display prose-headings:text-brand-green prose-p:text-brand-medium prose-a:text-brand-teal prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-charcoal prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: mockPost.content }}
          />

          {/* CTA */}
          <div className="mt-16 rounded-2xl border border-light-border bg-light-card p-8 text-center md:p-10">
            <h3 className="font-display text-xl text-brand-charcoal">Need a security assessment?</h3>
            <p className="mt-2 text-brand-medium">
              Our team can evaluate your organisation&apos;s cybersecurity posture against these threats.
            </p>
            <div className="mt-6">
              <Button variant="primary" size="lg" href="/security#enquiry">
                Request an Assessment
              </Button>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-10">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-brand-muted transition-colors hover:text-brand-teal">
              <ArrowLeft className="h-4 w-4" /> All Posts
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
