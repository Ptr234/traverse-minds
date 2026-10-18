"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ProgrammeInquiryModal } from "./ProgrammeInquiryModal";

interface Props {
  outcomes: string[];
  programmeTitle: string;
  audience: string;
}

const AUDIENCE_NOUN: Record<string, string> = { students: "school", business: "organisation", government: "department" };

/** Numbered learning outcomes and the programme enquiry (opens the enquiry modal). */
export function LearningOutcomes({ outcomes, programmeTitle, audience }: Props) {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <div>
      <ol className="border-t-2 border-black">
        {outcomes.map((outcome, index) => (
          <li key={outcome} className="grid grid-cols-[44px_1fr] border-b border-black/15 py-4">
            <span className="font-mono text-[13px] font-semibold text-accent">{String(index + 1).padStart(2, "0")}</span>
            <p className="text-[16px] leading-relaxed text-gn-200">{outcome}</p>
          </li>
        ))}
      </ol>

      <div className="relative mt-8 overflow-hidden bg-bg-dark p-7 text-white">
        <div className="tech-grid-dark absolute inset-0" aria-hidden />
        <div className="relative">
          <p className="font-serif text-[23px] font-semibold leading-snug">Ready to train your {AUDIENCE_NOUN[audience] ?? "team"}?</p>
          <p className="mt-2 text-[15px] leading-relaxed text-white/65">
            Talk to our team about tailoring this programme to your needs.
          </p>
          <button
            type="button"
            onClick={() => setInquiryOpen(true)}
            className="mt-6 inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-[14px] font-bold uppercase tracking-wider text-white"
          >
            Enquire now <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      <ProgrammeInquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} programmeTitle={programmeTitle} audience={audience} />
    </div>
  );
}
