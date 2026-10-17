import { Metadata } from "next";
import { ServiceDetailLayout } from "@/components/security/ServiceDetailLayout";
import { LegalReference } from "@/components/security/LegalReference";
import { CitedStats } from "@/components/ui/CitedStats";
import { getStatistics } from "@/lib/statistics";
import { DATA_LAW_CASES, DATA_LAW_TOPICS, getCaseSummaries, getLegislationAnswers } from "@/lib/lawsafrica";

export const metadata: Metadata = {
  title: "Regulatory Advisory | Traverse Security",
  description: "Expert guidance on Uganda PDPA 2019, NIST, and African data protection frameworks.",
};

const serviceData = {
  title: "Regulatory Advisory",
  description: "Expert guidance on Uganda PDPA 2019, NIST, and African data protection frameworks.",
  image: "/imagestouse/tra.jpeg",
  content: {
    overview: "Navigating the complex landscape of data protection and cybersecurity regulations is a challenge for any organization. We provide expert advisory services to ensure you comply with the Uganda Data Protection and Privacy Act 2019, NIST, and other regional frameworks.",
    features: [
      {
        title: "Uganda PDPA 2019 Compliance",
        description: "Comprehensive review and implementation support for the Data Protection and Privacy Act requirements."
      },
      {
        title: "NIST Framework Alignment",
        description: "Adopting the NIST Cybersecurity Framework to improve your organization's security posture and resilience."
      },
      {
        title: "African Data Protection",
        description: "Guidance on cross-border data transfer and compliance with various African data protection laws."
      },
      {
        title: "Policy Development",
        description: "Creating and updating organizational policies to reflect the latest regulatory requirements and best practices."
      }
    ],
    benefits: [
      "Ensure legal compliance and avoid heavy fines",
      "Standardize security practices across your organization",
      "Build trust with partners and regulators",
      "Stay ahead of evolving regulatory requirements"
    ]
  }
};

export default async function RegulatoryAdvisoryPage() {
  const [answers, cases, stats] = await Promise.all([
    getLegislationAnswers(DATA_LAW_TOPICS),
    getCaseSummaries(DATA_LAW_CASES),
    getStatistics("regulatory-advisory", 4),
  ]);
  return (
    <ServiceDetailLayout {...serviceData}>
      <CitedStats stats={stats} eyebrow="Enforcement" title="Data protection in practice" />
      <LegalReference answers={answers} cases={cases} />
    </ServiceDetailLayout>
  );
}
