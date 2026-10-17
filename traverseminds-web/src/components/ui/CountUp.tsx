"use client";

import { useEffect, useRef } from "react";

const NUMBER = /\d[\d,]*(\.\d+)?/;

/**
 * Renders `value` as-is (so the static HTML and no-JS readers get the real figure), then counts the
 * first number in it up from zero the first time it scrolls into view. Figures already on screen
 * when the page loads, and reduced-motion visitors, are left alone.
 */
export function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(NUMBER);
    if (!el || !match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    const target = parseFloat(match[0].replace(/,/g, ""));
    const decimals = match[1] ? match[1].length - 1 : 0;
    const grouped = match[0].includes(",");
    const [before, after] = [value.slice(0, match.index), value.slice((match.index ?? 0) + match[0].length)];
    const render = (n: number) => {
      const s = grouped
        ? n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : n.toFixed(decimals);
      el.textContent = before + s + after;
    };

    let frame = 0;
    render(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          render(target * (1 - Math.pow(1 - t, 3)));
          if (t < 1) frame = requestAnimationFrame(step);
          else el.textContent = value;
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value, duration]);

  return <span ref={ref}>{value}</span>;
}
