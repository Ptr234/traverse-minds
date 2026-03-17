"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

const points = [
  "End-to-end security assessments for banks and government",
  "Compliance with Uganda PDPA, ISO 27001, and NIST frameworks",
  "Local expertise — Kampala-based, not flying in from overseas",
  "Integrated intelligence from our Think Tank research",
];

export function WhatWeDo() {
  return (
    <section className="bg-light-bg px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <motion.span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Why Traverse Minds
          </motion.span>
          <motion.h2 className="mx-auto mt-3 max-w-3xl font-display text-2xl text-brand-green md:text-4xl"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            Protecting East Africa&apos;s Critical Institutions
          </motion.h2>
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div className="relative"
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="relative aspect-4/3 overflow-hidden rounded-xl">
              <Image src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80" alt="Digital security and data visualization"
                fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
            <p className="text-brand-medium leading-relaxed">
              Traverse Minds operates six interconnected divisions that protect,
              inform, and empower East African institutions and citizens. We secure
              critical systems for banks and government. We build intelligence tools,
              train organisations in digital safety, publish independent policy
              research, and host the region&apos;s most focused cybersecurity events.
            </p>

            <ul className="mt-6 space-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
                  <span className="text-brand-medium">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button variant="primary" size="lg" href="/security#enquiry">
                Request a Security Assessment
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
