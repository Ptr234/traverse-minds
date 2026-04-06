import { sanityClient } from "@/sanity/client";
import Link from "next/link";
import { Download, Calendar, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";

interface Report {
  _id: string;
  title: string;
  slug: { current: string };
  abstract: string;
  publicationDate: string;
  authors: { name: string }[];
  featuredImage: unknown;
  pdfUrl: string;
  topics: string[];
}

async function getReports() {
  try {
    const query = `*[_type == "report"] | order(publicationDate desc) [0...6] {
      _id, title, slug, abstract, publicationDate,
      "authors": authors[]->{name},
      featuredImage,
      "pdfUrl": pdfFile.asset->url,
      topics
    }`;
    return await sanityClient.fetch(query);
  } catch {
    return [];
  }
}

export async function Publications() {
  const reports = await getReports();

  return (
    <section id="publications" style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
      <div className="container-max relative z-10">
        <SectionReveal variant="clip-left" className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between mb-14">
          <div className="max-w-2xl">
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Research</p>
            <TextReveal variant="slide-up" className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000" }}>
              Latest Publications
            </TextReveal>
            <p className="mt-3" style={{ color: "#515459" }}>
              Independent analysis and policy recommendations for Africa&apos;s digital economy.
            </p>
          </div>
          <Button variant="outline" href="/think-tank/archive">View Full Archive</Button>
        </SectionReveal>

        <SectionReveal variant="fade-up" staggerChildren={0.12} className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reports.length > 0 ? (
            reports.map((report: Report) => (
              <RevealItem
                key={report._id}
                variant="slide-up"
              >
              <div className="group flex flex-col overflow-hidden border bg-white" style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1), 0 2px 2px 0 rgba(0,0,0,0.15), 0 1px 0 0 rgba(0,0,0,0.05)" }}>
                <div className="relative h-44 w-full bg-primary/3 flex items-center justify-center">
                  <FileText className="h-12 w-12 text-primary/10" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {report.topics?.slice(0, 2).map((topic) => (
                      <span
                        key={topic}
                        className="bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white"
                        style={{ borderRadius: 999 }}
                      >
                        {topic.replace("-", " ")}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-4 text-xs" style={{ color: "#919499" }}>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(report.publicationDate).toLocaleDateString()}
                    </span>
                    {report.authors?.[0] && (
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {report.authors[0].name}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 font-display text-lg font-bold line-clamp-2" style={{ color: "#000", transition: "color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
                    {report.title}
                  </h3>
                  <p className="mt-2 text-sm line-clamp-3 leading-relaxed" style={{ color: "#515459" }}>
                    {report.abstract}
                  </p>

                  <div className="mt-auto pt-5 flex items-center justify-between" style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
                    <Link
                      href={`/think-tank/${report.slug.current}`}
                      className="text-sm font-semibold text-accent"
                      style={{ transition: "color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                    >
                      Read Online
                    </Link>
                    {report.pdfUrl && (
                      <a
                        href={report.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 bg-primary/5 px-3 py-1.5 text-xs font-semibold"
                        style={{ borderRadius: 8, color: "#000", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                      >
                        <Download className="h-3 w-3" /> PDF
                      </a>
                    )}
                  </div>
                </div>
              </div>
              </RevealItem>
            ))
          ) : (
            <RevealItem variant="fade-blur" className="col-span-full">
              <div className="border-2 border-dashed py-16 text-center" style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)" }}>
                <FileText className="mx-auto h-10 w-10 mb-4" style={{ color: "#919499" }} />
                <p style={{ color: "#919499" }}>No reports published yet. Check back soon.</p>
              </div>
            </RevealItem>
          )}
        </SectionReveal>
      </div>
    </section>
  );
}
