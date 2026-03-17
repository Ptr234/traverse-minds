"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Shield, Globe, Users, Layers } from "lucide-react";

const stats = [
  { icon: Shield, value: 6, suffix: "", label: "Security Services" },
  { icon: Globe, value: 5, suffix: "", label: "EAC Countries Covered" },
  { icon: Users, value: 6, suffix: "", label: "Integrated Divisions" },
  { icon: Layers, value: 11, suffix: "", label: "Pages at Full Build" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          const duration = 1500;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export function StatsCounter() {
  return (
    <section className="bg-light-surface px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10">
                <stat.icon className="h-7 w-7 text-brand-green" />
              </div>
              <p className="font-display text-3xl text-brand-charcoal md:text-4xl">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-sm text-brand-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
