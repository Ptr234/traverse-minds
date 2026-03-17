"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ScanEye, FileCheck2, AlertTriangle, Siren, Scale, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  { icon: ScanEye, title: "Penetration Testing", description: "Simulated attacks on your networks, applications, and infrastructure to identify vulnerabilities before real attackers do.", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=70" },
  { icon: ShieldCheck, title: "ISO 27001 Compliance", description: "End-to-end support for achieving and maintaining ISO 27001 certification — gap analysis, documentation, and audit preparation.", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=70" },
  { icon: FileCheck2, title: "Bank of Uganda Audit", description: "Cybersecurity assessments aligned with Bank of Uganda regulatory requirements for supervised financial institutions.", img: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&q=70" },
  { icon: AlertTriangle, title: "Threat Modelling", description: "Systematic identification of threats to your systems and data, with prioritised mitigation strategies.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=70" },
  { icon: Siren, title: "Incident Response", description: "Rapid containment, investigation, and recovery when a breach occurs. 24-hour response commitment.", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=70" },
  { icon: Scale, title: "Regulatory Advisory", description: "Expert guidance on Uganda PDPA 2019, NIST, and East African data protection frameworks.", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=70" },
];

export function ServiceCards() {
  return (
    <section className="bg-gradient-to-b from-light-bg to-brand-offwhite px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <motion.span 
            className="text-sm font-bold uppercase tracking-[0.2em] text-gradient-amber"
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
          >
            Our Expertise
          </motion.span>
          <motion.h2 
            className="mx-auto mt-4 max-w-3xl font-display text-3xl font-bold text-brand-charcoal md:text-5xl"
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Robust Cybersecurity Services for <span className="text-brand-teal">Today&apos;s Threats</span>
          </motion.h2>
          <motion.p 
            className="mx-auto mt-6 max-w-2xl text-lg text-brand-medium"
            initial={{ opacity: 0, y: 15 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Six core capabilities designed for East African banks, government agencies, and enterprises.
          </motion.p>
        </div>

        <motion.div 
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((svc, idx) => (
            <motion.div 
              key={svc.title}
              variants={{ 
                hidden: { opacity: 0, y: 30 }, 
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } 
              }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-light-border shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-brand-amber/30 hover:-translate-y-2"
            >
              {/* Image Header with Gradient Overlay */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image 
                  src={svc.img} 
                  alt="" 
                  fill 
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1" 
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-90" />
                
                {/* Icon Floating Badge */}
                <div className="absolute -bottom-6 left-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-green to-brand-teal text-white shadow-lg ring-4 ring-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <svc.icon className="h-7 w-7" />
                </div>
              </div>

              {/* Content Body */}
              <div className="flex flex-1 flex-col px-6 pt-10 pb-8">
                <h3 className="font-display text-xl font-bold text-brand-charcoal group-hover:text-brand-green transition-colors duration-300">
                  {svc.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-brand-medium group-hover:text-brand-charcoal/80 transition-colors duration-300">
                  {svc.description}
                </p>

                {/* Learn More Link */}
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand-amber opacity-80 transition-all duration-300 group-hover:gap-3 group-hover:opacity-100">
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
              
              {/* Decorative bottom border */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-brand-amber transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
