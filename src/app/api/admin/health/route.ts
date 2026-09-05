import { json } from "@/lib/admin/response";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  return json({
    status: "ok",
    app: "Staffing Vero API",
    timestamp: new Date().toISOString(),
  });
}
