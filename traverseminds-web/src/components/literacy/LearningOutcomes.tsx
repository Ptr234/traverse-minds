"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Target, Zap, Users, Lightbulb, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { ProgrammeInquiryModal } from "./ProgrammeInquiryModal";

interface Props {
  outcomes: string[];
  programmeTitle: string;
  audience: string;
}

const icons = [Shield, Target, Zap, Users, Lightbulb, CheckCircle2];

export function LearningOutcomes({ outcomes, programmeTitle, audience }: Props) {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const getAudienceLabel = () => {
    switch (audience) {
      case "students": return "school";
      case "business": return "organisation";
      case "government": return "department";
      default: return "team";
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 gap-6">
        {outcomes.map((outcome, index) => {
          const Icon = icons[index % icons.length];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
              className="group relative flex items-start gap-6 p-6 bg-white border border-black/5 hover:border-accent/20 transition-all duration-300"
              style={{ borderRadius: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" style={{ borderRadius: "16px 0 0 16px" }} />
              
              <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                <Icon className="h-6 w-6" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest opacity-60">Outcome 0{index + 1}</span>
                </div>
                <p className="text-base text-primary font-medium leading-relaxed group-hover:text-black transition-colors">
                  {outcome}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="p-8 bg-primary rounded-2xl text-white overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full -ml-12 -mb-12 blur-2xl" />
        
        <div className="relative z-10 text-center">
          <h3 className="font-display text-2xl font-bold mb-3">Ready to secure your {getAudienceLabel()}?</h3>
          <p className="text-white/60 mb-8 text-sm max-w-md mx-auto italic">
            Get in touch with our specialist team to discuss how we can tailor this programme to your specific needs.
          </p>
          <Button 
            variant="accent" 
            size="lg" 
            className="px-10 group"
            onClick={() => setInquiryOpen(true)}
          >
            Enquire Now <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </motion.div>

      <ProgrammeInquiryModal 
        open={inquiryOpen} 
        onClose={() => setInquiryOpen(false)} 
        programmeTitle={programmeTitle} 
        audience={audience}
      />
    </div>
  );
}
