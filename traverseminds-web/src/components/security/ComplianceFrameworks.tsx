"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const frameworks = [
  { name: "ISO 27001", description: "International information security management standard", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=60" },
  { name: "Bank of Uganda Guidelines", description: "Cybersecurity requirements for supervised financial institutions", image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=400&q=60" },
  { name: "NIST CSF", description: "US National Institute of Standards and Technology Cybersecurity Framework", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=60" },
  { name: "Uganda PDPA 2019", description: "Personal Data Protection Act — Uganda's data privacy law", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=60" },
  { name: "PCI DSS", description: "Payment Card Industry Data Security Standard for card processing", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=60" },
  { name: "COBIT", description: "IT governance and management framework for enterprise systems", image: "https://images.unsplash.com/photo-1504711434969-e33886168d0c?w=400&q=60" },
];

export function ComplianceFrameworks() {
  return (
    <section className="relative bg-white section-padding overflow-hidden">
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
            <div className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">Compliance</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
            Frameworks we support
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mt-3 text-brand-medium/60 max-w-xl mx-auto">
            We assess and audit against the standards that matter most to East African institutions.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {frameworks.map((fw) => (
            <motion.div
              key={fw.name}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } } }}
              className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated min-h-36"
            >
              <Image src={fw.image} alt={fw.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-primary/80 group-hover:bg-primary/70 transition-colors duration-500" />

              <div className="relative z-10 p-6 flex items-start gap-4">
                <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accent/50 group-hover:bg-accent transition-colors" />
                <div>
                  <h3 className="font-display font-bold text-white">{fw.name}</h3>
                  <p className="mt-1 text-sm text-white/55 leading-relaxed">{fw.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
