import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Seamless horizontal ticker.
 *
 * Renders `items` twice inside a `max-content` track that translates exactly
 * -50%, so the second copy is in the first copy's position at the moment the
 * animation loops — no visible seam. The duplicate is `aria-hidden` so screen
 * readers and the accessibility tree see each item once.
 *
 * A server component: the whole thing is CSS, so there is no reason to ship it
 * to the client or make it wait for hydration.
 */
export function Marquee({
  items,
  renderItem,
  durationSeconds = 42,
  className,
}: {
  items: readonly string[];
  renderItem: (item: string) => ReactNode;
  durationSeconds?: number;
  className?: string;
}) {
  return (
    <div className={cn("marquee-mask overflow-hidden", className)}>
      <div
        className="marquee-track gap-3"
        style={{ ["--marquee-duration" as string]: `${durationSeconds}s` }}
      >
        <ul className="flex shrink-0 gap-3 pr-3">
          {items.map((item) => (
            <li key={item}>{renderItem(item)}</li>
          ))}
        </ul>
        <ul aria-hidden="true" className="flex shrink-0 gap-3 pr-3">
          {items.map((item) => (
            <li key={item}>{renderItem(item)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
