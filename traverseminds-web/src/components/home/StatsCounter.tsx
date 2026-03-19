"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Shield, Globe, Users, Layers } from "lucide-react";

const stats = [
  {
    icon: Shield,
    value: 6,
    suffix: "",
    label: "Security Services",
    description: "Pen testing, ISO 27001, BoU audit, and more",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=70",
  },
  {
    icon: Globe,
    value: 5,
    suffix: "",
    label: "EAC Countries",
    description: "Uganda, Kenya, Tanzania, Rwanda, Burundi",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=70",
  },
  {
    icon: Users,
    value: 6,
    suffix: "",
    label: "Integrated Divisions",
    description: "One company, six interconnected teams",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=70",
  },
  {
    icon: Layers,
    value: 4,
    suffix: "",
    label: "Audiences Served",
    description: "Institutions, researchers, policy-makers, citizens",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168d0c?w=600&q=70",
  },
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
    <section className="relative z-20 -mt-16 px-6 pb-0">
      <div className="container-max">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
              className="group relative overflow-hidden rounded-2xl p-6 lg:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-elevated border border-white/0 hover:border-accent/20"
            >
              {/* Background image */}
              <Image src={stat.image} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 50vw, 25vw" />
              <div className="absolute inset-0 bg-primary/80 group-hover:bg-primary/70 transition-colors duration-500" />

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ boxShadow: "inset 0 1px 0 rgba(249, 115, 22, 0.1)" }} />

              <div className="relative z-10">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-accent icon-hover-float backdrop-blur-sm">
                  <stat.icon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-6" />
                </div>

                <div className="flex items-baseline gap-0.5">
                  <span className="font-display text-4xl lg:text-5xl font-bold tracking-tighter text-white">
                    <AnimatedNumber value={stat.value} />
                  </span>
                  {stat.suffix && <span className="text-xl font-bold text-accent">{stat.suffix}</span>}
                </div>

                <h3 className="mt-2 text-sm font-semibold text-white/80">{stat.label}</h3>
                <p className="mt-1.5 text-xs text-white/65 leading-relaxed">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
