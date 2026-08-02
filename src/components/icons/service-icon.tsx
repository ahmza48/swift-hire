import type { ServiceIcon as ServiceIconName } from "@/data/services";
import { cn } from "@/lib/cn";

/**
 * One consistent icon system: 24×24 grid, stroked paths only, no fills, uniform
 * 1.5 weight and round joins. Mixing line art with solid glyphs is the fastest
 * way to make a card grid look assembled rather than designed.
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
  // Angle brackets over a baseline — code.
  development: (
    <>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="M13.5 5.5 10.5 18.5" />
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
  // Stacked database cylinders.
  data: (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.75" />
      <path d="M4.5 5.5v6c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75v-6" />
      <path d="M4.5 11.5v6c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75v-6" />
    </>
  ),
  // Ledger column chart with a rising line.
  finance: (
    <>
      <path d="M3 20.5h18" />
      <path d="M6.5 20.5v-5" />
      <path d="M11 20.5v-9" />
      <path d="M15.5 20.5v-4" />
      <path d="M20 20.5v-12" />
      <path d="m5 10 5-4.5 4 3 5.5-5" />
    </>
  ),
  // Rack server units.
  it: (
    <>
      <rect x="3" y="4" width="18" height="6" rx="1.75" />
      <rect x="3" y="14" width="18" height="6" rx="1.75" />
      <path d="M6.75 7h.01" />
      <path d="M6.75 17h.01" />
      <path d="M10.5 7H17" />
      <path d="M10.5 17H17" />
    </>
  ),
  // Megaphone with signal.
  marketing: (
    <>
      <path d="M4 10.5v3a1.5 1.5 0 0 0 1.5 1.5H8l6.5 4V6.5L8 10.5H5.5A1.5 1.5 0 0 0 4 12Z" />
      <path d="M8 15v4.5" />
      <path d="M18 9.5a4 4 0 0 1 0 5" />
      <path d="M20.5 7a7.5 7.5 0 0 1 0 10" />
    </>
  ),
  // Filing trays.
  backoffice: (
    <>
      <path d="M3 13.5h4l1.5 2.5h7l1.5-2.5h4" />
      <path d="M3 13.5v5a1.5 1.5 0 0 0 1.5 1.5h15a1.5 1.5 0 0 0 1.5-1.5v-5" />
      <path d="M6 9.5h12" />
      <path d="M8 5.5h8" />
    </>
  ),
  // ID badge — people records.
  payroll: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M9 3.5h6" />
      <circle cx="12" cy="11" r="2.25" />
      <path d="M8.25 17a3.9 3.9 0 0 1 7.5 0" />
    </>
  ),
  // Process flow — nodes and connections.
  consulting: (
    <>
      <rect x="3" y="3.5" width="6" height="5" rx="1.5" />
      <rect x="15" y="3.5" width="6" height="5" rx="1.5" />
      <rect x="9" y="15.5" width="6" height="5" rx="1.5" />
      <path d="M6 8.5v3a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5v-3" />
      <path d="M12 13v2.5" />
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
