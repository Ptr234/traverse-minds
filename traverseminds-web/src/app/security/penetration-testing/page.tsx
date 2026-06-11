import { Metadata } from "next";
import { ServiceDetailLayout } from "@/components/security/ServiceDetailLayout";

export const metadata: Metadata = {
  title: "Penetration Testing | Traverse Security",
  description: "Simulated attacks on your networks, applications, and infrastructure to identify vulnerabilities before real attackers do.",
};

const serviceData = {
  title: "Penetration Testing",
  description: "Simulated attacks on your networks, applications, and infrastructure to identify vulnerabilities before real attackers do.",
  image: "/imagestouse/cyber.jpg",
  content: {
    overview: "Our penetration testing services go beyond automated scanning. We simulate real-world attack patterns to identify security gaps in your infrastructure, web applications, and mobile platforms. By thinking like an adversary, we help you fix vulnerabilities before they can be exploited by malicious actors.",
    features: [
      {
        title: "Network Infrastructure Testing",
        description: "Comprehensive assessment of internal and external networks, including wireless infrastructure and cloud environments."
      },
      {
        title: "Web & Mobile App Testing",
        description: "Deep-dive analysis of your applications to identify OWASP Top 10 vulnerabilities and logic flaws."
      },
      {
        title: "API Security Assessment",
        description: "Rigorous testing of your backend services and integrations to ensure data integrity and secure communication."
      },
      {
        title: "Social Engineering",
        description: "Testing your human firewall through phishing simulations and physical security assessments."
      }
    ],
    benefits: [
      "Identify high-risk vulnerabilities before a breach",
      "Meet regulatory compliance requirements (BoU, PDPA)",
      "Detailed remediation roadmap for your IT team",
      "Validate the effectiveness of existing security controls"
    ]
  }
};

export default function PenetrationTestingPage() {
  return <ServiceDetailLayout {...serviceData} />;
}
