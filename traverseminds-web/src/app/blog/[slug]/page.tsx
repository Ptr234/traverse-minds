import type { Metadata } from "next";
import { notFound } from "next/navigation";
import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "@/sanity/client";
import { getMagazineContent } from "@/lib/content";
import { divisionLabel } from "@/lib/divisions";
import { SITE_URL } from "@/lib/site";
import { SectionBar } from "@/components/magazine/SectionBar";
import { Article } from "@/components/magazine/Article";

const builder = imageUrlBuilder(sanityClient);

async function getPost(slug: string) {
  try {
    return await sanityClient.fetch(
      `*[_type == "post" && slug.current == $slug][0] {
        _id, title, excerpt, division, publishedAt, readTime, featuredImage, body, tags, seoTitle, seoDescription,
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
    const slugs = await sanityClient.fetch<{ slug: string }[]>(`*[_type == "post"]{ "slug": slug.current }`);
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
    openGraph: post.featuredImage?.asset
      ? { images: [builder.image(post.featuredImage).width(1200).height(630).fit("crop").url()] }
      : undefined,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, { posts }] = await Promise.all([getPost(slug), getMagazineContent()]);
  if (!post) notFound();

  const href = `/blog/${slug}`;
  // Same division first, then the newest of the rest
  const others = posts.filter((p) => p.href !== href);
  const related = [...others.filter((p) => p.kicker === post.division), ...others.filter((p) => p.kicker !== post.division)];

  return (
    <>
      <SectionBar />
      <Article
        data={{
          crumbs: [
            { name: "Home", href: "/" },
            { name: "Analysis", href: "/blog" },
            { name: post.title, href },
          ],
          kicker: divisionLabel(post.division) || "Analysis",
          title: post.title,
          dek: post.excerpt,
          author: post.author
            ? {
                name: post.author.name,
                title: post.author.title,
                photo: post.author.photo?.asset ? builder.image(post.author.photo).width(96).height(96).fit("crop").url() : null,
              }
            : undefined,
          date: post.publishedAt,
          readTime: post.readTime,
          image: post.featuredImage?.asset ? builder.image(post.featuredImage).width(2200).fit("max").auto("format").url() : null,
          imageCaption: post.featuredImage?.alt,
          body: post.body,
          tags: post.tags,
          ctaKey: post.division,
          url: `${SITE_URL}${href}/`,
        }}
        related={related}
      />
    </>
  );
}
