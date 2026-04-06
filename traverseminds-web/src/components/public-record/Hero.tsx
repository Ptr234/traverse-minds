"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { TextReveal } from "@/components/ui/TextReveal";
import { ArrowRight, Search, MapPin, ChevronDown } from "lucide-react";

const heroImages = [
  "https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2030&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=2070&auto=format&fit=crop",
];

const jurisdictions = ["All Africa", "Uganda", "Kenya", "Tanzania", "Rwanda", "Burundi", "Nigeria", "South Africa"];

interface HeroProps {
  onSearch: (query: string, jurisdiction: string) => void;
}

export function Hero({ onSearch }: HeroProps) {
  const [query, setQuery] = useState("");
  const [jurisdiction, setJurisdiction] = useState("Uganda");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query, jurisdiction);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <ImageSlideshow images={heroImages} overlay="bg-primary/75" />

      <div className="container-max relative z-10 px-6 lg:px-8 pt-32 pb-24 lg:pt-40">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Public Record Africa</p>
          </motion.div>

          <TextReveal
            as="h1"
            variant="blur-in"
            delay={0.3}
            className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight"
          >
            Africa&apos;s government records -- <span className="text-accent">intelligently</span> searchable
          </TextReveal>

          <motion.p
            className="mt-6 text-lg md:text-xl leading-relaxed max-w-2xl"
            style={{ color: "rgba(255,255,255,0.6)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
          >
            Instant access to gazettes, court filings, and regulatory updates across 
            the continent. Powering evidence-based legal and policy research.
          </motion.p>

          {/* Functional Search Bar */}
          <motion.div
            className="mt-12 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <div className="relative flex flex-col sm:flex-row items-stretch gap-2 bg-white p-2" style={{ borderRadius: 12, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
              {/* Jurisdiction Selector */}
              <div className="relative shrink-0">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex h-full items-center gap-2 px-4 py-3 text-sm font-bold border-r border-black/5 hover:bg-black/5 transition-colors"
                  style={{ color: "#000" }}
                >
                  <MapPin className="h-4 w-4 text-accent" />
                  {jurisdiction}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-black/10 shadow-xl z-50 overflow-hidden" style={{ borderRadius: 8 }}>
                    {jurisdictions.map((j) => (
                      <button
                        key={j}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-accent hover:text-white transition-colors"
                        onClick={() => {
                          setJurisdiction(j);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {j}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Input */}
              <div className="grow relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black/20" />
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search court records, gazettes, or filings..."
                  className="w-full h-full pl-12 pr-4 py-4 bg-transparent text-black outline-none font-medium placeholder:text-black/30"
                />
              </div>

              {/* Search Button */}
              <button 
                onClick={handleSearch}
                className="bg-accent text-white px-8 py-4 font-bold flex items-center justify-center gap-2 hover:bg-accent/90 transition-all active:scale-95"
                style={{ borderRadius: 8 }}
              >
                Search
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-4 px-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white/40">Trending:</span>
              {["Tax Law 2024", "Land Registry Uganda", "Electoral Commission"].map((tag) => (
                <button 
                  key={tag} 
                  onClick={() => onSearch(tag, "Uganda")}
                  className="text-xs font-medium text-white/60 hover:text-accent transition-colors underline decoration-white/20 underline-offset-4"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
