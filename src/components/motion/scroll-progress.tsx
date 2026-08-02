"use client";

import { motion, useScroll, useSpring } from "framer-motion";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Thin accent bar across the very top of the viewport showing how far through
 * the page you are.
 *
 * Driven by `useScroll` through a spring, so the fill eases rather than
 * tracking the scroll position frame-for-frame — the raw value is jittery on
 * trackpads. Purely decorative and `aria-hidden`; it duplicates the scrollbar,
 * which assistive tech already exposes.
 */
export function ScrollProgress() {
  const prefersReduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  if (prefersReduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      data-print-hide=""
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-[linear-gradient(90deg,var(--color-jade-strong),var(--color-jade))]"
    />
  );
}
