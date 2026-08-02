import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "onInk";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-sm font-medium " +
  // Browsers default <button> to cursor:default, not pointer (only <a href>
  // gets that for free) — without this every Button rendered as an actual
  // <button> looked unclickable on hover.
  "cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-55 " +
  // 44px minimum touch target.
  "min-h-[44px]";

const variants: Record<Variant, string> = {
  // `cta-lift` adds the scale, colour shift and accent glow on hover — all CSS
  // transitions, so they respond within a frame of the pointer arriving. The
  // gradient (rather than a flat fill) is what gives the button some surface
  // instead of reading as a solid-colour rectangle; both stops are bright
  // enough that the dark text's contrast ratio is unaffected by which one
  // a given pixel lands on.
  primary:
    "cta-lift bg-[linear-gradient(135deg,var(--color-jade)_0%,var(--color-jade-strong)_100%)] text-ink hover:bg-[linear-gradient(135deg,#1ee0a0_0%,var(--color-jade)_100%)] border border-transparent",
  secondary:
    "cta-lift border border-on-paper/25 text-on-paper hover:border-on-paper/60 hover:bg-on-paper/[0.04]",
  ghost:
    "transition-colors duration-200 text-on-paper hover:bg-on-paper/[0.06] border border-transparent",
  onInk:
    "cta-lift border border-on-ink/25 text-on-ink hover:border-jade hover:text-jade",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-[0.9375rem]",
  lg: "px-7 py-4 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      // Defaults to "button", not the HTML default of "submit": an untyped
      // button inside a form submits it, which is never what a secondary
      // action wants. Submit buttons pass type="submit" explicitly.
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external = false,
  ...props
}: CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.ComponentPropsWithoutRef<typeof Link>, "href" | "className">) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        // `noopener` closes the reverse-tabnabbing hole; `noreferrer` keeps our
        // URLs out of the destination's analytics.
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

/** Right-pointing chevron used on forward-moving links. */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn("size-4 shrink-0", className)}
    >
      <path
        d="M2 8h11m0 0-4.2-4.2M13 8l-4.2 4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
