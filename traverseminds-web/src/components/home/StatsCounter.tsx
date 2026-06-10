"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";

const stats = [
  { value: 6, label: "Security Services", description: "Pen testing, ISO 27001, BoU audit, and more" },
  { value: 54, label: "African Countries", description: "Providing digital resilience across the continent" },
  { value: 6, label: "Integrated Divisions", description: "One company, six interconnected teams" },
  { value: 4, label: "Audiences Served", description: "Institutions, researchers, policy-makers, citizens" },
];

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value, isInView]);

  return <span ref={ref}>{display}</span>;
}

export function StatsCounter() {
  return (
    <section style={{ background: "#f0f1f4", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56 }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px 56px" }}>
        <SectionReveal variant="fade-up" staggerChildren={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <RevealItem key={stat.label} variant="fade-up">
              <div
                className={i < stats.length - 1 ? "lg:border-r" : ""}
                style={{
                  padding: "32px 24px",
                  borderColor: "rgba(0,0,0,0.1)",
                }}
              >
                <p className="font-display" style={{ fontSize: "clamp(2rem, 8vw, 3rem)", fontWeight: 500, lineHeight: "125%", letterSpacing: "-1.44px", color: "#000" }}>
                  <AnimatedNumber value={stat.value} />
                </p>
                <h3 style={{ marginTop: 8, fontSize: 16, fontWeight: 500, color: "#212429" }}>{stat.label}</h3>
                <p style={{ marginTop: 4, fontSize: 14, color: "#919499", lineHeight: "125%" }}>{stat.description}</p>
              </div>
            </RevealItem>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}
