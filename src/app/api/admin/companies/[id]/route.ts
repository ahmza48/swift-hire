import mongoose from "mongoose";
import { authenticate, requireAdmin } from "@/lib/admin/auth";
import { Company } from "@/lib/admin/models/Company";
import { deleteCompanyCascade } from "@/lib/admin/utils/companyCleanup";
import { errorJson, handleError, json } from "@/lib/admin/response";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Ctx) {
  try {
    const auth = await authenticate(request);
    if (!auth.ok) return errorJson(auth.message, auth.status);

    const { id } = await params;
    const company = await Company.findById(id);
    if (!company) return errorJson("Company not found.", 404);
    return json(company);
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
    const { companyName, website, linkedinUrl } = (await request.json()) as {
      companyName?: string;
      website?: string;
      linkedinUrl?: string;
    };

    const company = await Company.findById(id);
    if (!company) return errorJson("Company not found.", 404);

    if (companyName !== undefined) company.companyName = companyName.trim();
    if (website !== undefined) company.website = website.trim();
    if (linkedinUrl !== undefined) company.linkedinUrl = linkedinUrl.trim();

    await company.save();
    return json(company);
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorJson("Invalid company ID.", 400);
    }

    const company = await Company.findById(id);
    if (!company) return errorJson("Company not found.", 404);

    const deleted = await deleteCompanyCascade(company._id);
    if (!deleted) {
      return errorJson(
        "Company could not be deleted from database.",
        500,
      );
    }

    return json({
      message: "Company and all related records deleted from database.",
    });
  } catch (error) {
    return handleError(error);
  }
}
