import { NextResponse } from "next/server";

import { emailEnabled, env } from "@/lib/env";
import { renderEmailShell, renderRows, sendEmail } from "@/lib/email";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { clientEnquirySchema } from "@/lib/schemas";

/** Never prerender or cache a form endpoint. */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Reject oversized bodies before parsing them. */
const MAX_BODY_BYTES = 32 * 1024;
/** A human cannot complete this form in under three seconds. */
const MIN_ELAPSED_MS = 3_000;

const GENERIC_ERROR =
  "We couldn't send that. Please try again, or email hello@swifthire.com.";

export async function POST(request: Request) {
  /* 1. Rate limit before doing any work. */
  const limit = rateLimit(clientKey(request.headers, "contact"), {
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });

  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many enquiries from this network. Try again shortly." },
      {
        status: 429,
        headers: {
          "retry-after": String(limit.retryAfterSeconds),
          "x-ratelimit-limit": String(limit.limit),
          "x-ratelimit-remaining": "0",
        },
      },
    );
  }

  /* 2. Content type and size. */
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 415 });
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "That message is too long." }, { status: 413 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "That message is too long." }, { status: 413 });
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
  }

  /* 3. Validate with the same schema the browser used. */
  const parsed = clientEnquirySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Some fields need attention.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  /* 4. Spam traps. Both return 200 so a bot cannot tell it was caught. */
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }
  if (typeof data.elapsedMs === "number" && data.elapsedMs < MIN_ELAPSED_MS) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  /* 5. Deliver. */
  const html = renderEmailShell(
    "New client enquiry",
    renderRows([
      ["Company", data.companyName],
      ["Contact", data.name],
      ["Email", data.email],
      ["Roles", data.roles],
      ["Team size", data.teamSize],
      ["Urgency", data.urgency],
      ["Source", data.referral ?? ""],
      ["Message", data.message ?? ""],
    ]),
  );

  if (!emailEnabled) {
    // No mail provider configured: accept the submission but be explicit in the
    // logs that nothing was delivered, rather than silently dropping it.
    console.warn(
      "[contact] Email delivery is disabled (RESEND_API_KEY unset). Enquiry received from %s at %s.",
      data.email,
      new Date().toISOString(),
    );
    return NextResponse.json({ ok: true, delivered: false }, { status: 200 });
  }

  const result = await sendEmail({
    to: env.EMAIL_TO_SALES!,
    subject: `New enquiry — ${data.companyName} (${data.urgency})`,
    replyTo: data.email,
    html,
  });

  if (!result.delivered) {
    // Log the failure server-side; never leak provider details to the client.
    console.error("[contact] Delivery failed:", result);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

/** Anything other than POST is not a thing this endpoint does. */
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
