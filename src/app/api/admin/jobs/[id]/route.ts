import { authenticate, requireAdmin } from "@/lib/admin/auth";
import { Job } from "@/lib/admin/models/Job";
import { errorJson, handleError, json } from "@/lib/admin/response";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Ctx) {
  try {
    const auth = await authenticate(request);
    if (!auth.ok) return errorJson(auth.message, auth.status);

    const { id } = await params;
    const job = await Job.findById(id);
    if (!job) return errorJson("Job not found.", 404);
    return json(job);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: Request, { params }: Ctx) {
  try {
    const auth = await authenticate(request);
    if (!auth.ok) return errorJson(auth.message, auth.status);
    const roleCheck = requireAdmin(auth.user);
    if (!roleCheck.ok) return errorJson(roleCheck.message, roleCheck.status);

    const { id } = await params;
    const { jobTitle, jobUrl } = (await request.json()) as {
      jobTitle?: string;
      jobUrl?: string;
    };
    const job = await Job.findById(id);
    if (!job) return errorJson("Job not found.", 404);

    if (jobTitle !== undefined) job.jobTitle = jobTitle.trim();
    if (jobUrl !== undefined) job.jobUrl = jobUrl.trim();

    await job.save();
    return json(job);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: Request, { params }: Ctx) {
  try {
    const auth = await authenticate(request);
    if (!auth.ok) return errorJson(auth.message, auth.status);
    const roleCheck = requireAdmin(auth.user);
    if (!roleCheck.ok) return errorJson(roleCheck.message, roleCheck.status);

    const { id } = await params;
    const job = await Job.findById(id);
    if (!job) return errorJson("Job not found.", 404);
    await job.deleteOne();
    return json({ message: "Job deleted." });
  } catch (error) {
    return handleError(error);
  }
}
