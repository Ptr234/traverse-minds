import { Metadata } from "next";
import { ServiceDetailLayout } from "@/components/security/ServiceDetailLayout";
import { getService, serviceLayoutProps, serviceMetadata } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  return serviceMetadata(await getService("iso-27001-compliance"));
}

export default async function ISO27001Page() {
  const serviceData = serviceLayoutProps(await getService("iso-27001-compliance"));
  return <ServiceDetailLayout {...serviceData} />;
}
