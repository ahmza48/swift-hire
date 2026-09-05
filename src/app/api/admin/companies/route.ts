import { authenticate } from "@/lib/admin/auth";
import { Company } from "@/lib/admin/models/Company";
import { Person } from "@/lib/admin/models/Person";
import { normalizeLinkedInUrl } from "@/lib/admin/utils/normalizeLinkedInUrl";
import { deleteCompanyCascade } from "@/lib/admin/utils/companyCleanup";
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

    const payload = {
      companyName: companyName.trim(),
      website: website?.trim() || "",
      linkedinUrl: linkedinUrl.trim(),
      createdBy: auth.user._id,
    };

    try {
      const company = await Company.create(payload);
      return json(company, 201);
    } catch (error) {
      const err = error as { code?: number };
      if (err?.code !== 11000) throw error;

      // On dup-key, if the existing company has no people, replace it —
      // matches original controller behaviour exactly.
      const normalizedUrl = normalizeLinkedInUrl(payload.linkedinUrl);
      const existing = await Company.findOne({ linkedinUrl: normalizedUrl });

      if (existing) {
        const peopleCount = await Person.countDocuments({
          companyId: existing._id,
        });

        if (peopleCount === 0) {
          await deleteCompanyCascade(existing._id);
          const company = await Company.create({
            ...payload,
            linkedinUrl: normalizedUrl,
          });
          return json(company, 201);
        }
      }

      throw error;
    }
  } catch (error) {
    return handleError(error);
  }
}
