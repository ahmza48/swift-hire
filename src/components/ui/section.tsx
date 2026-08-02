import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type Tone = "paper" | "sunken" | "ink";

/*
 * Every band gets grain (film-texture noise) and a directional light wash
 * (a soft gradient under 5% opacity, positioned per tone). Both live on
 * `Section` itself rather than per-page, so the whole site reads as one
 * consistent surface instead of flat solid-colour rectangles stacked on top
 * of each other.
 */
const tones: Record<Tone, string> = {
  paper: "bg-paper text-on-paper grain surface-wash-paper",
  sunken: "bg-paper-sunken text-on-paper grain surface-wash-paper",
  ink: "bg-ink text-on-ink on-ink grain surface-wash-ink",
};

const spacing = {
  sm: "py-14 md:py-20",
  md: "py-20 md:py-28",
  lg: "py-24 md:py-36",
} as const;

/**
 * The page is built from alternating navy and paper bands. Vertical rhythm
 * lives here and nowhere else, so no section can accidentally out-specify
 * another's padding.
 */
export function Section({
  children,
  tone = "paper",
  size = "md",
  id,
  className,
  ariaLabelledBy,
}: {
  children: ReactNode;
  tone?: Tone;
  size?: keyof typeof spacing;
  id?: string;
  className?: string;
  ariaLabelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(tones[tone], spacing[size], className)}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

/**
 * Section label. The tick is a structural marker, not decoration — it opens
 * each band the way a rule opens a section in a spec document.
 */
export function Eyebrow({
  children,
  tone = "paper",
  className,
}: {
  children: ReactNode;
  tone?: "paper" | "ink";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "eyebrow",
        tone === "ink" ? "text-jade" : "text-jade-ink",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-7 bg-current opacity-70" />
      {children}
    </p>
  );
}

/**
 * Standard section heading block: eyebrow, H2, optional lead paragraph.
 *
 * `index` prints a large ghost numeral beside the eyebrow. It is structural,
 * not decorative — the home page is a sequence of arguments, and numbering
 * them gives the reader a spine to track position against. Only pass it where
 * the sections genuinely form an ordered set.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  index,
  tone = "paper",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  index?: number;
  tone?: "paper" | "ink";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow || index !== undefined ? (
        <div className="flex items-center gap-4">
          {index !== undefined ? (
            <span
              aria-hidden="true"
              className={cn(
                "font-mono text-[0.6875rem] tabular-nums",
                tone === "ink" ? "text-on-ink/30" : "text-on-paper/25",
              )}
            >
              {String(index).padStart(2, "0")}
            </span>
          ) : null}
          {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
        </div>
      ) : null}
      <h2
        id={id}
        className="display-tight text-[length:var(--text-h2)] leading-[0.98] font-bold"
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "text-[length:var(--text-lead)] leading-relaxed",
            tone === "ink" ? "text-on-ink-muted" : "text-on-paper-muted",
            align === "center" && "max-w-2xl",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
