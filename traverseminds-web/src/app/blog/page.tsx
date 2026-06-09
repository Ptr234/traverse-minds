import type { Metadata } from "next";
import { sanityClient } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { BlogPageClient } from "./BlogPageClient";

export const metadata: Metadata = {
  title: "News & Insights — Traverse Minds Africa",
  description: "Cybersecurity analysis, event recaps, policy explainers, and data-driven research from across our six divisions.",
};

const builder = imageUrlBuilder(sanityClient);

async function getPosts() {
  try {
    return await sanityClient.fetch(
      `*[_type == "post"] | order(publishedAt desc) {
        _id, title, slug, excerpt, division, publishedAt, readTime,
        featuredImage,
        "author": author->{ name, photo }
      }`
    );
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const raw = await getPosts();

  const posts = raw.map((p: {
    _id: string; title: string; slug: { current: string };
    excerpt: string; division: string; publishedAt: string;
    readTime: string; featuredImage: { asset?: unknown } | null;
    author: { name: string; photo: { asset?: unknown } | null } | null;
  }) => ({
    title: p.title,
    slug: p.slug.current,
    excerpt: p.excerpt ?? "",
    division: p.division ?? "security",
    date: p.publishedAt
      ? new Date(p.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
      : "",
    readTime: p.readTime ?? "5 min read",
    image: p.featuredImage?.asset
      ? builder.image(p.featuredImage).width(800).height(450).fit("crop").url()
      : "/imagestouse/div-cybersecurity.jpeg",
    author: {
      name: p.author?.name ?? "Traverse Minds",
      photo: p.author?.photo?.asset
        ? builder.image(p.author.photo).width(80).height(80).fit("crop").url()
        : "/christine-masika.jpg",
    },
  }));

  return <BlogPageClient initialPosts={posts} />;
}
