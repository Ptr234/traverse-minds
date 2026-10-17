import type { Metadata } from "next";
import { getMagazineContent } from "@/lib/content";
import { SectionBar } from "@/components/magazine/SectionBar";
import { PageHeader } from "@/components/magazine/PageHeader";
import { BlogPageClient } from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Analysis — Traverse Minds Africa",
  description: "Cybersecurity analysis, policy explainers, and data-driven research from across our six divisions.",
};

export default async function BlogPage() {
  const { posts } = await getMagazineContent();
  return (
    <>
      <SectionBar />
      <PageHeader
        crumbs={[{ name: "Home", href: "/" }, { name: "Analysis", href: "/blog" }]}
        kicker="Traverse Minds"
        title="Analysis"
        dek="Cybersecurity analysis, policy explainers and field notes on Africa's digital transition, from across our six divisions."
      />
      <BlogPageClient posts={posts} />
    </>
  );
}
