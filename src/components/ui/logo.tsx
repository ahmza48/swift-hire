import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";

/**
 * The mark is the funnel: three bars narrowing to one. It is the same idea the
 * home page is built around — a wide pool reduced to a single hire.
 */
export function Logo({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={cn("size-6 shrink-0", markClassName)}
      >
        <rect x="1" y="4" width="22" height="3.2" rx="1.6" fill="currentColor" />
        <rect
          x="4.5"
          y="10.4"
          width="15"
          height="3.2"
          rx="1.6"
          fill="currentColor"
          opacity="0.66"
        />
        <rect
          x="9"
          y="16.8"
          width="6"
          height="3.2"
          rx="1.6"
          fill="currentColor"
          opacity="0.4"
        />
      </svg>
      <span
        className="font-display text-[1.0625rem] font-semibold tracking-[0.12em] uppercase"
        style={{ fontVariationSettings: '"SOFT" 20, "opsz" 36' }}
      >
        {siteConfig.name}
      </span>
    </span>
  );
}
