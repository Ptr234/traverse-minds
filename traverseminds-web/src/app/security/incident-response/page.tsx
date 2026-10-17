import { Metadata } from "next";
import { ServiceDetailLayout } from "@/components/security/ServiceDetailLayout";
import { LegalReference } from "@/components/security/LegalReference";
import { getCaseSummaries, getLegislationAnswers } from "@/lib/lawsafrica";

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

export default async function IncidentResponsePage() {
  const [answers, cases] = await Promise.all([
    getLegislationAnswers([
      { question: "What must we do after a data breach?", query: "personal data breach notification" },
      { question: "Is unauthorised access to a system a crime?", query: "unauthorised access to a computer" },
    ]),
    getCaseSummaries(["electronic evidence seized without warrant inadmissible"]),
  ]);
  return (
    <ServiceDetailLayout {...serviceData}>
      <LegalReference
        answers={answers}
        cases={cases}
        eyebrow="Legal Obligations"
        title="After a breach, the law sets the clock"
        intro="A security incident is also a legal event. These are the provisions that apply the moment personal data is exposed, and how Ugandan courts treat the evidence you collect."
      />
    </ServiceDetailLayout>
  );
}
