import type { ServiceIcon as ServiceIconName } from "@/data/services";
import { cn } from "@/lib/cn";

/**
 * One consistent icon system: 24×24 grid, stroked paths only, no fills, uniform
 * 1.5 weight and round joins. Mixing line art with solid glyphs is the fastest
 * way to make a card grid look assembled rather than designed.
 *
 * Only three glyphs — one per service pillar. Icons for the previous ten-service
 * catalogue were removed when the catalogue narrowed to three; they can be
 * added back on demand from git history if a fourth service is ever added.
 */
const paths: Record<ServiceIconName, React.ReactNode> = {
  // Person with a check — a vetted candidate.
  recruitment: (
    <>
      <circle cx="9" cy="7.5" r="3.25" />
      <path d="M3 20.5a6 6 0 0 1 10.2-4.3" />
      <path d="m14.5 18.5 2 2 4-4.5" />
    </>
  ),
  // Filing trays — back office / BPO.
  backoffice: (
    <>
      <path d="M3 13.5h4l1.5 2.5h7l1.5-2.5h4" />
      <path d="M3 13.5v5a1.5 1.5 0 0 0 1.5 1.5h15a1.5 1.5 0 0 0 1.5-1.5v-5" />
      <path d="M6 9.5h12" />
      <path d="M8 5.5h8" />
    </>
  ),
  // Headset — support.
  support: (
    <>
      <path d="M4 13.5v-1.5a8 8 0 0 1 16 0v1.5" />
      <rect x="2.75" y="13" width="4" height="6" rx="1.6" />
      <rect x="17.25" y="13" width="4" height="6" rx="1.6" />
      <path d="M19.25 19v.5a2.5 2.5 0 0 1-2.5 2.5H13" />
    </>
  ),
};

export function ServiceIcon({
  name,
  className,
}: {
  name: ServiceIconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-6 shrink-0", className)}
    >
      {paths[name]}
    </svg>
  );
}
