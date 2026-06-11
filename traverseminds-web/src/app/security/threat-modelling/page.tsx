import { Metadata } from "next";
import { ServiceDetailLayout } from "@/components/security/ServiceDetailLayout";

export const metadata: Metadata = {
  title: "Threat Modelling | Traverse Security",
  description: "Systematic identification of threats to your systems and data, with prioritised mitigation strategies.",
};

const serviceData = {
  title: "Threat Modelling",
  description: "Systematic identification of threats to your systems and data, with prioritised mitigation strategies.",
  image: "/imagestouse/div-cybersecurity.jpeg",
  content: {
    overview: "Threat modelling is a proactive approach to security that identifies potential threats at the design stage. By mapping out your systems and data flows, we help you understand where your most critical assets are vulnerable and how to protect them effectively.",
    features: [
      {
        title: "Asset Identification",
        description: "Cataloguing all critical data, systems, and users within your organization's scope."
      },
      {
        title: "Attack Surface Mapping",
        description: "Visualizing all potential entry points and communication paths that an attacker could exploit."
      },
      {
        title: "Threat Analysis",
        description: "Using frameworks like STRIDE to systematically identify potential security threats to each component."
      },
      {
        title: "Mitigation Planning",
        description: "Developing prioritized strategies to address identified threats based on risk and impact."
      }
    ],
    benefits: [
      "Secure by design -- identify flaws before code is written",
      "Cost-effective security by focusing on high-risk areas",
      "Better communication between security and development teams",
      "Informed decision-making for security investments"
    ]
  }
};

export default function ThreatModellingPage() {
  return <ServiceDetailLayout {...serviceData} />;
}
