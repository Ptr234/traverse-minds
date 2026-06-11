import { Metadata } from "next";
import { ServiceDetailLayout } from "@/components/security/ServiceDetailLayout";

export const metadata: Metadata = {
  title: "Bank of Uganda Audit | Traverse Security",
  description: "Cybersecurity assessments aligned with Bank of Uganda regulatory requirements for supervised financial institutions.",
};

const serviceData = {
  title: "Bank of Uganda Audit",
  description: "Cybersecurity assessments aligned with Bank of Uganda regulatory requirements for supervised financial institutions.",
  image: "/imagestouse/bfe.jpeg",
  content: {
    overview: "Financial institutions in Uganda must adhere to strict cybersecurity guidelines issued by the Bank of Uganda. We provide specialized audit services to ensure your organization meets all regulatory mandates, from risk management to incident reporting protocols.",
    features: [
      {
        title: "Regulatory Compliance Audit",
        description: "Review of your cybersecurity framework against the latest BoU guidelines for supervised financial institutions."
      },
      {
        title: "Third-Party Risk Assessment",
        description: "Assessing the security posture of your vendors and service providers as required by financial regulations."
      },
      {
        title: "BOU Guideline Alignment",
        description: "Ensuring all security controls, from access management to encryption, align with specific BoU technical requirements."
      },
      {
        title: "Audit Reporting",
        description: "Preparation of detailed audit reports and remediation plans suitable for submission to regulatory bodies."
      }
    ],
    benefits: [
      "Avoid regulatory penalties and sanctions",
      "Strengthen the security of financial transactions",
      "Identify and mitigate systemic financial risks",
      "Demonstrate commitment to financial sector stability"
    ]
  }
};

export default function BankOfUgandaAuditPage() {
  return <ServiceDetailLayout {...serviceData} />;
}
