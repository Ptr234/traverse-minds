import { sanityClient } from "@/sanity/client";
import Link from "next/link";
import { Download, Calendar, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Report {
  _id: string;
  title: string;
  slug: { current: string };
  abstract: string;
  publicationDate: string;
  authors: { name: string }[];
  featuredImage: any;
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
    <section id="publications" className="relative bg-white section-padding overflow-hidden">
      <div className="absolute inset-0 dot-grid-light opacity-30 pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">Research</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Latest Publications
            </h2>
            <p className="mt-3 text-brand-medium/60">
              Independent analysis and policy recommendations for East Africa&apos;s digital economy.
            </p>
          </div>
          <Button variant="outline" href="/think-tank/archive">View Full Archive</Button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reports.length > 0 ? (
            reports.map((report: Report) => (
              <div
                key={report._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border-light bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated hover:border-accent/15"
              >
                <div className="relative h-44 w-full bg-primary/3 flex items-center justify-center">
                  <FileText className="h-12 w-12 text-primary/10" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {report.topics?.slice(0, 2).map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white"
                      >
                        {topic.replace("-", " ")}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-4 text-xs text-brand-muted">
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

                  <h3 className="mt-3 font-display text-lg font-bold text-primary line-clamp-2 group-hover:text-accent transition-colors">
                    {report.title}
                  </h3>
                  <p className="mt-2 text-sm text-brand-medium/50 line-clamp-3 leading-relaxed">
                    {report.abstract}
                  </p>

                  <div className="mt-auto pt-5 flex items-center justify-between border-t border-border-light">
                    <Link
                      href={`/think-tank/${report.slug.current}`}
                      className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
                    >
                      Read Online
                    </Link>
                    {report.pdfUrl && (
                      <a
                        href={report.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-accent hover:text-white transition-all"
                      >
                        <Download className="h-3 w-3" /> PDF
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border-2 border-dashed border-border-light py-16 text-center">
              <FileText className="mx-auto h-10 w-10 text-brand-muted/30 mb-4" />
              <p className="text-brand-muted">No reports published yet. Check back soon.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
