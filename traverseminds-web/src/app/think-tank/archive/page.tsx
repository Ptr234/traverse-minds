import type { Metadata } from "next";
import Link from "next/link";
import { SectionBar } from "@/components/magazine/SectionBar";
import { PageHeader } from "@/components/magazine/PageHeader";
import Image from "next/image";
import { Calendar, User, FileText } from "lucide-react";
import { PdfDownloadButton } from "@/components/ui/PdfDownloadButton";
import { sanityClient } from "@/sanity/client";
import { PageTransition } from "@/components/ui/PageTransition";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Research Archive | Think Tank",
  description: "Full archive of Traverse Minds Think Tank research reports, policy briefs, and publications on Africa's digital economy.",
};

interface Report {
  _id: string;
  title: string;
  slug: { current: string };
  abstract: string;
  publicationDate: string;
  authors: { name: string }[];
  featuredImageUrl: string | null;
  pdfUrl: string;
  topics: string[];
  countryCoverage: string[];
}

const TOPIC_LABELS: Record<string, string> = {
  "data-protection": "Data Protection",
  "ai-governance": "AI Governance",
  "digital-id": "Digital ID",
  "civic-tech": "Civic Tech",
  "open-gov": "Open Government",
  "cybersecurity": "Cybersecurity",
};

async function getAllReports(): Promise<Report[]> {
  try {
    const query = `*[_type == "report"] | order(publicationDate desc) {
      _id, title, slug, abstract, publicationDate,
      "authors": authors[]->{name},
      "featuredImageUrl": featuredImage.asset->url,
      "pdfUrl": pdfFile.asset->url,
      topics,
      countryCoverage
    }`;
    return await sanityClient.fetch(query);
  } catch {
    return [];
  }
}

export default async function ArchivePage() {
  const reports = await getAllReports();

  return (
    <PageTransition>
      {/* Header */}
      <SectionBar />
      <PageHeader
        crumbs={[{ name: "Home", href: "/" }, { name: "Think Tank", href: "/think-tank" }, { name: "Archive", href: "/think-tank/archive" }]}
        kicker="Research archive"
        title="All publications"
        dek="Independent analysis and policy recommendations for Africa's digital economy."
      />

      {/* Archive Grid */}
      <section style={{ background: "#ffffff", paddingTop: 56, paddingBottom: 80 }}>
        <div className="container-max px-6 lg:px-8">
          {reports.length > 0 ? (
            <SectionReveal variant="fade-up" staggerChildren={0.08} className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {reports.map((report) => (
                <RevealItem key={report._id} variant="slide-up">
                  <div className="group flex flex-col h-full">
                    <div className="relative h-44 w-full overflow-hidden flex items-center justify-center" style={{ background: "#e1e4e9" }}>
                      {report.featuredImageUrl ? (
                        <Image
                          src={report.featuredImageUrl}
                          alt={report.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <FileText className="h-10 w-10" style={{ color: "rgba(0,0,0,0.15)" }} />
                      )}
                    </div>

                    <div className="flex flex-1 flex-col pt-5">
                      {report.topics && report.topics.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-2">
                          {report.topics.slice(0, 2).map((topic) => (
                            <span
                              key={topic}
                              className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent"
                            >
                              {TOPIC_LABELS[topic] ?? topic}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-4 text-xs" style={{ color: "#6b6e73" }}>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {report.publicationDate ? new Date(report.publicationDate).toLocaleDateString("en-UG", { year: "numeric", month: "short", day: "numeric" }) : "—"}
                        </span>
                        {report.authors?.[0] && (
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {report.authors[0].name}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-3 font-display text-lg font-bold line-clamp-2" style={{ color: "#000" }}>
                        {report.title}
                      </h3>
                      <p className="mt-2 text-sm line-clamp-3 leading-relaxed" style={{ color: "#515459" }}>
                        {report.abstract}
                      </p>

                      <div className="mt-auto pt-5 flex items-center justify-between" style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
                        <Link
                          href={`/think-tank/${report.slug.current}`}
                          className="text-sm font-semibold text-accent hover:underline"
                        >
                          Read Online
                        </Link>
                        {report.pdfUrl && (
                          <PdfDownloadButton
                            pdfUrl={report.pdfUrl}
                            filename={`${report.title.replace(/[^a-zA-Z0-9\s-]/g, "").trim().replace(/\s+/g, "-")}-Traverse-Minds.pdf`}
                            variant="card"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </SectionReveal>
          ) : (
            <div className="py-24 text-center border-2 border-dashed" style={{ borderRadius: 0, borderColor: "rgba(0,0,0,0.1)" }}>
              <FileText className="mx-auto h-12 w-12 mb-4" style={{ color: "#d1d1d1" }} />
              <p className="text-lg font-semibold" style={{ color: "#000" }}>No publications yet</p>
              <p className="mt-2 max-w-sm mx-auto text-sm" style={{ color: "#6b6e73" }}>
                Reports will appear here as they are published. Check back soon.
              </p>
              <div className="mt-8">
                <Button variant="outline" href="/think-tank">Back to Think Tank</Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
