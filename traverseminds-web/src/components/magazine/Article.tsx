import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextBlock } from "next-sanity";
import { Breadcrumbs, type Crumb } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import type { Story } from "@/lib/content";
import { Kicker, SectionHeader, StoryCard } from "./primitives";

/** Long-form reading styles: serif body, sans subheads, drop cap on the opening paragraph. */
export const ARTICLE_PROSE =
  "prose prose-lg max-w-none font-serif text-[19px] leading-[1.7] text-gn-200 " +
  "prose-headings:font-display prose-headings:text-black prose-headings:tracking-tight " +
  "prose-h2:text-[26px] prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-[21px] " +
  "prose-p:text-[19px] prose-p:leading-[1.7] prose-li:text-[19px] prose-p:text-gn-200 prose-strong:text-black prose-a:text-accent prose-a:underline-offset-2 " +
  "prose-blockquote:border-l-accent prose-blockquote:font-serif prose-blockquote:text-[24px] prose-blockquote:leading-snug prose-blockquote:not-italic prose-blockquote:text-black " +
  "prose-li:marker:text-accent " +
  "[&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:mt-1 " +
  "[&>p:first-of-type]:first-letter:font-serif [&>p:first-of-type]:first-letter:text-[72px] [&>p:first-of-type]:first-letter:leading-[0.8] [&>p:first-of-type]:first-letter:font-semibold [&>p:first-of-type]:first-letter:text-accent";

const CTA: Record<string, { title: string; text: string; label: string; href: string }> = {
  security: { title: "Need a security assessment?", text: "Our team evaluates your organisation's cybersecurity posture against real threats and Bank of Uganda requirements.", label: "Request an assessment", href: "/security#enquiry" },
  literacy: { title: "Train your team or school", text: "Practical cyber-safety and digital-skills programmes for schools, SMEs and public institutions.", label: "Explore programmes", href: "/literacy" },
  "public-record": { title: "Search Africa's public record", text: "Laws, judgments and gazettes in one searchable place. Early access is open to the waitlist.", label: "Join the waitlist", href: "/public-record#waitlist" },
  thinktank: { title: "Read the full research", text: "Independent analysis on data protection, digital rights and AI governance in Africa.", label: "Browse the Think Tank", href: "/think-tank" },
  commission: { title: "Commission research like this", text: "Our researchers take on commissioned projects, gap analyses and impact assessments for governments, funders and companies.", label: "Enquire about research", href: "/contact?subject=research" },
};

export type ArticleData = {
  crumbs: Crumb[];
  kicker: string;
  title: string;
  dek?: string;
  author?: { name: string; title?: string; photo?: string | null };
  date: string;
  readTime?: string;
  image?: string | null;
  imageCaption?: string;
  body?: PortableTextBlock[];
  tags?: string[];
  ctaKey?: string;
  url: string;
  /** Paragraphs to show when there is no rich body (e.g. a report abstract) */
  bodyFallback?: string[];
  /** Small facts shown under the byline, e.g. country coverage */
  meta?: { label: string; value: string }[];
};

function ShareLinks({ url, title }: { url: string; title: string }) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: "X", href: `https://x.com/intent/post?url=${u}&text=${t}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    { label: "Email", href: `mailto:?subject=${t}&body=${u}` },
  ];
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px]">
      <span className="font-bold uppercase tracking-wider text-gn-500">Share</span>
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="text-gn-300 underline-offset-4 hover:text-accent hover:underline">
          {l.label}
        </a>
      ))}
    </div>
  );
}

export function Article({
  data,
  related,
  relatedTitle = "More analysis",
  relatedHref = "/blog",
  children,
}: {
  data: ArticleData;
  related: Story[];
  relatedTitle?: string;
  relatedHref?: string;
  /** Extra content after the body, e.g. a PDF viewer or author bios */
  children?: React.ReactNode;
}) {
  const cta = data.ctaKey ? CTA[data.ctaKey] : undefined;
  const date = new Date(data.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <article>
      <header className="container-max pt-8">
        <div className="mx-auto max-w-[760px]">
          <Breadcrumbs items={data.crumbs} />
          <Kicker className="mt-8">{data.kicker}</Kicker>
          <h1 className="mt-3 font-serif text-[36px] font-semibold leading-[1.08] tracking-[-0.01em] text-black md:text-[52px]">{data.title}</h1>
          {data.dek && <p className="mt-5 text-[21px] leading-relaxed text-gn-400">{data.dek}</p>}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-black/15 py-4">
            <div className="flex items-center gap-3">
              {data.author?.photo && (
                <span className="relative h-11 w-11 overflow-hidden rounded-full bg-gn-800">
                  <Image src={data.author.photo} alt="" fill className="object-cover" sizes="44px" />
                </span>
              )}
              <div className="text-[14px] leading-tight">
                {data.author && <p className="font-semibold text-black">By {data.author.name}</p>}
                <p className="mt-1 text-gn-500">
                  {[data.author?.title, date, data.readTime].filter(Boolean).join(" · ")}
                </p>
              </div>
            </div>
            <ShareLinks url={data.url} title={data.title} />
          </div>
          {data.meta && data.meta.length > 0 && (
            <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-[13px]">
              {data.meta.map((m) => (
                <div key={m.label} className="flex gap-2">
                  <dt className="font-bold uppercase tracking-wider text-gn-500">{m.label}</dt>
                  <dd className="text-gn-300">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </header>

      {data.image && (
        <figure className="container-max mt-10">
          <div className="relative mx-auto aspect-[16/9] max-w-[1100px] overflow-hidden bg-gn-800">
            <Image src={data.image} alt={data.imageCaption ?? ""} fill priority className="object-cover" sizes="(max-width: 1140px) 100vw, 1100px" />
          </div>
          {data.imageCaption && <figcaption className="mx-auto mt-3 max-w-[1100px] text-[13px] text-gn-500">{data.imageCaption}</figcaption>}
        </figure>
      )}

      <div className="container-max py-12">
        <div className="mx-auto max-w-[680px]">
          {data.body?.length ? (
            <div className={ARTICLE_PROSE}>
              <PortableText value={data.body} />
            </div>
          ) : data.bodyFallback?.length ? (
            <div className={ARTICLE_PROSE}>
              {data.bodyFallback.map((para, i) => <p key={i}>{para}</p>)}
            </div>
          ) : null}

          {children}

          {data.tags && data.tags.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-2">
              {data.tags.map((t) => (
                <li key={t} className="border border-black/15 px-3 py-1 text-[13px] text-gn-400">{t}</li>
              ))}
            </ul>
          )}

          <div className="mt-10 border-t border-black/15 pt-6">
            <ShareLinks url={data.url} title={data.title} />
          </div>

          {cta && (
            <aside className="mt-12 border-t-2 border-black bg-gn-900 p-6 md:p-8">
              <Kicker>From Traverse Minds</Kicker>
              <p className="mt-2 font-serif text-[24px] font-semibold text-black">{cta.title}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-gn-400">{cta.text}</p>
              <div className="mt-5">
                <Button variant="primary" size="md" href={cta.href}>{cta.label}</Button>
              </div>
            </aside>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-black/10 bg-gn-900">
          <div className="container-max py-12">
            <SectionHeader title={relatedTitle} href={relatedHref} />
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.slice(0, 3).map((s) => (
                <StoryCard key={s.href} story={s} />
              ))}
            </div>
            <p className="mt-10">
              <Link href={relatedHref} className="text-[14px] font-medium text-gn-300 hover:text-accent">← All {relatedTitle.replace(/^More /, "")}</Link>
            </p>
          </div>
        </section>
      )}
    </article>
  );
}
