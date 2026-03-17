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
    <div className="flex flex-col items-center">
      <span className="font-display text-3xl text-brand-green md:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-xs uppercase tracking-wider text-brand-muted">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calcTimeLeft(targetDate));

    const interval = setInterval(() => {
      const tl = calcTimeLeft(targetDate);
      if (!tl) {
        clearInterval(interval);
      }
      setTimeLeft(tl);
    }, 1000);

    return () => clearInterval(interval);
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
      <p className="font-display text-xl text-brand-amber">
        This event has started!
      </p>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <Segment value={timeLeft.days} label="Days" />
      <span className="text-2xl text-brand-muted">:</span>
      <Segment value={timeLeft.hours} label="Hours" />
      <span className="text-2xl text-brand-muted">:</span>
      <Segment value={timeLeft.minutes} label="Min" />
      <span className="text-2xl text-brand-muted">:</span>
      <Segment value={timeLeft.seconds} label="Sec" />
    </div>
  );
}
