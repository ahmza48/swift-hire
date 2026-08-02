"use client";

import { useEffect } from "react";

import { ArrowRight, Button, ButtonLink } from "@/components/ui/button";

/**
 * Route-level error boundary. Deliberately shows nothing about the underlying
 * failure — `error.message` can carry internal detail, so only the digest (an
 * opaque id that maps to a server log entry) is surfaced.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="on-ink grain surface-wash-ink flex min-h-[80vh] items-center bg-ink pt-24 text-on-ink">
      <div className="container-page py-20">
        <p className="eyebrow text-jade">
          <span aria-hidden="true" className="h-px w-7 bg-current opacity-70" />
          Something broke
        </p>

        <h1 className="mt-7 max-w-3xl text-[length:var(--text-h1)] leading-[0.98] font-bold tracking-[-0.03em]">
          That didn&apos;t work.
        </h1>

        <p className="mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-on-ink-muted">
          An error stopped this page from rendering. Try again — if it keeps
          happening, email hello@swifthire.com and quote the reference below.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={reset}>
            Try again
            <ArrowRight />
          </Button>
          <ButtonLink href="/" variant="onInk" size="lg">
            Back to home
          </ButtonLink>
        </div>

        {error.digest ? (
          <p className="mt-10 font-mono text-[0.75rem] text-on-ink-muted">
            Reference: {error.digest}
          </p>
        ) : null}
      </div>
    </div>
  );
}
