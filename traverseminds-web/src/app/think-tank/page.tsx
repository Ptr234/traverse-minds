import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ResearchAreas } from "@/components/think-tank/ResearchAreas";
import { ReportDownloadForm } from "@/components/think-tank/ReportDownloadForm";
import { DigitalSnapshot } from "@/components/think-tank/DigitalSnapshot";
import { Button } from "@/components/ui/Button";
import { CitedStats } from "@/components/ui/CitedStats";
import { SectionBar } from "@/components/magazine/SectionBar";
import { PageHeader } from "@/components/magazine/PageHeader";
import { StorySection } from "@/components/magazine/StorySection";
import { SectionHeader } from "@/components/magazine/primitives";
import { sanityClient } from "@/sanity/client";
import { getMagazineContent } from "@/lib/content";
import { getDigitalSnapshot, getIndicatorTrend } from "@/lib/worldbank";
import { getStatistics } from "@/lib/statistics";

export const metadata: Metadata = {
  title: "Think Tank | Evidence-Driven Digital Policy Research in Africa",
  description: "Independent research on data protection, AI governance, digital rights and open government in Africa.",
};

const FALLBACK_REPORTS = [
  {
    id: "article-1",
    title: "Government Documents in the Dark",
    pdfUrl: "/PublicDocuments/Government%20Documents%20in%20the%20Dark%20-%20Traverse%20Think%20Tank%20-%20Article%201.pdf",
  },
];

async function getDownloadableReports() {
  try {
    const results = await sanityClient.fetch(`*[_type == "report" && defined(pdfFile)] | order(publicationDate desc) {
      "id": _id, title, "pdfUrl": pdfFile.asset->url
    }`);
    return results?.length > 0 ? results : FALLBACK_REPORTS;
  } catch {
    return FALLBACK_REPORTS;
  }
}

export default async function ThinkTankPage() {
  const [downloadable, content, snapshot, internetTrend, stats] = await Promise.all([
    getDownloadableReports(),
    getMagazineContent(),
    getDigitalSnapshot(),
    getIndicatorTrend("IT.NET.USER.ZS"),
    getStatistics("think-tank"),
  ]);

  return (
    <>
      <SectionBar />
      <PageHeader
        crumbs={[{ name: "Home", href: "/" }, { name: "Think Tank", href: "/think-tank" }]}
        kicker="Research"
        title="Think Tank"
        dek="Independent, evidence-driven research on data protection, digital rights, AI governance and open government in Africa."
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="primary" href="#commission">Commission research</Button>
          <Button variant="outline" href="/think-tank/archive">Browse the archive</Button>
        </div>
      </PageHeader>

      <StorySection title="Latest research" href="/think-tank/archive" stories={content.reports} layout="feature" />
      <ResearchAreas />
      {snapshot && <DigitalSnapshot data={snapshot} internetTrend={internetTrend} />}
      <CitedStats stats={stats} eyebrow="From Ugandan Sources" title="What national data tells us" background="#f0f1f4" />

      {/* Reports by email */}
      <section className="bg-primary text-white">
        <div className="container-max grid grid-cols-1 items-center gap-10 py-14 lg:grid-cols-2">
          <div>
            <div className="border-t-2 border-white/80 pt-3">
              <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.14em]">Reports by email</p>
            </div>
            <h2 className="mt-5 font-serif text-[32px] font-semibold leading-tight">Get any Think Tank report in your inbox</h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-white/60">
              Choose a report and we will email you the PDF. Free for organisations and researchers.
            </p>
          </div>
          <div className="w-full max-w-sm lg:justify-self-end">
            <ReportDownloadForm reports={downloadable} />
          </div>
        </div>
      </section>

      {/* Commission research */}
      <section id="commission" className="bg-white">
        <div className="container-max py-14">
          <SectionHeader title="Commission research" />
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <p className="font-serif text-[24px] leading-snug text-black lg:col-span-8">
              Need deep-dive analysis on a specific digital policy or civic-tech question? Our researchers take on
              commissioned projects, gap analyses and impact assessments.
            </p>
            <div className="lg:col-span-4 lg:justify-self-end">
              <Button variant="primary" size="lg" href="/contact?subject=research">
                Enquire about research services
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
