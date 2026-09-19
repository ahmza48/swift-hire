import type { ServiceIcon as ServiceIconName } from "@/data/services";
import { cn } from "@/lib/cn";

/**
 * One consistent icon system: 24×24 grid, stroked paths only, no fills, uniform
 * 1.5 weight and round joins. Mixing line art with solid glyphs is the fastest
 * way to make a card grid look assembled rather than designed.
 *
 * One glyph per recruitment service. If a seventh service is added, add its
 * icon here and update the `ServiceIcon` union in `data/services.ts`.
 */
const paths: Record<ServiceIconName, React.ReactNode> = {
  // Angle brackets over a rising line — code and shipping.
  technical: (
    <>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="M13.5 5.5 10.5 18.5" />
    </>
  ),
  // Person in profile with a small badge — leadership appointment.
  executive: (
    <>
      <circle cx="9" cy="8" r="3.25" />
      <path d="M3 20.5a6 6 0 0 1 12 0" />
      <path d="M17 6.5v3" />
      <path d="M17 6.5l2.5-2 2.5 2v3l-2.5 2-2.5-2v-3Z" />
    </>
  ),
  // Clock face with hand — time-bound engagement.
  contract: (
    <>
      <circle cx="12" cy="12.5" r="8" />
      <path d="M12 8.5v4l2.5 1.5" />
      <path d="M8 3.5h8" />
    </>
  ),
  // Person with a check — confirmed permanent placement.
  permanent: (
    <>
      <circle cx="9" cy="7.5" r="3.25" />
      <path d="M3 20.5a6 6 0 0 1 10.2-4.3" />
      <path d="m14.5 18.5 2 2 4-4.5" />
    </>
  ),
  // Building with columns — corporate.
  corporate: (
    <>
      <path d="M3.5 20.5V10L12 4.5 20.5 10v10.5" />
      <path d="M3 20.5h18" />
      <path d="M8 20.5v-6" />
      <path d="M12 20.5v-6" />
      <path d="M16 20.5v-6" />
    </>
  ),
  // Speech + gear — advisory / consulting.
  consulting: (
    <>
      <path d="M4 5.5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3.5V15.5H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z" />
      <circle cx="15" cy="6.5" r="1.75" />
      <path d="M15 2.75v1.75M15 8.5v1.75M18.35 4.15l-1.24 1.24M12.9 7.6l-1.24 1.24M18.75 6.5H17M13 6.5h-1.75M18.35 8.85 17.1 7.61M12.9 5.4 11.66 4.16" />
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
