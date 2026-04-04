"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PostCard } from "@/components/blog/PostCard";
import { DivisionFilter } from "@/components/blog/DivisionFilter";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { PageTransition } from "@/components/ui/PageTransition";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Search } from "lucide-react";

const blogHeroImages = [
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
];

const mockPosts: {
  title: string; slug: string; excerpt: string; division: string;
... User modified the `new_string` content to be: "use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PostCard } from "@/components/blog/PostCard";
import { DivisionFilter } from "@/components/blog/DivisionFilter";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { PageTransition } from "@/components/ui/PageTransition";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Search } from "lucide-react";

const blogHeroImages = [
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
];

const mockPosts: {
  title: string; slug: string; excerpt: string; division: string;
  date: string; readTime: string; image: string;
  author: { name: string; photo: string };
}[] = [];

export default function BlogPage() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const filtered = filter === "all" ? mockPosts : mockPosts.filter((p) => p.division === filter);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-44 lg:pb-36">
        <ImageSlideshow images={blogHeroImages} overlay="bg-primary/70" />

        <div className="container-max relative z-10 px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Latest Insights</p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05]"
            >
              News & <span style={{ color: "#ff4c00" }}>insights</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
              className="mt-6 max-w-lg text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Cybersecurity analysis, event recaps, policy explainers, and data-driven research from across our six divisions.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section style={{ background: "#f0f1f4", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
        <div className="container-max relative z-10">
          {/* Search Input */}
          <SectionReveal variant="fade-blur">
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "#919499" }} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border bg-white py-3 pl-11 pr-4 text-sm outline-none"
                  style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", color: "#000", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                />
              </div>
            </div>
          </SectionReveal>

          <SectionReveal variant="slide-up" delay={0.05}>
            <div className="mb-10">
              <DivisionFilter active={filter} onChange={setFilter} />
            </div>
          </SectionReveal>

          <SectionReveal variant="fade-up" delay={0.1}>
            <motion.div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" layout>
              {filtered.map((post) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  <PostCard {...post} />
                </motion.div>
              ))}
            </motion.div>
            {filtered.length === 0 && (
              <div className="col-span-full border-2 border-dashed py-20 text-center" style={{ borderRadius: 16, borderColor: "rgba(0,0,0,0.1)" }}>
                <p className="text-lg font-semibold" style={{ color: "#000" }}>Coming soon</p>
                <p className="mt-2 text-base max-w-md mx-auto" style={{ color: "#919499" }}>
                  Our first articles are being written. Subscribe to our newsletter to be notified when we publish.
                </p>
              </div>
            )}
          </SectionReveal>
        </div>
      </section>

      <NewsletterSignup />
    </PageTransition>
  );
}
.
