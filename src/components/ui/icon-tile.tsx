import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type Tone = "paper" | "ink";

const tones: Record<Tone, string> = {
  paper:
    "bg-[linear-gradient(155deg,color-mix(in_oklab,var(--color-jade)_16%,transparent),color-mix(in_oklab,var(--color-jade)_5%,transparent))] text-jade-ink ring-1 ring-jade-strong/15",
  ink: "bg-[linear-gradient(155deg,color-mix(in_oklab,var(--color-jade)_22%,transparent),color-mix(in_oklab,var(--color-jade)_6%,transparent))] text-jade ring-1 ring-jade/20",
};

/**
 * Tinted, rounded backdrop for an icon.
 *
 * A bare line-icon floating on a card reads as an afterthought once the card
 * has any real content next to it — this gives every icon a consistent frame
 * so the icon itself becomes a compositional element rather than a bullet
 * point. Size is a prop, not a variant list, because callers need it to match
 * their own card's scale (a home-grid tile and a service-page hero use
 * different sizes for the same tile).
 */
export function IconTile({
  children,
  tone = "paper",
  size = 44,
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-[0.7rem] transition-transform duration-300",
        tones[tone],
        className,
      )}
      style={{ width: size, height: size }}
    >
      {children}
    </span>
  );
}
