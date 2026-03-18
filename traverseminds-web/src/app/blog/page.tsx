"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PostCard } from "@/components/blog/PostCard";
import { DivisionFilter } from "@/components/blog/DivisionFilter";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";

const blogHeroImages = [
  "https://images.unsplash.com/photo-1504711434969-e33886168d0c?w=1800&q=80",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1800&q=80",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1800&q=80",
  "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=1800&q=80",
];

const mockPosts = [
  {
    title: "The Top 5 Cyber Threats Facing Ugandan Banks in 2026",
    slug: "top-5-cyber-threats-ugandan-banks-2026",
    excerpt: "From ransomware to insider threats, we break down the most pressing cybersecurity risks facing Uganda's financial sector — and what institutions can do about them.",
    division: "security", date: "12 Mar 2026", readTime: "6 min",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&q=70",
    author: { name: "Christine Masika", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=70" },
  },
  {
    title: "What We Learned at the First Cyber Luncheon Kampala",
    slug: "first-cyber-luncheon-kampala",
    excerpt: "Thirty of East Africa's top cybersecurity professionals gathered for our inaugural Cyber Luncheon. Here's what they discussed.",
    division: "events", date: "8 Mar 2026", readTime: "5 min",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=70",
    author: { name: "Christine Masika", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=70" },
  },
  {
    title: "A Plain-English Guide to Uganda's PDPA 2019",
    slug: "plain-english-guide-uganda-pdpa-2019",
    excerpt: "Uganda's Personal Data Protection Act is now in force, but most organisations still don't understand their obligations.",
    division: "security", date: "1 Mar 2026", readTime: "8 min",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=70",
    author: { name: "Christine Masika", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=70" },
  },
];

export default function BlogPage() {
  const [filter, setFilter] = useState("all");
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
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/40">Latest Insights</span>
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
              className="mt-6 max-w-lg text-lg text-white/35 leading-relaxed"
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
            <div className="py-20 text-center">
              <p className="text-base text-brand-muted">No posts in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
}
