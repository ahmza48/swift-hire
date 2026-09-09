"use client";

import { useState } from "react";

import { ArrowRight, Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";

// Dot notation is required so Next inlines this into the client bundle —
// see the note in cookie-consent.tsx.
const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? siteConfig.calendly;

/**
 * Click-to-load Calendly.
 *
 * The iframe is not mounted until the visitor asks for it. That keeps a
 * third-party frame off the critical path (it would otherwise be the page's
 * largest contentful paint) and means no data reaches Calendly from someone who
 * only came to read the contact details.
 */
export function CalendlyEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <div className="flex flex-col items-start gap-5 rounded-md border border-on-paper/15 bg-paper-raised p-8 md:p-10">
        <div>
          <h3 className="text-[length:var(--text-h3)] leading-tight font-bold">
            Book a free 30-minute discovery call
          </h3>
          <p className="mt-3 max-w-lg leading-relaxed text-on-paper-muted">
            Pick a slot that suits you. We will ask about the role, the team and
            the timeline, and tell you plainly whether we are the right fit.
          </p>
        </div>

        <Button
          size="lg"
          onClick={() => {
            trackEvent("calendly_open");
            setLoaded(true);
          }}
        >
          Show available times
          <ArrowRight />
        </Button>

        <p className="font-mono text-[0.75rem] leading-relaxed text-on-paper-muted">
          Loads a Calendly scheduling frame. Nothing is sent to Calendly until
          you press this.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-on-paper/15 bg-paper-raised">
      <iframe
        src={CALENDLY_URL}
        title="Book a discovery call with Staffing Viro"
        loading="lazy"
        // The frame is third-party: give it nothing beyond what scheduling needs.
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        referrerPolicy="no-referrer"
        className="h-[44rem] w-full border-0"
      />
    </div>
  );
}
