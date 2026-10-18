import type { Metadata } from "next";
import { SectionBar } from "@/components/magazine/SectionBar";
import { PageHeader } from "@/components/magazine/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Traverse Minds Africa collects, uses, and protects your personal data under Uganda's PDPA 2019.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-white">
      <SectionBar />
      <PageHeader crumbs={[{ name: "Home", href: "/" }, { name: "Privacy Policy", href: "/privacy" }]} kicker="Legal" title="Privacy Policy" dek="Last updated March 2026" />
      <div className="container-max py-14">
        <div className="max-w-3xl">
      <div className="space-y-10 text-[17px] leading-relaxed text-gn-300">
        <section>
          <h2 className="font-serif text-[24px] font-semibold text-black">1. Who We Are</h2>
          <p className="mt-3">Traverse Minds Africa (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a civic-tech company registered in Kampala, Uganda. We operate <strong className="font-semibold text-black">traverseminds.com</strong> and its associated services across six divisions.</p>
        </section>
        <section>
          <h2 className="font-serif text-[24px] font-semibold text-black">2. Legal Basis</h2>
          <p className="mt-3">This policy is drafted in accordance with Uganda&apos;s <strong className="font-semibold text-black">Data Protection and Privacy Act, 2019</strong>. We process personal data only where we have a lawful basis: your explicit consent, performance of a contract, compliance with a legal obligation, or our legitimate interests.</p>
        </section>
        <section>
          <h2 className="font-serif text-[24px] font-semibold text-black">3. What Data We Collect</h2>
          <p className="mt-3">We collect personal data you provide through:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li><strong className="font-semibold text-black">Contact forms:</strong> name, organisation, email, phone, message.</li>
            <li><strong className="font-semibold text-black">Event registration:</strong> name, email, organisation, dietary requirements.</li>
            <li><strong className="font-semibold text-black">Newsletter:</strong> email address.</li>
            <li><strong className="font-semibold text-black">Waitlist forms:</strong> name, email, organisation, role.</li>
            <li><strong className="font-semibold text-black">Job applications:</strong> name, email, phone, cover letter, CV.</li>
          </ul>
          <p className="mt-3">We also collect limited automatic data:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li><strong className="font-semibold text-black">Analytics:</strong> anonymised usage data via PostHog (page views, clicks).</li>
            <li><strong className="font-semibold text-black">Cookies:</strong> essential and optional analytics (only with consent).</li>
          </ul>
        </section>
        <section>
          <h2 className="font-serif text-[24px] font-semibold text-black">4. How We Use Your Data</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>To respond to enquiries and provide services</li>
            <li>To process event registrations</li>
            <li>To send newsletters (double opt-in)</li>
            <li>To manage waitlist signups</li>
            <li>To process job applications</li>
            <li>To improve our website through anonymised analytics</li>
          </ul>
        </section>
        <section>
          <h2 className="font-serif text-[24px] font-semibold text-black">5. Data Sharing</h2>
          <p className="mt-3">We do not sell your data. We share only with: <strong className="font-semibold text-black">service providers</strong> (Resend, HubSpot, Vercel, PostHog) bound by data processing agreements, and <strong className="font-semibold text-black">legal authorities</strong> where required by Ugandan law.</p>
        </section>
        <section>
          <h2 className="font-serif text-[24px] font-semibold text-black">6. International Transfers</h2>
          <p className="mt-3">Per Section 19 of the PDPA, we only transfer data outside Uganda where adequate protection exists or you have given explicit consent.</p>
        </section>
        <section>
          <h2 className="font-serif text-[24px] font-semibold text-black">7. Data Retention</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Enquiries: 24 months from last interaction</li>
            <li>Event registrations: 12 months after event</li>
            <li>Newsletters: until you unsubscribe</li>
            <li>Job applications: 12 months from submission</li>
          </ul>
        </section>
        <section>
          <h2 className="font-serif text-[24px] font-semibold text-black">8. Your Rights Under the PDPA</h2>
          <p className="mt-3">You have the right to: <strong className="font-semibold text-black">access</strong>, <strong className="font-semibold text-black">correct</strong>, <strong className="font-semibold text-black">delete</strong> your data, <strong className="font-semibold text-black">withdraw consent</strong>, and lodge a <strong className="font-semibold text-black">complaint</strong> with the Personal Data Protection Office of Uganda. Contact us at <strong className="font-semibold text-black">traversemindsug@gmail.com</strong>. We respond within 30 days.</p>
        </section>
        <section>
          <h2 className="font-serif text-[24px] font-semibold text-black">9. Cookies</h2>
          <p className="mt-3">Essential cookies are always active. Analytics cookies (PostHog) activate only after consent via our cookie banner.</p>
        </section>
        <section>
          <h2 className="font-serif text-[24px] font-semibold text-black">10. Data Breach Notification</h2>
          <p className="mt-3">We will notify the Personal Data Protection Office within 72 hours of a breach, and notify you directly where the breach poses high risk to your rights.</p>
        </section>
        <section>
          <h2 className="font-serif text-[24px] font-semibold text-black">11. Contact Us</h2>
          <p className="mt-3"><strong className="font-semibold text-black">Traverse Minds Africa</strong><br />Kampala, Uganda<br />traversemindsug@gmail.com</p>
        </section>
      </div>
        </div>
      </div>
    </main>
  );
}
