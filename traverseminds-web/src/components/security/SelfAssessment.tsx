"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { SectionReveal } from "@/components/ui/SectionReveal";
import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const questions = [
  "Does your organisation have a documented cybersecurity policy?",
  "Have you conducted a penetration test in the last 12 months?",
  "Do you have an incident response plan?",
  "Are your employees trained on phishing and social engineering?",
  "Are you compliant with Bank of Uganda cybersecurity guidelines?",
];

interface ScoreBand {
  range: string;
  label: string;
  color: string;
  icon: typeof ShieldCheck;
  description: string;
  bgClass: string;
  borderClass: string;
}

const scoreBands: Record<string, ScoreBand> = {
  critical: {
    range: "0 - 1",
    label: "Critical",
    color: "text-red-400",
    icon: ShieldX,
    description:
      "Your organisation faces significant cybersecurity risks. Immediate action is recommended to establish baseline security controls and develop a comprehensive protection strategy.",
    bgClass: "bg-red-500/10",
    borderClass: "border-red-500/20",
  },
  needsWork: {
    range: "2 - 3",
    label: "Needs Work",
    color: "text-amber-400",
    icon: ShieldAlert,
    description:
      "You have some foundations in place, but critical gaps remain. A structured assessment would help prioritise improvements and strengthen your security posture.",
    bgClass: "bg-amber-500/10",
    borderClass: "border-amber-500/20",
  },
  good: {
    range: "4 - 5",
    label: "Good",
    color: "text-emerald",
    icon: ShieldCheck,
    description:
      "Your organisation demonstrates solid cybersecurity awareness. Consider a formal audit to validate controls and identify opportunities for continuous improvement.",
    bgClass: "bg-emerald/10",
    borderClass: "border-emerald/20",
  },
};

function getScoreBand(score: number): ScoreBand {
  if (score <= 1) return scoreBands.critical;
  if (score <= 3) return scoreBands.needsWork;
  return scoreBands.good;
}

export function SelfAssessment() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;
  const score = Object.values(answers).filter(Boolean).length;
  const band = getScoreBand(score);
  const BandIcon = band.icon;

  const handleAnswer = (questionIdx: number, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [questionIdx]: value }));
  };

  const handleSubmit = () => {
    if (allAnswered) setShowResult(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResult(false);
  };

  return (
    <SectionReveal variant="clip-inset" className="mx-auto max-w-2xl">
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
          >
            {/* Progress bar */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/40">
                  Progress
                </span>
                <span className="text-sm font-mono font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {answeredCount}/{questions.length}
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/6 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  animate={{ width: `${(answeredCount / questions.length) * 100}%` }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-4">
              {questions.map((question, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
                  className={cn(
                    "border p-6",
                    answers[idx] !== undefined
                      ? "border-white/10 bg-white/5"
                      : "border-white/6 bg-white/[0.02]"
                  )}
                  style={{ borderRadius: 8, transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-white/6 text-[11px] font-bold text-white/30 font-mono" style={{ borderRadius: 6 }}>
                        {idx + 1}
                      </span>
                      <p className="text-sm md:text-base font-medium text-white/80 leading-relaxed">
                        {question}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 ml-9 flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleAnswer(idx, true)}
                      className={cn(
                        "inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold cursor-pointer",
                        answers[idx] === true
                          ? "bg-emerald/20 text-emerald border border-emerald/30"
                          : "bg-white/5 text-white/40 border border-white/8"
                      )}
                      style={{ borderRadius: 999, transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAnswer(idx, false)}
                      className={cn(
                        "inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold cursor-pointer",
                        answers[idx] === false
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : "bg-white/5 text-white/40 border border-white/8"
                      )}
                      style={{ borderRadius: 999, transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                    >
                      <XCircle className="h-4 w-4" />
                      No
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Submit */}
            <div className="mt-8">
              <Button
                variant="primary"
                size="lg"
                className="w-full justify-center"
                disabled={!allAnswered}
                onClick={handleSubmit}
              >
                See My Score
                <ArrowRight className="h-4 w-4" />
              </Button>
              {!allAnswered && (
                <p className="mt-3 text-center text-xs text-white/25">
                  Answer all {questions.length} questions to see your result
                </p>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
          >
            {/* Score display */}
            <div
              className={cn(
                "border p-8 md:p-10 text-center",
                band.borderClass,
                band.bgClass
              )}
              style={{ borderRadius: 16 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center bg-white/10"
                style={{ borderRadius: 8 }}
              >
                <BandIcon className={cn("h-10 w-10", band.color)} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/40 mb-2">
                  Your Score
                </p>
                <p className="font-display text-5xl md:text-6xl font-bold text-white">
                  {score}
                  <span className="text-2xl text-white/30">/{questions.length}</span>
                </p>
                <p className={cn("mt-3 font-display text-xl font-bold", band.color)}>
                  {band.label}
                </p>
              </motion.div>
            </div>

            {/* Recommendation */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
              className="mt-6 border border-white/6 bg-white/[0.02] p-6 md:p-8"
              style={{ borderRadius: 8 }}
            >
              <h4 className="font-display text-lg font-bold text-white mb-3">
                Our Recommendation
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                {band.description}
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Button
                variant="primary"
                size="lg"
                href="/contact?division=security"
                className="flex-1 justify-center"
              >
                Book a Full Assessment
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline-dark"
                size="lg"
                className="flex-1 justify-center"
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4" />
                Retake Quiz
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionReveal>
  );
}
