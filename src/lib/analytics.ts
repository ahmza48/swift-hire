"use client";

/**
 * Thin GA4 wrapper.
 *
 * Every call is a no-op until the visitor has opted in and gtag has loaded, so
 * components can fire events unconditionally without checking consent first.
 */

export const CONSENT_STORAGE_KEY = "swifthire.consent.v1";
export const CONSENT_EVENT = "swifthire:consent-change";

export type ConsentValue = "accepted" | "rejected";

type GtagArgs =
  | [command: "js", date: Date]
  | [command: "config", targetId: string, config?: Record<string, unknown>]
  | [command: "event", eventName: string, params?: Record<string, unknown>]
  | [command: "consent", mode: "default" | "update", params: Record<string, string>];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

export function readConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === "accepted" || stored === "rejected" ? stored : null;
  } catch {
    // Private-mode Safari and locked-down browsers throw on localStorage.
    return null;
  }
}

export function writeConsent(value: ConsentValue): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    /* Non-fatal: the banner simply reappears next visit. */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

/** Records a GA4 event. Silently ignored when analytics is off. */
export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
