import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag, Download } from "lucide-react";
import { PortableText } from "next-sanity";
import { sanityClient } from "@/sanity/client";
import { PageTransition } from "@/components/ui/PageTransition";
import { Button } from "@/components/ui/Button";

interface Author {
  name: string;
  role?: string;
  bio?: string;
  photoUrl?: string;
}

interface Report {
  _id: string;
  title: string;
  slug: { current: string };
  abstract: string;
  publicationDate: string;
  authors: Author[];
  pdfUrl: string;
  body?: unknown[];
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

async function getReport(slug: string): Promise<Report | null> {
  try {
    const query = `*[_type == "report" && slug.current == $slug][0] {
      _id, title, slug, abstract, publicationDate,
      "authors": authors[]->{name, role, bio, "photoUrl": photo.asset->url},
      "pdfUrl": pdfFile.asset->url,
      body,
      topics,
      countryCoverage
    }`;
    return await sanityClient.fetch(query, { slug });
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const slugs: { slug: string }[] = await sanityClient.fetch(
      `*[_type == "report"]{ "slug": slug.current }`
    );
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const report = await getReport(slug);
  if (!report) return { title: "Report Not Found" };
  return {
    title: `${report.title} | Think Tank — Traverse Minds Africa`,
    description: report.abstract,
  };
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = await getReport(slug);

  if (!report) notFound();

  const pdfFilename = `${report.title.replace(/[^a-zA-Z0-9\s-]/g, "").trim().replace(/\s+/g, "-")}-Traverse-Minds.pdf`;

  return (
    <PageTransition>
      {/* Header */}
      <section style={{ background: "#0a0a0a", paddingTop: 120, paddingBottom: 64 }}>
        <div className="container-max max-w-4xl">
          <Link
            href="/think-tank"
            className="inline-flex items-center gap-2 text-sm mb-8"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Think Tank
          </Link>

          {/* Topics */}
          {report.topics?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {report.topics.map((topic) => (
                <span
                  key={topic}
                  className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white"
                  style={{ background: "#ff4c00", borderRadius: 999 }}
                >
                  {TOPIC_LABELS[topic] ?? topic}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            {report.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mt-6" style={{ color: "rgba(255,255,255,0.4)" }}>
            {report.publicationDate && (
              <span className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                {new Date(report.publicationDate).toLocaleDateString("en-UG", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </span>
            )}
            {report.countryCoverage?.length > 0 && (
              <span className="flex items-center gap-2 text-sm">
                <Tag className="h-4 w-4" />
                {report.countryCoverage.join(", ")}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: "#ffffff", paddingTop: 56, paddingBottom: 80 }}>
        <div className="container-max max-w-4xl">

          {/* Abstract */}
          <div className="mb-10 p-8" style={{ background: "#f0f1f4", borderRadius: 8, borderLeft: "4px solid #ff4c00" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#ff4c00" }}>Abstract</p>
            <p className="text-base leading-relaxed" style={{ color: "#333" }}>{report.abstract}</p>
          </div>

          {/* Inline PDF Viewer */}
          {report.pdfUrl && (
            <div className="mb-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#919499" }}>Read the Report</p>
              <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid rgba(0,0,0,0.12)" }}>
                <iframe
                  src={report.pdfUrl}
                  title={report.title}
                  width="100%"
                  style={{ height: "80vh", minHeight: 520, display: "block", background: "#f0f1f4" }}
                />
              </div>
              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-sm" style={{ color: "#919499" }}>
                  PDF not displaying? Try the download below.
                </p>
                <a
                  href={`${report.pdfUrl}?dl=${encodeURIComponent(pdfFilename)}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white shrink-0"
                  style={{ background: "#ff4c00", borderRadius: 6 }}
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
              </div>
            </div>
          )}

          {/* Report Body */}
          {report.body && report.body.length > 0 && (
            <article className="mb-10 prose max-w-none prose-headings:font-display prose-headings:text-[#000] prose-p:text-[#333] prose-p:leading-relaxed prose-a:text-[#ff4c00] prose-a:no-underline hover:prose-a:underline prose-strong:text-black prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-blockquote:border-l-[#ff4c00] prose-blockquote:text-[#515459]">
              <PortableText value={report.body as Parameters<typeof PortableText>[0]["value"]} />
            </article>
          )}

          {/* Author cards */}
          {report.authors?.length > 0 && (
            <div className="mb-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#919499" }}>
                {report.authors.length === 1 ? "About the Author" : "About the Authors"}
              </p>
              <div className="flex flex-col gap-4">
                {report.authors.map((author) => (
                  <div
                    key={author.name}
                    className="flex items-start gap-4 p-5"
                    style={{ background: "#f0f1f4", borderRadius: 8 }}
                  >
                    {author.photoUrl ? (
                      <Image
                        src={author.photoUrl}
                        alt={author.name}
                        width={56}
                        height={56}
                        className="rounded-full object-cover shrink-0"
                        style={{ border: "2px solid rgba(0,0,0,0.08)" }}
                      />
                    ) : (
                      <div className="h-14 w-14 rounded-full shrink-0 flex items-center justify-center text-lg font-bold text-white" style={{ background: "#ff4c00" }}>
                        {author.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold" style={{ color: "#000" }}>{author.name}</p>
                      {author.role && <p className="text-sm mt-0.5" style={{ color: "#ff4c00" }}>{author.role}</p>}
                      {author.bio && <p className="text-sm mt-2 leading-relaxed" style={{ color: "#515459" }}>{author.bio}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: 32 }}>
            <Button variant="outline" href="/think-tank">Back to Think Tank</Button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
