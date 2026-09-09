import { NextResponse } from "next/server";

import { emailEnabled, env } from "@/lib/env";
import { renderEmailShell, renderRows, sendEmail } from "@/lib/email";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import {
  CV_ACCEPTED_TYPE,
  CV_MAX_BYTES,
  engineerProfileSchema,
  isPdf,
} from "@/lib/schemas";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_PROFILE_BYTES = 16 * 1024;
const MIN_ELAPSED_MS = 3_000;

const GENERIC_ERROR =
  "We couldn't submit that. Please try again, or email engineers@swifthire.com.";

export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request.headers, "engineers"), {
    limit: 3,
    windowMs: 15 * 60 * 1000,
  });

  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many submissions from this network. Try again shortly." },
      {
        status: 429,
        headers: { "retry-after": String(limit.retryAfterSeconds) },
      },
    );
  }

  if (!request.headers.get("content-type")?.includes("multipart/form-data")) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 415 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
  }

  /* ------------------------------------------------------------- profile */
  const profileRaw = form.get("profile");
  if (typeof profileRaw !== "string" || profileRaw.length > MAX_PROFILE_BYTES) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
  }

  let json: unknown;
  try {
    json = JSON.parse(profileRaw);
  } catch {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
  }

  const parsed = engineerProfileSchema.safeParse(json);
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

  /* Spam traps — silent success so bots learn nothing. */
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }
  if (typeof data.elapsedMs === "number" && data.elapsedMs < MIN_ELAPSED_MS) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  /* ------------------------------------------------------------------ CV */
  const cv = form.get("cv");
  let cvSummary = "Not supplied";

  if (cv instanceof File && cv.size > 0) {
    if (cv.size > CV_MAX_BYTES) {
      return NextResponse.json(
        { error: `Your CV must be under ${CV_MAX_BYTES / 1024 / 1024} MB.` },
        { status: 413 },
      );
    }

    // The browser-supplied MIME type is a hint, not evidence. Read the header
    // bytes and confirm the file really is a PDF before accepting it.
    const header = new Uint8Array(await cv.slice(0, 8).arrayBuffer());
    if (cv.type !== CV_ACCEPTED_TYPE || !isPdf(header)) {
      return NextResponse.json(
        { error: "Please upload a PDF." },
        { status: 415 },
      );
    }

    /*
     * STORAGE NOT WIRED UP.
     *
     * The file is validated and then intentionally dropped. Writing uploads to
     * the app's filesystem is unsafe on serverless and would not survive a
     * redeploy. Before launch, stream `cv` to S3 or Cloudflare R2 with a
     * server-generated key (never the client's filename), server-side
     * encryption, and no public ACL — then put the object key in `cvSummary`.
     */
    cvSummary = `${cv.size} bytes, PDF verified — not stored (object storage pending)`;
  }

  /* -------------------------------------------------------------- deliver */
  const html = renderEmailShell(
    "New engineer profile",
    renderRows([
      ["Name", data.fullName],
      ["Email", data.email],
      ["LinkedIn", data.linkedin],
      ["Portfolio", data.portfolio ?? ""],
      ["Title", data.title],
      ["Experience", `${data.experience} years`],
      ["Stack", data.stack.join(", ")],
      ["Employment", data.employmentType],
      ["Availability", data.availability],
      ["Location", data.location],
      ["Work preference", data.workPreference.join(", ")],
      ["Intro", data.intro ?? ""],
      ["CV", cvSummary],
      ["Consent", "Given at submission"],
    ]),
  );

  if (!emailEnabled) {
    console.warn(
      "[engineers] Email delivery is disabled (RESEND_API_KEY unset). Profile received at %s.",
      new Date().toISOString(),
    );
    return NextResponse.json({ ok: true, delivered: false }, { status: 200 });
  }

  const result = await sendEmail({
    to: env.EMAIL_TO_TALENT!,
    subject: `New profile — ${data.title} (${data.experience} yrs)`,
    replyTo: data.email,
    html,
  });

  if (!result.delivered) {
    console.error("[engineers] Delivery failed:", result);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
  }

  /*
   * Auto-acknowledgement to the candidate. Best-effort: a failure here must not
   * turn a successfully-received profile into an error for the user.
   */
  void sendEmail({
    to: data.email,
    subject: "We've got your profile — Staffing Viro",
    html: renderEmailShell(
      "Profile received",
      `<p style="margin:0 0 16px;color:#14171a;font:400 15px/1.65 ui-sans-serif,system-ui,sans-serif">Thanks for submitting your profile. A recruiter will review it within five business days.</p>
       <p style="margin:0 0 16px;color:#6b6660;font:400 15px/1.65 ui-sans-serif,system-ui,sans-serif">If your skills match a live client role, we'll email you to arrange a short intro call. If not, we keep your profile on file and get in touch when something relevant comes up — you won't hear from us in the meantime.</p>
       <p style="margin:0;color:#6b6660;font:400 14px/1.65 ui-sans-serif,system-ui,sans-serif">To have your data removed at any point, reply to this email.</p>`,
    ),
  }).catch((error: unknown) => {
    console.error("[engineers] Acknowledgement email failed:", error);
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
