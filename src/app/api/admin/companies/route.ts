import { authenticate } from "@/lib/admin/auth";
import { Company } from "@/lib/admin/models/Company";
import { errorJson, handleError, json } from "@/lib/admin/response";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const auth = await authenticate(request);
    if (!auth.ok) return errorJson(auth.message, auth.status);

    const { companyName, website, linkedinUrl } = (await request.json()) as {
      companyName?: string;
      website?: string;
      linkedinUrl?: string;
    };

    if (!companyName?.trim()) {
      return errorJson("Company name is required.", 400);
    }
    if (!linkedinUrl?.trim()) {
      return errorJson("Company LinkedIn URL is required.", 400);
    }

    // Uniqueness is enforced by two indexes on the Company model:
    //   1. linkedinUrl (unique)      — the canonical dedup key
    //   2. companyName (case-insensitive unique) — safety net for the same
    //      company entered with a different URL format
    // Any collision surfaces as a Mongo duplicate-key error (code 11000),
    // which handleError translates into a 409 with a clear per-field message.
    const company = await Company.create({
      companyName: companyName.trim(),
      website: website?.trim() || "",
      linkedinUrl: linkedinUrl.trim(),
      createdBy: auth.user._id,
    });
    return json(company, 201);
  } catch (error) {
    return handleError(error);
  }
}
