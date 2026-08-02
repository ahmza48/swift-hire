import { z } from "zod";

/**
 * Form contracts shared by the browser and the route handlers.
 *
 * The client uses these for inline validation; the server re-parses the raw
 * payload with the exact same schema, so client-side checks are a UX nicety and
 * never a trust boundary.
 */

/**
 * Anti-spam fields present on every form.
 *
 * Returned from a function rather than shared as one object literal: spreading
 * a single instance into multiple `z.object` calls loses the per-field generics
 * and the inferred field types collapse to `{}`.
 */
const antiSpam = () => ({
  /**
   * Hidden from humans and screen readers. Any value means a bot filled it.
   *
   * Deliberately permissive: if the schema rejected a non-empty value, the
   * response would name this field and tell the bot exactly what tripped it.
   * Validation lets it through and the route handler silently accepts the
   * submission instead, so a caught bot cannot tell it was caught. The length
   * cap only bounds the payload.
   */
  website: z.string().max(200).optional(),
  /** Ms since the form mounted. Humans do not submit in under three seconds. */
  elapsedMs: z.coerce.number().int().nonnegative().optional(),
});

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "tempmail.com",
  "throwawaymail.com",
  "yopmail.com",
  "trashmail.com",
  "sharklasers.com",
  "getnada.com",
  "maildrop.cc",
]);

/**
 * Trim, bound the length, and reject control characters that could poison a log
 * line or an email header.
 *
 * `min` is a parameter rather than something you chain afterwards: `.refine()`
 * returns a `ZodEffects`, which has no `.min()`, so the length bound has to be
 * applied before the refinement.
 */
const safeText = (
  max: number,
  min?: { value: number; message: string },
) => {
  const base = z
    .string()
    .trim()
    .max(max, `Keep this under ${max} characters.`);

  return (min ? base.min(min.value, min.message) : base)
    // Allow tab, newline and carriage return; reject every other control byte.
    .refine((value) => !/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(value), {
      message: "Contains characters we can't accept.",
    });
};

const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Email is required.")
  .max(254, "That email is too long.")
  .email("Enter a valid email address.");

const workEmailField = emailField.refine(
  (value) => {
    const domain = value.split("@")[1];
    return domain ? !DISPOSABLE_DOMAINS.has(domain) : false;
  },
  { message: "Use a work email address we can reply to." },
);

/** Only allow http(s) URLs — `javascript:` and `data:` must never round-trip. */
const httpUrl = (message: string) =>
  z
    .string()
    .trim()
    .max(2048, "That URL is too long.")
    .url(message)
    .refine((value) => /^https?:\/\//i.test(value), { message });

export const TEAM_SIZES = ["1–10", "11–50", "51–200", "200+"] as const;
export const URGENCIES = [
  "Exploring",
  "Within 3 months",
  "Within 1 month",
  "ASAP",
] as const;
export const REFERRAL_SOURCES = [
  "LinkedIn",
  "Referral",
  "Google",
  "Other",
] as const;

export const clientEnquirySchema = z.object({
  companyName: safeText(120, { value: 2, message: "Company name is required." }),
  name: safeText(80, { value: 2, message: "Your name is required." }),
  email: workEmailField,
  roles: safeText(1000, { value: 3, message: "Tell us which roles you're hiring for." }),
  teamSize: z.enum(TEAM_SIZES, {
    errorMap: () => ({ message: "Select a team size." }),
  }),
  urgency: z.enum(URGENCIES, {
    errorMap: () => ({ message: "Select a timeline." }),
  }),
  referral: z.enum(REFERRAL_SOURCES).optional(),
  message: safeText(2000).optional(),
  ...antiSpam(),
});

export type ClientEnquiry = z.infer<typeof clientEnquirySchema>;

export const EXPERIENCE_LEVELS = ["0–2", "3–5", "6–10", "10+"] as const;
export const EMPLOYMENT_TYPES = [
  "Full-time",
  "Contract",
  "Open to both",
] as const;
export const AVAILABILITIES = [
  "Immediately",
  "2 weeks",
  "1 month",
  "3 months",
  "Just exploring",
] as const;
export const WORK_PREFERENCES = [
  "Remote only",
  "Hybrid",
  "On-site",
  "Open to relocation",
] as const;

export const TECH_STACK_OPTIONS = [
  "React",
  "Next.js",
  "Vue",
  "Angular",
  "TypeScript",
  "Node.js",
  "Python",
  "Django",
  "FastAPI",
  "Java",
  "Spring",
  "Go",
  "Rust",
  "Ruby on Rails",
  ".NET",
  "PHP / Laravel",
  "iOS / Swift",
  "Android / Kotlin",
  "React Native",
  "Flutter",
  "AWS",
  "GCP",
  "Azure",
  "Kubernetes",
  "Terraform",
  "PostgreSQL",
  "Spark",
  "Airflow",
  "dbt",
  "TensorFlow",
  "PyTorch",
  "Cypress",
  "Playwright",
  "Security / AppSec",
] as const;

export const engineerProfileSchema = z.object({
  fullName: safeText(80, { value: 2, message: "Your name is required." }),
  email: emailField,
  linkedin: httpUrl("Enter a valid LinkedIn URL, starting with https://"),
  portfolio: z
    .union([httpUrl("Enter a valid URL, starting with https://"), z.literal("")])
    .optional(),
  title: safeText(100, { value: 2, message: "Tell us your current or target title." }),
  experience: z.enum(EXPERIENCE_LEVELS, {
    errorMap: () => ({ message: "Select your years of experience." }),
  }),
  stack: z
    .array(z.enum(TECH_STACK_OPTIONS))
    .min(1, "Pick at least one technology.")
    .max(12, "Pick up to 12 — we want your strongest, not all of them."),
  employmentType: z.enum(EMPLOYMENT_TYPES, {
    errorMap: () => ({ message: "Select an employment preference." }),
  }),
  availability: z.enum(AVAILABILITIES, {
    errorMap: () => ({ message: "Select your availability." }),
  }),
  location: safeText(120, { value: 2, message: "Where are you based?" }),
  workPreference: z
    .array(z.enum(WORK_PREFERENCES))
    .min(1, "Select at least one working preference."),
  intro: safeText(500).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "We need your consent to hold your details." }),
  }),
  ...antiSpam(),
});

export type EngineerProfile = z.infer<typeof engineerProfileSchema>;

/** Upload constraints, enforced on both sides. */
export const CV_MAX_BYTES = 5 * 1024 * 1024;
export const CV_ACCEPTED_TYPE = "application/pdf";

/**
 * Verifies a PDF by its magic bytes rather than the client-supplied MIME type,
 * which is trivially spoofed.
 */
export function isPdf(bytes: Uint8Array): boolean {
  return (
    bytes.length > 4 &&
    bytes[0] === 0x25 && // %
    bytes[1] === 0x50 && // P
    bytes[2] === 0x44 && // D
    bytes[3] === 0x46 && // F
    bytes[4] === 0x2d //  -
  );
}
