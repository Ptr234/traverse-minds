"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  Tag, 
  ChevronRight, 
  Loader2,
  X
} from "lucide-react";
import { Button } from "@/components/ui/Button";

// Mock data for search results
const MOCK_RESULTS = [
  {
    id: "1",
    title: "Uganda Gazette Vol. CXVII No. 15",
    jurisdiction: "Uganda",
    date: "2024-03-15",
    category: "Gazette",
    snippet: "Notice is hereby given that the following companies have been struck off the register... Section 4 of the Companies Act 2012...",
    tags: ["Corporate", "Legal Notice"],
  },
  {
    id: "2",
    title: "Supreme Court Ruling: Civil Appeal No. 10 of 2023",
    jurisdiction: "Kenya",
    date: "2024-02-28",
    category: "Court Filing",
    snippet: "The appellant seeks a declaration that the High Court erred in law by failing to consider the constitutional implications of...",
    tags: ["Civil Law", "Constitutional"],
  },
  {
    id: "3",
    title: "Finance Act 2024 - Regulatory Update",
    jurisdiction: "Nigeria",
    date: "2024-01-10",
    category: "Regulation",
    snippet: "An Act to amend the personal income tax act, value added tax act, and for related matters... Implementation starts on...",
    tags: ["Taxation", "Finance"],
  },
  {
    id: "4",
    title: "Land Registry: Title Deed Verification Procedures",
    jurisdiction: "Tanzania",
    date: "2023-12-05",
    category: "Administrative",
    snippet: "Guidelines for the verification of electronic title deeds in accordance with the Land Act (Cap 113)... Requirements include...",
    tags: ["Land", "Real Estate"],
  },
  {
    id: "5",
    title: "Intellectual Property Journal - Issue 42",
    jurisdiction: "South Africa",
    date: "2024-03-01",
    category: "Gazette",
    snippet: "Applications for the registration of trademarks, patents and industrial designs... Opposition period ends within 60 days...",
    tags: ["IP", "Trademarks"],
  },
];

interface SearchInterfaceProps {
  query: string;
  initialJurisdiction?: string;
  onClose: () => void;
}

export function SearchInterface({ query, initialJurisdiction = "All Africa", onClose }: SearchInterfaceProps) {
  const [activeQuery, setActiveQuery] = useState(query);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState(initialJurisdiction);
  const [selectedCategory, setSelectedCategory] = useState("All Types");
  const [isLoading, setIsLoading] = useState(false);

  const categories = ["All Types", "Gazette", "Court Filing", "Regulation", "Administrative"];
  const jurisdictions = ["All Africa", "Uganda", "Kenya", "Tanzania", "Rwanda", "Nigeria", "South Africa"];

  // Simulate loading state when query or filters change
  const handleSearch = (newQuery: string) => {
    setActiveQuery(newQuery);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  const filteredResults = useMemo(() => {
    return MOCK_RESULTS.filter(result => {
      const matchesQuery = result.title.toLowerCase().includes(activeQuery.toLowerCase()) || 
                           result.snippet.toLowerCase().includes(activeQuery.toLowerCase());
      const matchesJurisdiction = selectedJurisdiction === "All Africa" || result.jurisdiction === selectedJurisdiction;
      const matchesCategory = selectedCategory === "All Types" || result.category === selectedCategory;
      
      return matchesQuery && matchesJurisdiction && matchesCategory;
    });
  }, [activeQuery, selectedJurisdiction, selectedCategory]);

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col overflow-hidden">
      {/* Search Header */}
      <header className="border-b border-black/10 px-6 py-4 flex items-center justify-between gap-4 bg-white">
        <div className="flex items-center gap-4 flex-grow max-w-4xl mx-auto w-full">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black/20" />
            <input 
              type="text" 
              value={activeQuery}
              onChange={(e) => setActiveQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(activeQuery)}
              placeholder="Search court records, gazettes, or filings..."
              className="w-full pl-12 pr-4 py-3 bg-[#f0f1f4] text-black outline-none font-medium placeholder:text-black/30"
              style={{ borderRadius: 8 }}
            />
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClose}
            className="shrink-0 flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Close
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Filters */}
        <aside className="w-64 border-r border-black/10 p-6 hidden md:block overflow-y-auto bg-[#fafbfc]">
          <div className="space-y-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4 flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                Jurisdiction
              </h3>
              <div className="space-y-1">
                {jurisdictions.map((j) => (
                  <button
                    key={j}
                    onClick={() => setSelectedJurisdiction(j)}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center justify-between ${
                      selectedJurisdiction === j 
                        ? "bg-accent text-white font-bold" 
                        : "text-black/60 hover:bg-black/5"
                    }`}
                    style={{ borderRadius: 6 }}
                  >
                    {j}
                    {selectedJurisdiction === j && <ChevronRight className="h-3 w-3" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4 flex items-center gap-2">
                <Tag className="h-3 w-3" />
                Document Type
              </h3>
              <div className="space-y-1">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center justify-between ${
                      selectedCategory === c 
                        ? "bg-accent text-white font-bold" 
                        : "text-black/60 hover:bg-black/5"
                    }`}
                    style={{ borderRadius: 6 }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-black/10">
              <Button variant="outline" className="w-full text-xs font-bold py-2 h-auto" onClick={() => {
                setSelectedJurisdiction("All Africa");
                setSelectedCategory("All Types");
                setActiveQuery("");
              }}>
                Clear All Filters
              </Button>
            </div>
          </div>
        </aside>

        {/* Results Main Area */}
        <main className="flex-1 overflow-y-auto bg-white p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-sm font-bold text-black/40 uppercase tracking-widest">
                  {isLoading ? "Searching..." : `Showing ${filteredResults.length} results`}
                </h2>
                {activeQuery && !isLoading && (
                  <p className="mt-1 text-black font-medium">
                    Results for &quot;<span className="text-accent">{activeQuery}</span>&quot;
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-9 px-3 text-xs font-bold md:hidden">
                  <Filter className="h-3.5 w-3.5 mr-1.5" />
                  Filters
                </Button>
                <select className="bg-transparent border border-black/10 text-xs font-bold px-3 py-1.5 outline-none" style={{ borderRadius: 6 }}>
                  <option>Sort by: Most Relevant</option>
                  <option>Sort by: Newest First</option>
                  <option>Sort by: Oldest First</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-10 w-10 text-accent animate-spin mb-4" />
                <p className="text-black/40 font-medium">Scanning archives across the continent...</p>
              </div>
            ) : filteredResults.length > 0 ? (
              <div className="space-y-6">
                {filteredResults.map((result, idx) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group border border-black/10 p-6 hover:border-accent/30 hover:shadow-lg transition-all"
                    style={{ borderRadius: 12 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className="bg-accent/5 text-accent text-[10px] font-bold uppercase tracking-widest px-2 py-0.5" style={{ borderRadius: 4 }}>
                            {result.category}
                          </span>
                          <span className="flex items-center gap-1.5 text-black/40 text-[10px] font-bold uppercase tracking-widest">
                            <MapPin className="h-3 w-3" />
                            {result.jurisdiction}
                          </span>
                          <span className="flex items-center gap-1.5 text-black/40 text-[10px] font-bold uppercase tracking-widest">
                            <Calendar className="h-3 w-3" />
                            {result.date}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-black group-hover:text-accent transition-colors mb-2">
                          {result.title}
                        </h3>
                        
                        <p className="text-black/60 text-sm leading-relaxed mb-4 max-w-3xl">
                          {result.snippet}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {result.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-bold text-black/30 border border-black/10 px-2 py-1" style={{ borderRadius: 4 }}>
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-row md:flex-col gap-2 shrink-0">
                        <Button size="sm" className="flex items-center gap-2">
                          <Download className="h-3.5 w-3.5" />
                          PDF
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <ExternalLink className="h-3.5 w-3.5" />
                          View
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-[#f0f1f4] p-6 rounded-full mb-6">
                  <Search className="h-10 w-10 text-black/20" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">No documents found</h3>
                <p className="text-black/40 max-w-md mx-auto">
                  We couldn&apos;t find any records matching &quot;{activeQuery}&quot;. Try adjusting your filters or searching with different keywords.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-8"
                  onClick={() => {
                    setSelectedJurisdiction("All Africa");
                    setSelectedCategory("All Types");
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
            
            {/* AI Insights Sidebar Teaser (only visible when results exist) */}
            {!isLoading && filteredResults.length > 0 && (
              <div className="mt-16 bg-[#212429] p-8 relative overflow-hidden" style={{ borderRadius: 16 }}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px]" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="shrink-0 h-16 w-16 bg-accent flex items-center justify-center" style={{ borderRadius: 12 }}>
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h4 className="text-white text-xl font-bold mb-2">Generate AI Case Summary</h4>
                    <p className="text-white/50 text-sm max-w-md">
                      Instantly extract key legal points, dates, and parties involved from these documents using our specialized AI.
                    </p>
                  </div>
                  <Button variant="primary" className="shrink-0">
                    Try AI Summary
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
