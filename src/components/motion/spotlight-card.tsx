"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type {
  ComponentPropsWithoutRef,
  ElementType,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";

import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Tone = "paper" | "ink";

const surface: Record<Tone, string> = {
  paper:
    "border-on-paper/12 bg-paper-raised hover:border-jade-strong/60 hover:shadow-[0_20px_44px_-20px_rgba(20,23,26,0.35)]",
  ink: "border-ink-line bg-ink-raised/50 hover:border-jade/60 hover:shadow-[0_20px_48px_-20px_rgba(0,0,0,0.75)]",
};

const glow: Record<Tone, string> = {
  paper: "rgba(125, 95, 46, 0.12)",
  ink: "rgba(198, 157, 94, 0.14)",
};

/**
 * A card that lifts on hover and carries a soft radial highlight that tracks
 * the pointer.
 *
 * The highlight is written through Framer Motion's `useMotionValue` /
 * `useMotionTemplate` rather than React state — position updates on every
 * `pointermove` are applied directly to the DOM style, bypassing re-renders,
 * which is the only way this stays smooth at 60fps. Under reduced motion, the
 * glow is dropped entirely and the card falls back to a plain static surface;
 * everything else about the card (border, background, content) is unchanged,
 * so nothing is lost, only the pointer-driven motion.
 */
const layouts = {
  col: "flex-col",
  row: "flex-row",
} as const;

type SpotlightCardProps<T extends ElementType> = {
  as?: T;
  tone?: Tone;
  /**
   * Flex direction of the content wrapper. A prop rather than something
   * expressed through `className`: two conflicting Tailwind flex-direction
   * utilities on the same element resolve by CSS source order, not by the
   * order they appear in the class string, which makes "just override it via
   * className" unreliable. This makes the choice explicit instead.
   */
  layout?: keyof typeof layouts;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children" | "onPointerMove">;

export function SpotlightCard<T extends ElementType = "div">({
  as,
  tone = "paper",
  layout = "col",
  className,
  children,
  ...rest
}: SpotlightCardProps<T>) {
  const prefersReduced = usePrefersReducedMotion();
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const background = useMotionTemplate`radial-gradient(220px circle at ${mouseX}% ${mouseY}%, ${glow[tone]}, transparent 70%)`;

  const Tag = (as ?? "div") as ElementType;

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (prefersReduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(((event.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  return (
    /*
     * Surface concerns (border, background, hover lift/shadow, clipping) live
     * on `Tag` and are fixed, not caller-configurable — every card in this
     * system should look like the same kind of object. `h-full` is here
     * unconditionally so the card always fills a stretched grid/flex cell.
     */
    <Tag
      onPointerMove={onPointerMove}
      className={cn(
        // Tailwind v4 compiles `-translate-y-*` to the standalone CSS `translate`
        // property, not `transform` — omitting it here means the lift snaps
        // instantly instead of animating while border/shadow ease in smoothly.
        "group relative h-full overflow-hidden rounded-md border transition-[translate,border-color,box-shadow] duration-300",
        "hover:-translate-y-1.5",
        surface[tone],
      )}
      {...rest}
    >
      {prefersReduced ? null : (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background }}
        />
      )}
      {/*
       * Layout concerns (padding, gap, alignment, direction) all belong to
       * the caller and all land here, on the one real flex container — not
       * split across this element and `Tag`, which is what silently dropped
       * `gap`/`items-*` the first time this was wired up.
       */}
      <div
        className={cn("relative z-10 flex h-full", layouts[layout], className)}
      >
        {children}
      </div>
    </Tag>
  );
}
