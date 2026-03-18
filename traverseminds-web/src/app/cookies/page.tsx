import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Traverse Minds UG",
  description: "Learn about how we use cookies to improve your experience on Traverse Minds platforms.",
};

export default function CookiePolicyPage() {
  const lastUpdated = "March 17, 2026";

  return (
    <main className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="font-display text-4xl font-bold tracking-tight text-brand-charcoal sm:text-5xl">Cookie Policy</h1>
          <p className="mt-4 text-brand-medium">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:text-brand-green prose-a:text-brand-teal hover:prose-a:text-brand-amber">
          <p>
            At Traverse Minds, we believe in being clear and open about how we collect 
            and use data related to you. In the spirit of transparency, this policy 
            provides detailed information about how and when we use cookies.
          </p>

          <h2>What is a cookie?</h2>
          <p>
            A cookie is a small file placed onto your device that enables Traverse Minds 
            features and functionality. For example, cookies enable us to identify 
            your device, secure your access to our sites, and even help us know 
            if someone attempts to access your account from a different device.
          </p>

          <h2>How we use cookies</h2>
          <p>
            We use cookies for the following purposes:
          </p>
          <ul>
            <li><strong>Authentication:</strong> If you're signed into Traverse Minds, cookies help us show you the right information and personalize your experience.</li>
            <li><strong>Security:</strong> We use cookies to enable and support our security features, and to help us detect malicious activity.</li>
            <li><strong>Preferences:</strong> Cookies can tell us which language you prefer and what your communications preferences are.</li>
            <li><strong>Analytics:</strong> These cookies help us learn how well our site and services perform. We use these cookies to understand, improve, and research products, features, and services.</li>
          </ul>

          <h2>Third-party cookies</h2>
          <p>
            Our site may use third-party services such as Google Analytics to help 
            us understand how our site is used. These services may set their own 
            cookies in your browser. We do not control the use of these cookies 
            and you should check the relevant third party's website for more 
            information on how they use cookies.
          </p>

          <h2>Controlling cookies</h2>
          <p>
            Most browsers allow you to control cookies through their settings 
            preferences. However, if you limit the ability of websites to set 
            cookies, you may worsen your overall user experience, since it will 
            no longer be personalized to you.
          </p>

          <h2>Changes to this Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. If we make 
            significant changes, we will let you know through our website or 
            other communication channels.
          </p>

          <h2>Contact us</h2>
          <p>
            If you have any questions about our use of cookies, please contact 
            us at privacy@traverseminds.ug.
          </p>
        </div>
      </div>
    </main>
  );
}
