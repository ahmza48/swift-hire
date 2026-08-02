"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { EASE_OUT } from "@/components/motion/reveal";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Hero entrance. Unlike `Reveal`, this plays on mount rather than on scroll —
 * the hero is above the fold, so waiting for a viewport intersection would mean
 * it never animates at all.
 */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

export function HeroStagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      data-motion=""
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}

export function HeroItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) return <div className={className}>{children}</div>;

  return (
    <motion.div data-motion="" className={className} variants={item}>
      {children}
    </motion.div>
  );
}

/**
 * Rule that wipes out beneath the hero's accent line, timed to land after the
 * staggered text has finished arriving. It is the closing beat of the entrance
 * rather than a separate flourish, which is why the delay is hard-coded to sit
 * just past the last `HeroItem`.
 */
export function HeroUnderline() {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) return null;

  return (
    <motion.span
      aria-hidden="true"
      data-motion=""
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.9, delay: 0.85, ease: EASE_OUT }}
      className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-[linear-gradient(90deg,var(--color-jade),transparent)]"
    />
  );
}

/**
 * Slow ambient drift behind the hero. Purely decorative, `aria-hidden`, and
 * removed entirely under reduced motion — an infinite loop is exactly the kind
 * of animation that setting exists to stop.
 */
export function AmbientGlow({ className }: { className?: string }) {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      data-motion=""
      className={className}
      animate={{
        opacity: [0.35, 0.6, 0.35],
        scale: [1, 1.12, 1],
        x: [0, 24, 0],
        y: [0, -18, 0],
      }}
      transition={{
        duration: 14,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
