import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { sanityClient } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

const builder = imageUrlBuilder(sanityClient);

async function getPost(slug: string) {
  try {
    return await sanityClient.fetch(
      `*[_type == "post" && slug.current == $slug][0] {
        _id, title, slug, excerpt, division, publishedAt, readTime,
        featuredImage, body, tags,
        "author": author->{ name, title, photo }
      }`,
      { slug }
    );
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await sanityClient.fetch<{ slug: string }[]>(
      `*[_type == "post"]{ "slug": slug.current }`
    );
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [{ slug: "placeholder" }];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
  };
}

const divisionLabels: Record<string, string> = {
  security: "Traverse Security",
  events: "Traverse Events",
  "public-record": "Public Record Africa",
  literacy: "Digital Literacy",
  media: "Traverse Media",
  thinktank: "Think Tank",
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const heroUrl = post.featuredImage?.asset
    ? builder.image(post.featuredImage).width(1600).height(700).fit("crop").url()
    : "/imagestouse/div-cybersecurity.jpeg";

  const authorPhotoUrl = post.author?.photo?.asset
    ? builder.image(post.author.photo).width(80).height(80).fit("crop").url()
    : "/christine-masika.jpg";

  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0">
          <Image src={heroUrl} alt="" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0D3B2E 0%, rgba(13,59,46,0.85) 50%, rgba(13,59,46,0.6) 100%)" }} />
        </div>
        <div className="relative mx-auto max-w-3xl">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          {post.division && (
            <span className="mb-3 inline-block px-3 py-1 text-xs font-semibold text-white" style={{ background: "#ff4c00", borderRadius: 999 }}>
              {divisionLabels[post.division] ?? post.division}
            </span>
          )}
          <h1 className="font-display text-3xl leading-snug text-white md:text-4xl lg:text-5xl">{post.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {post.author && (
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src={authorPhotoUrl} alt={post.author.name} fill className="object-cover" sizes="40px" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{post.author.name}</p>
                  <p className="text-xs text-white/50">{post.author.title}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-4 text-sm text-white/55">
              {post.publishedAt && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              )}
              {post.readTime && (
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{post.readTime}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#f0f1f4", padding: "48px 16px" }}>
        <div className="mx-auto max-w-3xl">
          {post.body ? (
            <article className="prose max-w-none prose-headings:font-display prose-headings:text-[#0D3B2E] prose-p:text-[#444441] prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-black prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:leading-relaxed">
              <PortableText value={post.body} />
            </article>
          ) : (
            post.excerpt && <p className="text-lg leading-relaxed" style={{ color: "#444441" }}>{post.excerpt}</p>
          )}

          <div className="mt-16 py-8 px-8 text-center" style={{ background: "#fff", borderRadius: 8, border: "1px solid rgba(0,0,0,0.1)" }}>
            <h3 className="font-display text-xl" style={{ color: "#000" }}>Need a security assessment?</h3>
            <p className="mt-2" style={{ color: "#515459" }}>Our team evaluates your organisation&apos;s cybersecurity posture.</p>
            <div className="mt-6">
              <Button variant="primary" size="lg" href="/security#enquiry">Request an Assessment</Button>
            </div>
          </div>

          <div className="mt-10">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm" style={{ color: "#919499" }}>
              <ArrowLeft className="h-4 w-4" /> All Posts
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
