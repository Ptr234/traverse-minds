"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mic, Rss } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";

const gnEase = [0.215, 0.61, 0.355, 1] as const;

const subscribeLinks = [
  {
    label: "Spotify",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
  {
    label: "Apple Podcasts",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.224 1.272 1.912 2.619 2.264 4.392.12.6-.36 1.2-.96 1.2h-.12c-.48 0-.84-.36-.96-.84-.264-1.272-.792-2.376-1.68-3.288-1.32-1.368-3.012-2.088-4.944-2.088-3.648 0-6.624 3.024-6.576 6.672.024 1.776.72 3.384 1.872 4.584.48.48.48 1.272 0 1.752l-.072.072c-.48.48-1.272.48-1.752 0C3.408 16.056 2.472 13.896 2.4 11.52c-.12-4.944 3.84-9.024 8.76-8.976.24.024.48.024.704.024zm.024 4.464c1.272 0 2.472.504 3.384 1.416.816.84 1.296 1.872 1.44 3.024.048.48-.312.888-.792.936h-.072c-.432 0-.792-.312-.84-.744-.096-.744-.408-1.416-.936-1.944-.6-.6-1.392-.936-2.232-.936-1.728 0-3.168 1.44-3.12 3.168.024.768.336 1.464.84 1.992.264.264.264.696 0 .96l-.072.072c-.264.264-.696.264-.96 0-.768-.768-1.2-1.8-1.248-2.904-.096-2.472 1.896-4.536 4.368-4.536.096-.024.168-.024.24.024v-.528zm-.168 4.464c.624 0 1.128.504 1.128 1.128 0 .624-.504 1.128-1.128 1.128-.624 0-1.128-.504-1.128-1.128 0-.624.504-1.128 1.128-1.128zm-.72 3.696c.096-.024.192-.024.288-.024h.768c.096 0 .192 0 .288.024.48.096.84.504.84 1.008v3.456c0 .648-.384 1.224-.984 1.464-.264.12-.552.168-.84.168s-.576-.048-.84-.168c-.6-.24-.984-.816-.984-1.464V16.2c0-.504.36-.912.84-1.008h.624z" />
      </svg>
    ),
  },
  { label: "RSS", href: "#", icon: <Rss className="h-4 w-4" /> },
];

const episodes = [
  { num: "01", title: "Uganda's Cyber Law: What Changed in 2025?", tag: "Policy" },
  { num: "02", title: "Inside the EAC Data Sovereignty Debate", tag: "Governance" },
  { num: "03", title: "Mobile Money Fraud: Prevention Playbook", tag: "Security" },
];

export function PodcastPreview() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/cyber/cyber_image_30.jpg" alt="" fill className="object-cover" style={{ opacity: 0.06 }} sizes="100vw" />
        <div className="absolute inset-0" style={{ background: "#212429" }} />
      </div>

      <div className="relative z-10" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px" }}>
        {/* Header */}
        <div className="text-center" style={{ marginBottom: 48 }}>
          <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Traverse Media</p>
          <TextReveal
            as="h2"
            variant="fade-up"
            staggerSpeed={0.04}
            delay={0.1}
            className="font-display"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 500, lineHeight: "125%", letterSpacing: "-1.92px", color: "#fff" }}
          >
            Facts & Figures
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.35, ease: gnEase }}
            style={{ marginTop: 16, fontSize: 16, lineHeight: "125%", color: "rgba(255,255,255,0.5)", maxWidth: 400, margin: "16px auto 0" }}
          >
            Unpacking the data, laws, and technology shaping East Africa.
          </motion.p>
        </div>

        {/* Two-column: Podcast visual + Episode list */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left — Podcast card */}
          <SectionReveal variant="fade-up" delay={0.2} className="lg:col-span-2">
            <div className="editorial-card-dark flex flex-col items-center justify-center" style={{ padding: 48 }}>
              <div className="flex items-center justify-center" style={{ height: 96, width: 96, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, marginBottom: 32 }}>
                <Mic style={{ height: 40, width: 40, color: "#ff4c00" }} />
              </div>

              <div className="flex items-center gap-2" style={{ padding: "8px 16px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, marginBottom: 32 }}>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: "#2b9239" }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#2b9239" }} />
                </span>
                <span style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>First episode coming soon</span>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {subscribeLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="inline-flex items-center gap-2"
                    style={{
                      padding: "8px 12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 4,
                      fontSize: 14,
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.5)",
                      transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#ff4c00"; e.currentTarget.style.color = "#ff4c00"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                  >
                    {link.icon}
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Right — Episode list */}
          <SectionReveal variant="fade-up" staggerChildren={0.08} delay={0.25} className="lg:col-span-3 flex flex-col">
            {episodes.map((ep, i) => (
              <RevealItem key={ep.num} variant="fade-up">
                <div
                  className="group flex items-center gap-6"
                  style={{
                    padding: "24px 32px",
                    background: i % 2 === 0 ? "#212429" : "rgba(49,52,57,0.5)",
                    borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    transition: "background 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)",
                  }}
                >
                  <span className="font-mono shrink-0" style={{ fontSize: 24, fontWeight: 700, color: "rgba(255,76,0,0.4)" }}>{ep.num}</span>
                  <div className="flex-1 min-w-0">
                    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)" }}>{ep.tag}</span>
                    <h3
                      className="font-display group-hover:!text-[#ff4c00]"
                      style={{ marginTop: 4, fontSize: 21, fontWeight: 500, lineHeight: "125%", letterSpacing: "-0.21px", color: "#fff", transition: "color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                    >
                      {ep.title}
                    </h3>
                  </div>

                  {/* Play button — GatesNotes: hover turns accent */}
                  <div
                    className="hidden sm:flex items-center justify-center shrink-0 group-hover:!bg-[#ff4c00] group-hover:!text-white"
                    style={{
                      height: 40, width: 40,
                      borderRadius: 4,
                      background: "rgba(81,84,89,0.64)",
                      color: "#fff",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)",
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 ml-0.5" aria-hidden><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </RevealItem>
            ))}

            <RevealItem variant="fade-up">
              <div className="flex items-center justify-center" style={{ padding: 24, borderTop: "1px dashed rgba(255,255,255,0.08)" }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.3)" }}>More episodes launching soon...</p>
              </div>
            </RevealItem>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
