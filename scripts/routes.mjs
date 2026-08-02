/**
 * Single list of public routes, shared by every test script
 * (validate-html.mjs, e2e.mjs, hydration-check.mjs).
 *
 * Previously each script hardcoded its own copy — three lists to keep in sync
 * by hand, which is exactly the kind of duplication that silently drifts the
 * next time a route is added. Import from here instead of adding a fourth.
 */
import { services } from "../src/data/services.ts";

export const SERVICE_SLUGS = services.map((service) => service.slug);

export const ROUTES = [
  "/",
  "/how-it-works",
  "/services",
  ...SERVICE_SLUGS.map((slug) => `/services/${slug}`),
  "/expertise",
  "/for-engineers",
  "/about",
  "/contact",
  "/case-studies",
  "/privacy-policy",
  "/terms-of-service",
];
