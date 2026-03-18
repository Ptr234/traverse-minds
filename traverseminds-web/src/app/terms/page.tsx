import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Traverse Minds UG",
  description: "Read our terms and conditions for using Traverse Minds services and platforms.",
};

export default function TermsPage() {
  const lastUpdated = "March 17, 2026";

  return (
    <main className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="font-display text-4xl font-bold tracking-tight text-brand-charcoal sm:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-brand-medium">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:text-brand-green prose-a:text-brand-teal hover:prose-a:text-brand-amber">
          <p>
            Welcome to Traverse Minds. By accessing our website and using our services, 
            you agree to be bound by the following terms and conditions. Please read 
            them carefully.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using any part of the Traverse Minds platform, you agree 
            to become bound by the terms and conditions of this agreement. If you do 
            not agree to all the terms and conditions of this agreement, then you 
            may not access the website or use any services.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Traverse Minds provides cybersecurity assessments, public records intelligence, 
            digital literacy training, and policy research services. We reserve the 
            right to modify or discontinue any service with or without notice.
          </p>

          <h2>3. Intellectual Property</h2>
          <p>
            All content on this site, including text, graphics, logos, and software, 
            is the property of Traverse Minds UG or its content suppliers and is 
            protected by Ugandan and international copyright laws.
          </p>

          <h2>4. User Conduct</h2>
          <p>
            You agree not to use the website for any purpose that is unlawful or 
            prohibited by these terms. You may not use the website in any manner 
            that could damage, disable, overburden, or impair any Traverse Minds 
            server or the networks connected to any Traverse Minds server.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            In no event shall Traverse Minds be liable for any direct, indirect, 
            incidental, special, or consequential damages arising out of or in 
            any way connected with the use of our services or this website.
          </p>

          <h2>6. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance 
            with the laws of the Republic of Uganda. Any disputes relating to 
            these terms and conditions will be subject to the exclusive 
            jurisdiction of the courts of Uganda.
          </p>

          <h2>7. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at 
            legal@traverseminds.ug.
          </p>
        </div>
      </div>
    </main>
  );
}
