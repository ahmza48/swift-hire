"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the OS "reduce motion" setting.
 *
 * Deliberately starts `false` so the server render and the first client render
 * agree — reading `matchMedia` during render would differ between the two and
 * trip a hydration mismatch. The real value lands in an effect, one tick later.
 *
 * That one tick is covered by CSS: `globals.css` force-shows every `[data-motion]`
 * element under `prefers-reduced-motion: reduce` with `!important`, which beats
 * the inline `opacity: 0` Framer Motion writes. So a reduced-motion user never
 * sees a hidden element, even on the very first paint.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return prefersReduced;
}
