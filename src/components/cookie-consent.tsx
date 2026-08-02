"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  CONSENT_EVENT,
  readConsent,
  writeConsent,
  type ConsentValue,
} from "@/lib/analytics";

/*
 * Dot notation is required, not stylistic: Next inlines `NEXT_PUBLIC_*` into
 * the client bundle by literal text substitution on `process.env.NAME`. Bracket
 * access is left untouched, so it reads as defined on the server and undefined
 * in the browser — a guaranteed hydration mismatch.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * GDPR cookie banner.
 *
 * No dark patterns: "Reject" and "Accept" are the same size, weight and
 * prominence, and rejecting is a single click with no follow-up nag. Analytics
 * scripts are not injected at all until consent is "accepted", so a visitor who
 * rejects never contacts Google.
 */
export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);

    const onChange = (event: Event) => {
      setConsent((event as CustomEvent<ConsentValue>).detail);
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  const decide = (value: ConsentValue) => {
    writeConsent(value);
    setConsent(value);
  };

  const analyticsOn = ready && consent === "accepted" && Boolean(GA_ID);
  const showBanner = ready && consent === null;

  return (
    <>
      {analyticsOn ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}

      {showBanner ? (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-body"
          data-print-hide=""
          className="on-ink fixed inset-x-0 bottom-0 z-[90] border-t border-ink-line bg-ink text-on-ink shadow-[0_-12px_40px_-16px_rgba(0,0,0,0.7)]"
        >
          <div className="container-page flex flex-col gap-5 py-5 md:flex-row md:items-center md:justify-between md:gap-10 md:py-6">
            <div className="max-w-2xl">
              <h2
                id="cookie-title"
                className="font-mono text-xs font-medium tracking-[0.14em] uppercase text-jade"
              >
                Cookies
              </h2>
              <p
                id="cookie-body"
                className="mt-2 text-[0.9375rem] leading-relaxed text-on-ink-muted"
              >
                We use analytics cookies to understand which pages help
                companies find us. Nothing loads until you choose. Read our{" "}
                <Link
                  href="/privacy-policy"
                  className="rounded-xs text-on-ink underline underline-offset-4 transition-colors hover:text-jade"
                >
                  privacy policy
                </Link>
                .
              </p>
            </div>

            <div className="flex shrink-0 gap-3">
              <Button
                variant="onInk"
                onClick={() => decide("rejected")}
                className="flex-1 md:flex-none"
              >
                Reject
              </Button>
              <Button
                variant="primary"
                onClick={() => decide("accepted")}
                className="flex-1 md:flex-none"
              >
                Accept
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
