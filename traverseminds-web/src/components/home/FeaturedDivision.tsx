"use client";

import Image from "next/image";
import { Shield, Calendar, Database, Brain, Mic, BookOpen } from "lucide-react";
import Link from "next/link";
import { TextReveal } from "@/components/ui/TextReveal";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";

const divisions = [
  { id: "security", name: "Cybersecurity", icon: Shield, desc: "End-to-end protection for critical infrastructure, banks, and government.", href: "/security", image: "/cyber/cyber_image_02.jpg" },
  { id: "think-tank", name: "Think Tank", icon: Brain, desc: "Independent research and policy analysis for the digital age.", href: "/think-tank", image: "/cyber/cyber_image_04.jpg" },
  { id: "public-record", name: "Public Record EA", icon: Database, desc: "AI-powered transparency tool for accessing public documents.", href: "/public-record", image: "/cyber/cyber_image_20.jpg" },
  { id: "events", name: "Events", icon: Calendar, desc: "High-level forums like the Cyber Luncheon for digital leaders.", href: "/events", image: "/cyber/cyber_image_25.jpg" },
  { id: "media", name: "Media", icon: Mic, desc: "Amplifying narratives through podcasts, reports, and coverage.", href: "/media", image: "/cyber/cyber_image_16.jpg" },
  { id: "literacy", name: "Digital Literacy", icon: BookOpen, desc: "Empowering SMEs and citizens with essential digital skills and safety.", href: "/literacy", image: "/cyber/cyber_image_33.jpg" },
];

export function FeaturedDivision() {
  return (
    <section style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56 }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px 80px" }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div style={{ maxWidth: 700 }}>
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 24 }}>One Company. Six Divisions.</p>
            <TextReveal
              as="h2"
              variant="fade-up"
              staggerSpeed={0.03}
              delay={0.1}
              className="font-display"
              style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 500, lineHeight: "125%", letterSpacing: "-1.92px", color: "#000" }}
            >
              Six divisions, one integrated mission.
            </TextReveal>
          </div>
          <p style={{ fontSize: 16, color: "#515459", lineHeight: "125%", maxWidth: 340 }}>
            Every division strengthens the others — security informs research, events build community, media amplifies findings.
          </p>
        </div>

        {/* Collection Grid — GatesNotes style: 3 columns, 380px cards */}
        <SectionReveal variant="fade-up" staggerChildren={0.1} delay={0.15} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisions.map((div) => (
            <RevealItem key={div.id} variant="fade-up">
              <Link
                href={div.href}
                className="group block editorial-card"
                style={{ minHeight: 528 }}
              >
                {/* Image — GatesNotes: aspect 380/238, 4px radius */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "380/238", borderRadius: 4 }}>
                  <Image
                    src={div.image}
                    alt={div.name}
                    fill
                    className="object-cover"
                    style={{ transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  />
                </div>

                {/* Content */}
                <div style={{ padding: "24px 0" }}>
                  <p className="eyebrow" style={{ color: "#000", marginBottom: 8 }}>
                    {div.id.replace("-", " ")}
                  </p>
                  <h3
                    className="font-display group-hover:text-accent"
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      lineHeight: "110%",
                      letterSpacing: "-0.24px",
                      color: "#000",
                      transition: "color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical" as const,
                      overflow: "hidden",
                    }}
                  >
                    {div.name}
                  </h3>
                  <p style={{
                    marginTop: 8,
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: "125%",
                    color: "#313439",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical" as const,
                    overflow: "hidden",
                  }}>
                    {div.desc}
                  </p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}
