import { Metadata } from "next";
import { ServiceDetailLayout } from "@/components/security/ServiceDetailLayout";
import { getService, serviceLayoutProps, serviceMetadata } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  return serviceMetadata(await getService("penetration-testing"));
}

export default async function PenetrationTestingPage() {
  const serviceData = serviceLayoutProps(await getService("penetration-testing"));
  return <ServiceDetailLayout {...serviceData} />;
}
