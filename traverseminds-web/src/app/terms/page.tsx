import type { Metadata } from "next";
import { SectionBar } from "@/components/magazine/SectionBar";
import { PageHeader } from "@/components/magazine/PageHeader";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read our terms and conditions for using Traverse Minds Africa services and platforms.",
};

export default function TermsPage() {
  const lastUpdated = "March 17, 2026";

  return (
    <main className="bg-white">
      <SectionBar />
      <PageHeader crumbs={[{ name: "Home", href: "/" }, { name: "Terms of Service", href: "/terms" }]} kicker="Legal" title="Terms of Service" dek={`Last updated ${lastUpdated}`} />
      <div className="container-max py-14">
        <div className="max-w-3xl">

        <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-semibold prose-headings:text-black prose-a:text-accent-ink prose-p:text-gn-300 prose-li:text-gn-300">
          <p>
            Welcome to Traverse Minds Africa. By accessing our website and using our services, 
            you agree to be bound by the following terms and conditions. Please read 
            them carefully.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using any part of the Traverse Minds Africa platform, you agree 
            to become bound by the terms and conditions of this agreement. If you do 
            not agree to all the terms and conditions of this agreement, then you 
            may not access the website or use any services.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Traverse Minds Africa provides cybersecurity assessments, public records intelligence, 
            digital literacy training, and policy research services. We reserve the 
            right to modify or discontinue any service with or without notice.
          </p>

          <h2>3. Intellectual Property</h2>
          <p>
            All content on this site, including text, graphics, logos, and software, 
            is the property of Traverse Minds Africa or its content suppliers and is 
            protected by Ugandan and international copyright laws.
          </p>

          <h2>4. User Conduct</h2>
          <p>
            You agree not to use the website for any purpose that is unlawful or 
            prohibited by these terms. You may not use the website in any manner 
            that could damage, disable, overburden, or impair any Traverse Minds Africa 
            server or the networks connected to any Traverse Minds Africa server.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            In no event shall Traverse Minds Africa be liable for any direct, indirect, 
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
            traversemindsug@gmail.com.
          </p>
        </div>
        </div>
      </div>
    </main>
  );
}
