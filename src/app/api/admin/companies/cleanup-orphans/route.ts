import { authenticate, requireAdmin } from "@/lib/admin/auth";
import { cleanupOrphanCompanies } from "@/lib/admin/utils/companyCleanup";
import { errorJson, handleError, json } from "@/lib/admin/response";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const auth = await authenticate(request);
    if (!auth.ok) return errorJson(auth.message, auth.status);
    const roleCheck = requireAdmin(auth.user);
    if (!roleCheck.ok) return errorJson(roleCheck.message, roleCheck.status);

    const removed = await cleanupOrphanCompanies();
    return json({
      message: `Cleaned up ${removed} orphaned companies from database.`,
      removed,
    });
  } catch (error) {
    return handleError(error);
  }
}
