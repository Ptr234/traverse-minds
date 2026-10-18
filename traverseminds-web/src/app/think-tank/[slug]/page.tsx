import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import imageUrlBuilder from "@sanity/image-url";
import type { PortableTextBlock } from "next-sanity";
import { sanityClient } from "@/sanity/client";
import { getMagazineContent } from "@/lib/content";
import { divisionLabel } from "@/lib/divisions";
import { SITE_URL } from "@/lib/site";
import { SectionBar } from "@/components/magazine/SectionBar";
import { Article } from "@/components/magazine/Article";
import { PdfViewer } from "@/components/think-tank/PdfViewer";

const builder = imageUrlBuilder(sanityClient);

interface Author {
  name: string;
  role?: string;
  bio?: string;
  photoUrl?: string;
}

interface Report {
  title: string;
  abstract: string;
  publicationDate: string;
  authors?: Author[];
  pdfUrl?: string;
  body?: PortableTextBlock[];
  topics?: string[];
  countryCoverage?: string[];
  featuredImage?: { asset?: unknown; alt?: string };
}

async function getReport(slug: string): Promise<Report | null> {
  try {
    return await sanityClient.fetch(
      `*[_type == "report" && slug.current == $slug][0] {
        title, abstract, publicationDate, body, topics, countryCoverage, featuredImage,
        "authors": authors[]->{name, role, bio, "photoUrl": photo.asset->url},
        "pdfUrl": pdfFile.asset->url
      }`,
      { slug }
    );
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const slugs: { slug: string }[] = await sanityClient.fetch(`*[_type == "report"]{ "slug": slug.current }`);
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

// Some report titles were entered in capitals in the CMS
const displayTitle = (t: string) =>
  /^[^a-z]+$/.test(t.trim()) ? t.trim().toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase()) : t.trim();

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const report = await getReport(slug);
  if (!report) return { title: "Report Not Found" };
  return {
    title: `${displayTitle(report.title)} | Think Tank`,
    description: report.abstract.split(/\n\n+/)[0],
    openGraph: report.featuredImage?.asset
      ? { images: [builder.image(report.featuredImage).width(1200).height(630).fit("crop").url()] }
      : undefined,
  };
}

export default async function ReportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [report, { reports }] = await Promise.all([getReport(slug), getMagazineContent()]);
  if (!report) notFound();

  const href = `/think-tank/${slug}`;
  const title = displayTitle(report.title);
  const [standfirst, ...abstractRest] = report.abstract.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  const lead = report.authors?.[0];
  const pdfFilename = `${title.replace(/[^a-zA-Z0-9\s-]/g, "").trim().replace(/\s+/g, "-")}-Traverse-Minds.pdf`;
  const countries = report.countryCoverage?.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(", ");

  return (
    <>
      <SectionBar />
      <Article
        data={{
          crumbs: [
            { name: "Home", href: "/" },
            { name: "Think Tank", href: "/think-tank" },
            { name: title, href },
          ],
          kicker: divisionLabel(report.topics?.[0]) || "Research",
          title,
          dek: standfirst,
          author: lead ? { name: report.authors!.map((a) => a.name).join(", "), title: report.authors!.length === 1 ? lead.role : undefined, photo: report.authors!.length === 1 ? lead.photoUrl : null } : undefined,
          date: report.publicationDate,
          image: report.featuredImage?.asset ? builder.image(report.featuredImage).width(2200).fit("max").auto("format").url() : null,
          imageCaption: report.featuredImage?.alt,
          body: report.body,
          bodyFallback: abstractRest,
          meta: [
            ...(countries ? [{ label: "Coverage", value: countries }] : []),
            ...(report.topics?.length ? [{ label: "Topics", value: report.topics.map(divisionLabel).join(", ") }] : []),
          ],
          ctaKey: "commission",
          url: `${SITE_URL}${href}/`,
        }}
        related={reports.filter((r) => r.href !== href)}
        relatedTitle="More research"
        relatedHref="/think-tank"
      >
        {report.pdfUrl && (
          <div className="mt-12 border-t-2 border-black pt-3">
            <p className="mb-4 font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-black">The full report</p>
            <PdfViewer pdfUrl={report.pdfUrl} title={title} filename={pdfFilename} />
          </div>
        )}

        {report.authors && report.authors.length > 0 && (
          <section className="mt-12 border-t-2 border-black pt-3" aria-label="About the authors">
            <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-black">
              {report.authors.length === 1 ? "About the author" : "About the authors"}
            </p>
            <ul className="mt-4">
              {report.authors.map((a) => (
                <li key={a.name} className="flex gap-4 border-b border-black/10 py-5 last:border-b-0">
                  {a.photoUrl ? (
                    <Image src={a.photoUrl} alt="" width={56} height={56} className="h-14 w-14 shrink-0 rounded-full object-cover" />
                  ) : (
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent font-serif text-xl font-semibold text-white" aria-hidden>
                      {a.name.charAt(0)}
                    </span>
                  )}
                  <div>
                    <p className="font-serif text-[18px] font-semibold text-black">{a.name}</p>
                    {a.role && <p className="text-[13px] text-accent">{a.role}</p>}
                    {a.bio && <p className="mt-2 text-[15px] leading-relaxed text-gn-400">{a.bio}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Article>
    </>
  );
}
