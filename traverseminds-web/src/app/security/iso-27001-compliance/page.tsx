import { Metadata } from "next";
import { ServiceDetailLayout } from "@/components/security/ServiceDetailLayout";

export const metadata: Metadata = {
  title: "ISO 27001 Compliance | Traverse Security",
  description: "End-to-end support for achieving and maintaining ISO 27001 certification -- gap analysis, documentation, and audit preparation.",
};

const serviceData = {
  title: "ISO 27001 Compliance",
  description: "End-to-end support for achieving and maintaining ISO 27001 certification -- gap analysis, documentation, and audit preparation.",
  image: "/imagestouse/vde.jpeg",
  content: {
    overview: "ISO 27001 is the international standard for information security management systems (ISMS). We provide comprehensive guidance to help your organisation implement the necessary controls, documentation, and processes to achieve and maintain this prestigious certification.",
    features: [
      {
        title: "Gap Analysis",
        description: "Initial assessment to identify where your current security posture stands against ISO 27001 requirements."
      },
      {
        title: "ISMS Implementation",
        description: "Designing and deploying a robust Information Security Management System tailored to your business operations."
      },
      {
        title: "Documentation Support",
        description: "Assistance in developing all required policies, procedures, and records for the certification process."
      },
      {
        title: "Internal Audit & Training",
        description: "Conducting pre-certification audits and training your staff on ISO 27001 standards and responsibilities."
      }
    ],
    benefits: [
      "Global recognition of your security standards",
      "Enhanced customer trust and competitive advantage",
      "Systematic management of information security risks",
      "Easier compliance with local and international regulations"
    ]
  }
};

export default function ISO27001Page() {
  return <ServiceDetailLayout {...serviceData} />;
}
