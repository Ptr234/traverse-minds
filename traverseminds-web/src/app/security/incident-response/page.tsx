import { Metadata } from "next";
import { ServiceDetailLayout } from "@/components/security/ServiceDetailLayout";
import { getService, serviceLayoutProps, serviceMetadata } from "@/lib/cms";
import { LegalReference } from "@/components/security/LegalReference";
import { getCaseSummaries, getLegislationAnswers } from "@/lib/lawsafrica";

export async function generateMetadata(): Promise<Metadata> {
  return serviceMetadata(await getService("incident-response"));
}

export default async function IncidentResponsePage() {
  const serviceData = serviceLayoutProps(await getService("incident-response"));
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
