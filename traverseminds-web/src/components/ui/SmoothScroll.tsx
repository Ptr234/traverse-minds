"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const init = () => {
      import("lenis").then(({ default: Lenis }) => {
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          touchMultiplier: 2,
        });

        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
      });
    };

    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(init, { timeout: 2000 });
    } else {
      setTimeout(init, 200);
    }
  }, []);

  return null;
}
