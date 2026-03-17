"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, ScanEye, FileCheck2, AlertTriangle, Siren, Scale, ArrowRight } from "lucide-react";

const services = [
  { icon: ScanEye, title: "Penetration Testing", desc: "Simulated attacks on networks and applications to identify vulnerabilities.", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=70" },
  { icon: FileCheck2, title: "Data Encryption", desc: "Encrypting sensitive data at rest and in transit using advanced protocols.", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=70" },
  { icon: ShieldCheck, title: "Identity & Access", desc: "Multi-factor authentication and detailed role-based access control.", img: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&q=70" },
  { icon: AlertTriangle, title: "Security Monitoring", desc: "24/7 monitoring with advanced SIEM systems for real-time detection.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=70" },
  { icon: Siren, title: "Incident Response", desc: "Rapid containment, investigation, and recovery when a breach occurs.", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=70" },
  { icon: Scale, title: "Compliance Advisory", desc: "Uganda PDPA, ISO 27001, NIST, and Bank of Uganda framework guidance.", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=70" },
];

export function FeaturedDivision() {
  return (
    <section className="bg-light-elevated px-4 py-20 sm:px-6 lg:px-8 lg:py-28 relative overflow-hidden">
      {/* Subtle background decorative element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-amber/20 to-transparent" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center">
          <motion.span 
            className="text-sm font-bold uppercase tracking-[0.2em] text-brand-amber"
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
          >
            What We Provide
          </motion.span>
          <motion.h2 
            className="mx-auto mt-3 max-w-3xl font-display text-3xl font-bold text-brand-charcoal md:text-5xl"
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Comprehensive <span className="text-brand-green">Security Solutions</span>
          </motion.h2>
          <motion.p 
            className="mx-auto mt-4 max-w-2xl text-lg text-brand-medium"
            initial={{ opacity: 0, y: 15 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Protect your organisation from ever-evolving cyber risks with our end-to-end security architecture.
          </motion.p>
        </div>

        <motion.div 
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {services.map((svc) => (
            <motion.div 
              key={svc.title}
              variants={{ 
                hidden: { opacity: 0, y: 40 }, 
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } 
              }}
              className="group relative h-full overflow-hidden rounded-2xl bg-white border border-light-border shadow-sm hover:shadow-xl hover:border-brand-green/30 transition-all duration-500 hover:-translate-y-1"
            >
              {/* BG Image — top portion */}
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={svc.img} 
                  alt="" 
                  fill 
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                />
                <div className="absolute inset-0 bg-brand-green/80 mix-blend-multiply opacity-0 transition-opacity duration-500 group-hover:opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />
              </div>

              {/* Content — floating over image slightly */}
              <div className="relative z-10 flex flex-col px-6 pb-6 -mt-12">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-lg ring-1 ring-black/5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <svc.icon className="h-7 w-7 text-brand-teal" />
                </div>
                
                <h3 className="mt-5 font-display text-xl font-bold text-brand-charcoal group-hover:text-brand-green transition-colors">
                  {svc.title}
                </h3>
                
                <p className="mt-2 text-base leading-relaxed text-brand-medium">
                  {svc.desc}
                </p>
                
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-brand-teal transition-all duration-300 group-hover:gap-3 group-hover:text-brand-amber">
                  Learn More <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
