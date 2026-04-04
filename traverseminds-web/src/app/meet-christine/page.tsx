"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { PageTransition } from "@/components/ui/PageTransition";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { ArrowRight, Twitter, Linkedin, Mail, Quote } from "lucide-react";

export default function MeetChristinePage() {
  return (
    <PageTransition>
      {/* Hero Section — GatesNotes: Full bleed background, title at bottom-left */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/Christine.jpg"
            alt="Christine Masika"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(33,36,41,0.9) 0%, rgba(33,36,41,0.4) 40%, rgba(33,36,41,0) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 w-full container-max px-6 lg:px-8 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            className="max-w-3xl"
          >
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Founder & CEO</p>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight leading-[0.9]">
              Meet<br />Christine
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Intro Section — GatesNotes editorial style */}
      <section style={{ background: "#ffffff", paddingTop: 80, paddingBottom: 80 }}>
        <div className="container-max px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Main content */}
            <div className="lg:col-span-7">
              <SectionReveal variant="fade-up">
                <p className="font-display text-2xl md:text-3xl font-medium leading-tight text-brand-charcoal">
                  Christine Masika is a cybersecurity professional, civic-tech advocate,
                  and the founder of Traverse Minds. Her work focuses on building
                  digital resilience across the East African Community.
                </p>
              </SectionReveal>

              <SectionReveal variant="fade-up" delay={0.2} className="mt-12 space-y-6 text-lg leading-relaxed text-brand-medium">
                <p>
                  With a background in computer science and strategic intelligence,
                  Christine established Traverse Minds in 2024 to address the
                  growing need for homegrown cybersecurity capacity in Uganda.
                  What started as a boutique security consultancy has grown into
                  an integrated civic-tech powerhouse with six divisions.
                </p>
                <p>
                  &ldquo;I believe that Africa&apos;s digital future depends on our ability to
                  secure our own infrastructure and build technology that serves the
                  public interest,&rdquo; says Christine. &ldquo;At Traverse, we are combining
                  technical excellence with deep policy research to make that
                  future a reality.&rdquo;
                </p>
                <p>
                  Beyond her work at Traverse, Christine is a regular commentator on
                  technology policy in East Africa and an advocate for digital literacy
                  in underserved communities.
                </p>
              </SectionReveal>
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-5">
              <SectionReveal variant="clip-inset">
                <div className="editorial-card p-8 bg-light-surface" style={{ borderRadius: 8 }}>
                  <h3 className="font-display text-xl font-bold text-brand-charcoal mb-6 border-b border-black/10 pb-4">
                    Quick Facts
                  </h3>
                  <div className="space-y-6">
                    {[
                      { label: "Focus Areas", value: "Cybersecurity, Civic-Tech, Policy Research" },
                      { label: "Education", value: "Computer Science & Strategic Intel" },
                      { label: "Based In", value: "Kampala, Uganda" },
                      { label: "Interests", value: "Data Journalism, AI Ethics, Digital Rights" },
                    ].map((item) => (
                      <div key={item.label}>
                        <p className="text-xs font-bold uppercase tracking-wider text-brand-amber mb-1">
                          {item.label}
                        </p>
                        <p className="text-base text-brand-charcoal font-medium">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 pt-8 border-t border-black/10 flex items-center gap-4">
                    <a href="#" className="h-10 w-10 flex items-center justify-center bg-black/5 rounded-full hover:bg-accent hover:text-white transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="h-10 w-10 flex items-center justify-center bg-black/5 rounded-full hover:bg-accent hover:text-white transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="mailto:hello@traverseminds.ug" className="h-10 w-10 flex items-center justify-center bg-black/5 rounded-full hover:bg-accent hover:text-white transition-colors">
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section style={{ background: "#212429", padding: "120px 0" }} className="relative overflow-hidden">
        <div className="absolute top-0 left-0 p-12 opacity-5">
          <Quote style={{ width: 300, height: 300, color: "#fff" }} />
        </div>
        <div className="container-max relative z-10 px-6 lg:px-8 text-center">
          <SectionReveal variant="fade-blur">
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight max-w-4xl mx-auto leading-tight">
              &ldquo;Technology is a tool for progress, but evidence is the anchor that keeps it serving the people.&rdquo;
            </h2>
            <p className="mt-8 text-brand-amber font-display text-xl">
              — Christine Masika
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* What I'm thinking about — GatesNotes style cards */}
      <section style={{ background: "#f0f1f4", paddingTop: 80, paddingBottom: 80 }}>
        <div className="container-max px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Insights</p>
            <TextReveal as="h2" variant="fade-up" className="font-display text-4xl font-bold text-brand-charcoal">
              What I&apos;m thinking about
            </TextReveal>
          </div>

          <SectionReveal variant="fade-up" staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Uganda's PDPA 2019: The road ahead",
                category: "Policy",
                desc: "An analysis of the implementation gaps in our national data protection framework.",
                image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=2070&auto=format&fit=crop",
              },
              {
                title: "The role of AI in African governance",
                category: "Technology",
                desc: "How we can leverage automation while ensuring transparency and local context.",
                image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
              },
              {
                title: "Securing East Africa's payment systems",
                category: "Security",
                desc: "Why cross-border interoperability requires a unified security standard.",
                image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
              },
            ].map((item) => (
              <RevealItem key={item.title} variant="fade-up">
                <Link href="/blog" className="group block editorial-card bg-white overflow-hidden shadow-sm" style={{ borderRadius: 8 }}>
                  <div className="relative aspect-video overflow-hidden">
                    <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-amber mb-2">
                      {item.category}
                    </p>
                    <h3 className="font-display text-xl font-bold text-brand-charcoal group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-brand-medium line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </SectionReveal>

          <div className="mt-16 text-center">
            <Button variant="primary" size="lg" href="/blog">
              Read More Insights <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Connect section */}
      <section style={{ background: "#ffffff", padding: "100px 0" }}>
        <div className="container-max px-6 lg:px-8 text-center">
          <SectionReveal variant="fade-blur">
            <h2 className="font-display text-4xl font-bold text-brand-charcoal mb-6">
              Stay in touch
            </h2>
            <p className="text-lg text-brand-medium max-w-2xl mx-auto mb-10">
              I share weekly updates on the East African digital landscape through
              the Traverse Minds newsletter and our Facts & Figures podcast.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="primary" size="lg" href="/contact">
                Work with Traverse
              </Button>
              <Button variant="outline" size="lg" href="/media">
                Listen to the Podcast
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}
