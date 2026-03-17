import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Traverse Minds UG collects, uses, and protects your personal data under Uganda's PDPA 2019.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <h1 className="font-display text-3xl text-brand-green md:text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-brand-muted">Last updated: March 2026</p>

      <div className="mt-10 space-y-8 leading-relaxed text-brand-medium">
        <section>
          <h2 className="font-display text-xl text-brand-green">1. Who We Are</h2>
          <p className="mt-3">Traverse Minds UG (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a civic-tech company registered in Kampala, Uganda. We operate <strong className="text-brand-charcoal">traverseminds.ug</strong> and its associated services across six divisions.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-brand-green">2. Legal Basis</h2>
          <p className="mt-3">This policy is drafted in accordance with Uganda&apos;s <strong className="text-brand-charcoal">Personal Data Protection Act, 2019 (PDPA)</strong>. We process personal data only where we have a lawful basis: your explicit consent, performance of a contract, compliance with a legal obligation, or our legitimate interests.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-brand-green">3. What Data We Collect</h2>
          <p className="mt-3">We collect personal data you provide through:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li><strong className="text-brand-charcoal">Contact forms:</strong> name, organisation, email, phone, message.</li>
            <li><strong className="text-brand-charcoal">Event registration:</strong> name, email, organisation, dietary requirements.</li>
            <li><strong className="text-brand-charcoal">Newsletter:</strong> email address.</li>
            <li><strong className="text-brand-charcoal">Waitlist forms:</strong> name, email, organisation, role.</li>
            <li><strong className="text-brand-charcoal">Job applications:</strong> name, email, phone, cover letter, CV.</li>
          </ul>
          <p className="mt-3">We also collect limited automatic data:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li><strong className="text-brand-charcoal">Analytics:</strong> anonymised usage data via PostHog (page views, clicks).</li>
            <li><strong className="text-brand-charcoal">Cookies:</strong> essential and optional analytics (only with consent).</li>
          </ul>
        </section>
        <section>
          <h2 className="font-display text-xl text-brand-green">4. How We Use Your Data</h2>
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
          <h2 className="font-display text-xl text-brand-green">5. Data Sharing</h2>
          <p className="mt-3">We do not sell your data. We share only with: <strong className="text-brand-charcoal">service providers</strong> (Resend, HubSpot, Vercel, PostHog) bound by data processing agreements, and <strong className="text-brand-charcoal">legal authorities</strong> where required by Ugandan law.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-brand-green">6. International Transfers</h2>
          <p className="mt-3">Per Section 19 of the PDPA, we only transfer data outside Uganda where adequate protection exists or you have given explicit consent.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-brand-green">7. Data Retention</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Enquiries: 24 months from last interaction</li>
            <li>Event registrations: 12 months after event</li>
            <li>Newsletters: until you unsubscribe</li>
            <li>Job applications: 12 months from submission</li>
          </ul>
        </section>
        <section>
          <h2 className="font-display text-xl text-brand-green">8. Your Rights Under the PDPA</h2>
          <p className="mt-3">You have the right to: <strong className="text-brand-charcoal">access</strong>, <strong className="text-brand-charcoal">correct</strong>, <strong className="text-brand-charcoal">delete</strong> your data, <strong className="text-brand-charcoal">withdraw consent</strong>, and lodge a <strong className="text-brand-charcoal">complaint</strong> with the Personal Data Protection Office of Uganda. Contact us at <strong className="text-brand-charcoal">hello@traverseminds.ug</strong>. We respond within 30 days.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-brand-green">9. Cookies</h2>
          <p className="mt-3">Essential cookies are always active. Analytics cookies (PostHog) activate only after consent via our cookie banner.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-brand-green">10. Data Breach Notification</h2>
          <p className="mt-3">We will notify the Personal Data Protection Office within 72 hours of a breach, and notify you directly where the breach poses high risk to your rights.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-brand-green">11. Contact Us</h2>
          <p className="mt-3"><strong className="text-brand-charcoal">Traverse Minds UG</strong><br />Kampala, Uganda<br />hello@traverseminds.ug</p>
        </section>
      </div>
    </div>
  );
}
