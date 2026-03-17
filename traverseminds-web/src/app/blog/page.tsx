"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PostCard } from "@/components/blog/PostCard";
import { DivisionFilter } from "@/components/blog/DivisionFilter";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import { Particles } from "@/components/ui/Particles";

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
      {/* Hero with bg image */}
      <section className="relative min-h-[65vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1504711434969-e33886168d0c?w=1600&q=80" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-light-surface/60 via-transparent to-light-surface/80" />
        </div>
        <Particles />
        <div className="relative mx-auto flex min-h-[65vh] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl py-20 lg:py-28">
            <div className="hero-bar" />
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber">Latest Insights</p>
            <h1 className="font-display text-4xl uppercase leading-[1.1] tracking-tight text-brand-charcoal md:text-5xl lg:text-6xl">
              News &<br /><span className="text-brand-amber">insights</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-brand-medium">
              Cybersecurity analysis, event recaps, policy explainers, and data-driven research from across our six divisions.
            </p>
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="bg-light-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10"><DivisionFilter active={filter} onChange={setFilter} /></div>
          <motion.div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" layout>
            {filtered.map((post) => (
              <motion.div key={post.slug} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                <PostCard {...post} />
              </motion.div>
            ))}
          </motion.div>
          {filtered.length === 0 && <div className="py-20 text-center"><p className="text-lg text-brand-muted">No posts in this category yet.</p></div>}
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
}
