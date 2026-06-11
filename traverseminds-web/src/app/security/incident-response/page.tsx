import { Metadata } from "next";
import { ServiceDetailLayout } from "@/components/security/ServiceDetailLayout";

export const metadata: Metadata = {
  title: "Incident Response | Traverse Security",
  description: "Rapid containment, investigation, and recovery when a breach occurs. 24-hour response commitment.",
};

const serviceData = {
  title: "Incident Response",
  description: "Rapid containment, investigation, and recovery when a breach occurs. 24-hour response commitment.",
  image: "/imagestouse/tec.jpg",
  content: {
    overview: "In the event of a security breach, every second counts. Our incident response team provides rapid support to contain threats, investigate the root cause, and restore your operations securely. We offer a 24-hour commitment to ensure your business resilience.",
    features: [
      {
        title: "Threat Containment",
        description: "Immediate actions to isolate compromised systems and prevent further damage or data exfiltration."
      },
      {
        title: "Forensic Investigation",
        description: "Deep-dive analysis to understand how the breach occurred and what data was accessed."
      },
      {
        title: "Recovery & Restoration",
        description: "Safe restoration of systems and data from backups, ensuring no persistent threats remain."
      },
      {
        title: "Post-Incident Analysis",
        description: "Detailed report with recommendations to prevent future occurrences and improve security posture."
      }
    ],
    benefits: [
      "Minimize financial and reputational damage",
      "Expert guidance through high-pressure situations",
      "Compliance with data breach notification laws (PDPA)",
      "Improved resilience against future attacks"
    ]
  }
};

export default function IncidentResponsePage() {
  return <ServiceDetailLayout {...serviceData} />;
}
