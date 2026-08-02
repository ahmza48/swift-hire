"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Fades page content in on route change.
 *
 * Keyed on the pathname, with no `exit` variant and no `mode="wait"`. In the App
 * Router the new route's content is already committed by the time
 * AnimatePresence would run an exit animation, so `mode="wait"` produces a
 * blank gap or a flash of the previous page rather than a crossfade. Fading the
 * incoming page in is the part that actually works, and it is what was asked
 * for: opacity 0 → 1 over 300ms.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) return <>{children}</>;

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={pathname}
        data-motion=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
