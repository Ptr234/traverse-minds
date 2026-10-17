import { Metadata } from "next";
import { ServiceDetailLayout } from "@/components/security/ServiceDetailLayout";
import { getService, serviceLayoutProps, serviceMetadata } from "@/lib/cms";
import { CitedStats } from "@/components/ui/CitedStats";
import { getStatistics } from "@/lib/statistics";

export async function generateMetadata(): Promise<Metadata> {
  return serviceMetadata(await getService("bank-of-uganda-audit"));
}

export default async function BankOfUgandaAuditPage() {
  const serviceData = serviceLayoutProps(await getService("bank-of-uganda-audit"));
  const stats = await getStatistics("bou-audit", 4);
  return (
    <ServiceDetailLayout {...serviceData}>
      <CitedStats stats={stats} eyebrow="The Sector, In Numbers" title="What is at stake in Uganda's financial system" />
    </ServiceDetailLayout>
  );
}
