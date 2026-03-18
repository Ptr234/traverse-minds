"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PostCard } from "@/components/blog/PostCard";
import { DivisionFilter } from "@/components/blog/DivisionFilter";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { Search } from "lucide-react";

const blogHeroImages = [
  "https://images.unsplash.com/photo-1504711434969-e33886168d0c?w=1800&q=80",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1800&q=80",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1800&q=80",
  "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=1800&q=80",
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
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-44 lg:pb-36">
        <ImageSlideshow images={blogHeroImages} overlay="bg-primary/70" />

        <div className="container-max relative z-10 px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-4 py-1.5 backdrop-blur-md mb-8"
            >
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/55">Latest Insights</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05]"
            >
              News & <span className="text-gradient-accent">insights</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-lg text-lg text-white/50 leading-relaxed"
            >
              Cybersecurity analysis, event recaps, policy explainers, and data-driven research from across our six divisions.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="relative bg-surface-elevated section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid-light opacity-40 pointer-events-none" />

        <div className="container-max relative z-10">
          {/* Search Input */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted/40" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-border-light bg-white py-3 pl-11 pr-4 text-sm text-primary placeholder:text-brand-muted/40 outline-none focus:border-accent/40 focus:shadow-sm transition-all"
              />
            </div>
          </div>

          <div className="mb-10">
            <DivisionFilter active={filter} onChange={setFilter} />
          </div>
          <motion.div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" layout>
            {filtered.map((post) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <PostCard {...post} />
              </motion.div>
            ))}
          </motion.div>
          {filtered.length === 0 && (
            <div className="col-span-full rounded-3xl border-2 border-dashed border-border-light py-20 text-center">
              <p className="text-lg font-semibold text-primary">Coming soon</p>
              <p className="mt-2 text-base text-brand-muted max-w-md mx-auto">
                Our first articles are being written. Subscribe to our newsletter to be notified when we publish.
              </p>
            </div>
          )}
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
}
