import { connectAdminDB } from "@/lib/admin/db";
import { User } from "@/lib/admin/models/User";
import { handleError, json } from "@/lib/admin/response";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    await connectAdminDB();
    const adminExists = await User.exists({ role: "admin" });
    return json({
      adminExists: Boolean(adminExists),
      canRegisterAsAdmin: !adminExists,
    });
  } catch (error) {
    return handleError(error);
  }
}
