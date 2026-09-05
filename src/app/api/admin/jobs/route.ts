import { authenticate } from "@/lib/admin/auth";
import { Job } from "@/lib/admin/models/Job";
import { Company } from "@/lib/admin/models/Company";
import { errorJson, handleError, json } from "@/lib/admin/response";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const auth = await authenticate(request);
    if (!auth.ok) return errorJson(auth.message, auth.status);

    const { companyId, jobTitle, jobUrl } = (await request.json()) as {
      companyId?: string;
      jobTitle?: string;
      jobUrl?: string;
    };

    if (!companyId) return errorJson("Company is required.", 400);
    if (!jobTitle?.trim()) return errorJson("Job title is required.", 400);

    const company = await Company.findById(companyId);
    if (!company) return errorJson("Company not found.", 404);

    const job = await Job.create({
      companyId,
      jobTitle: jobTitle.trim(),
      jobUrl: jobUrl?.trim() || "",
      createdBy: auth.user._id,
    });

    return json(job, 201);
  } catch (error) {
    return handleError(error);
  }
}
