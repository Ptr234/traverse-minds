"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: string): TimeLeft | null {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Segment({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center group/seg">
      <div className="relative rounded-xl bg-white/5 border border-white/8 px-3 py-2 transition-all duration-500 group-hover/seg:border-accent/25 group-hover/seg:bg-accent/5">
        <span className="font-display text-4xl font-bold text-white md:text-5xl tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-2 text-xs uppercase tracking-[0.15em] text-accent font-semibold">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = setTimeout(() => {
      setMounted(true);
      setTimeLeft(calcTimeLeft(targetDate));
    }, 0);

    const interval = setInterval(() => {
      const tl = calcTimeLeft(targetDate);
      if (!tl) {
        clearInterval(interval);
      }
      setTimeLeft(tl);
    }, 1000);

    return () => {
      clearTimeout(handle);
      clearInterval(interval);
    };
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="flex items-center gap-6">
        {["Days", "Hours", "Min", "Sec"].map((label) => (
          <Segment key={label} value={0} label={label} />
        ))}
      </div>
    );
  }

  if (!timeLeft) {
    return (
      <p className="font-display text-xl font-bold text-accent">
        This event has started!
      </p>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <Segment value={timeLeft.days} label="Days" />
      <span className="text-2xl text-white/30">:</span>
      <Segment value={timeLeft.hours} label="Hours" />
      <span className="text-2xl text-white/30">:</span>
      <Segment value={timeLeft.minutes} label="Min" />
      <span className="text-2xl text-white/30">:</span>
      <Segment value={timeLeft.seconds} label="Sec" />
    </div>
  );
}
