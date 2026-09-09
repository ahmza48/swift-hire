import "server-only";

import { z } from "zod";

/**
 * Server-side environment contract.
 *
 * Everything is optional so the site builds and runs with no secrets at all —
 * in that state the form endpoints validate input and accept submissions but
 * only log them, rather than pretending an email went out. Set the variables in
 * `.env.example` to turn on real delivery.
 */
const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  /**
   * Public origin, used for canonical URLs and the sitemap.
   * `NEXT_PUBLIC_` because `siteConfig` is imported by client components too.
   */
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),

  /** Resend API key. Absent = email delivery disabled. */
  RESEND_API_KEY: z.string().min(1).optional(),
  /** Verified sender, e.g. "Staffing Viro <notifications@swifthire.com>". */
  EMAIL_FROM: z.string().min(3).optional(),
  /** Where client enquiries land. */
  EMAIL_TO_SALES: z.string().email().optional(),
  /** Where engineer profiles land. */
  EMAIL_TO_TALENT: z.string().email().optional(),

  /** Calendly scheduling URL embedded on /contact. */
  NEXT_PUBLIC_CALENDLY_URL: z.string().url().optional(),
  /** GA4 measurement id, e.g. "G-XXXXXXXXXX". Absent = analytics disabled. */
  NEXT_PUBLIC_GA_ID: z
    .string()
    .regex(/^G-[A-Z0-9]{6,}$/, "Expected a GA4 id like G-XXXXXXXXXX")
    .optional(),
});

const parsed = serverEnvSchema.safeParse(process.env);

if (!parsed.success) {
  // Fail loudly at boot rather than at the first request.
  const issues = parsed.error.issues
    .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
    .join("\n");
  throw new Error(`Invalid environment configuration:\n${issues}`);
}

export const env = parsed.data;

/** Email delivery is only wired up when every piece of the chain is present. */
export const emailEnabled = Boolean(
  env.RESEND_API_KEY && env.EMAIL_FROM && env.EMAIL_TO_SALES && env.EMAIL_TO_TALENT,
);
