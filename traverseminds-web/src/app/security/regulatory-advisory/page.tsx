import { Metadata } from "next";
import { ServiceDetailLayout } from "@/components/security/ServiceDetailLayout";
import { getService, serviceLayoutProps, serviceMetadata } from "@/lib/cms";
import { LegalReference } from "@/components/security/LegalReference";
import { CitedStats } from "@/components/ui/CitedStats";
import { getStatistics } from "@/lib/statistics";
import { DATA_LAW_CASES, DATA_LAW_TOPICS, getCaseSummaries, getLegislationAnswers } from "@/lib/lawsafrica";

export async function generateMetadata(): Promise<Metadata> {
  return serviceMetadata(await getService("regulatory-advisory"));
}

export default async function RegulatoryAdvisoryPage() {
  const serviceData = serviceLayoutProps(await getService("regulatory-advisory"));
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
