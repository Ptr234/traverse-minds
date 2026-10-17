import { Metadata } from "next";
import { ServiceDetailLayout } from "@/components/security/ServiceDetailLayout";
import { getService, serviceLayoutProps, serviceMetadata } from "@/lib/cms";
import { ThreatLandscape } from "@/components/security/ThreatLandscape";

export async function generateMetadata(): Promise<Metadata> {
  return serviceMetadata(await getService("threat-modelling"));
}

export default async function ThreatModellingPage() {
  const serviceData = serviceLayoutProps(await getService("threat-modelling"));
  return (
    <ServiceDetailLayout {...serviceData}>
      <ThreatLandscape />
    </ServiceDetailLayout>
  );
}
