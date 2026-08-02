"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/** Shared easing so every entrance on the site decelerates identically. */
export const EASE_OUT = [0.25, 1, 0.5, 1] as const;

const TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
  ul: motion.ul,
  ol: motion.ol,
  p: motion.p,
  header: motion.header,
  figure: motion.figure,
} as const;

export type MotionTag = keyof typeof TAGS;

/** Viewport trigger used by every scroll animation in this file. Not imported elsewhere. */
const VIEWPORT = { once: true, amount: 0.15, margin: "0px 0px -8% 0px" };

/**
 * Fade-up entrance, played once when the element scrolls into view.
 *
 * `delay` is in **milliseconds** — the signature predates Framer Motion and is
 * kept so existing pages (which stagger with `delay={index * 80}`) did not have
 * to change.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  id,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: MotionTag;
  id?: string;
}) {
  const prefersReduced = usePrefersReducedMotion();
  const Tag = TAGS[as];
  const Plain = as;

  if (prefersReduced) {
    return (
      <Plain id={id} className={className}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      id={id}
      data-motion=""
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, delay: delay / 1000, ease: EASE_OUT }}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */

const containerVariants: Variants = {
  hidden: {},
  show: (stagger: number) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

/**
 * Staggered group. Children wrapped in `<StaggerItem>` animate in sequence
 * rather than each running its own viewport observer.
 */
export function Stagger({
  children,
  className,
  as = "div",
  stagger = 0.09,
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: MotionTag;
  stagger?: number;
  id?: string;
}) {
  const prefersReduced = usePrefersReducedMotion();
  const Tag = TAGS[as];
  const Plain = as;

  if (prefersReduced) {
    return (
      <Plain id={id} className={className}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      id={id}
      data-motion=""
      className={className}
      variants={containerVariants}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: MotionTag;
}) {
  const prefersReduced = usePrefersReducedMotion();
  const Tag = TAGS[as];
  const Plain = as;

  if (prefersReduced) {
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag data-motion="" className={className} variants={itemVariants}>
      {children}
    </Tag>
  );
}
