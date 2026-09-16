"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Persistent "Book a call" action, revealed after 300px of scroll.
 *
 * Sits above the cookie banner's bottom edge on small screens so the two never
 * overlap, and is excluded from print.
 */
export function FloatingCta() {
  const [visible, setVisible] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="floating-cta"
          data-motion=""
          data-print-hide=""
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.35, ease: [0.25, 1, 0.5, 1] }
          }
          className="fixed right-4 bottom-4 z-40 md:right-6 md:bottom-6"
        >
          <Link
            href="/contact#book"
            data-analytics="calendly_open"
            // `scale-*` compiles to the standalone CSS `scale` property in
            // Tailwind v4, not `transform` — the transition list has to name
            // it directly or the hover scale snaps instead of easing in.
            className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-ink px-5 py-3 font-medium text-on-ink shadow-[0_10px_30px_-8px_rgba(15,15,16,0.35)] transition-[scale,background-color,box-shadow] duration-300 hover:scale-[1.03] hover:bg-black hover:shadow-[0_16px_40px_-10px_rgba(15,15,16,0.5)]"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="size-[18px]"
            >
              <rect
                x="2.75"
                y="4.25"
                width="14.5"
                height="13"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M2.75 8.25h14.5M6.75 2.75v3M13.25 2.75v3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            Book Appointment
          </Link>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
