import { authenticate, requireAdmin } from "@/lib/admin/auth";
import { Person } from "@/lib/admin/models/Person";
import { normalizeLinkedInUrl } from "@/lib/admin/utils/normalizeLinkedInUrl";
import { deleteCompanyIfNoPeople } from "@/lib/admin/utils/companyCleanup";
import { errorJson, handleError, json } from "@/lib/admin/response";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Ctx) {
  try {
    const auth = await authenticate(request);
    if (!auth.ok) return errorJson(auth.message, auth.status);
    const roleCheck = requireAdmin(auth.user);
    if (!roleCheck.ok) return errorJson(roleCheck.message, roleCheck.status);

    const { id } = await params;
    const { name, email1, email2, email3, linkedinUrl } =
      (await request.json()) as {
        name?: string;
        email1?: string;
        email2?: string;
        email3?: string;
        linkedinUrl?: string;
      };

    const person = await Person.findById(id);
    if (!person) return errorJson("Person not found.", 404);

    if (name !== undefined) person.name = name.trim();
    if (email1 !== undefined) person.email1 = email1.trim().toLowerCase();
    if (email2 !== undefined) person.email2 = email2.trim().toLowerCase();
    if (email3 !== undefined) person.email3 = email3.trim().toLowerCase();
    if (linkedinUrl !== undefined) {
      person.linkedinUrl = linkedinUrl?.trim()
        ? normalizeLinkedInUrl(linkedinUrl.trim())
        : null;
    }

    await person.save();
    return json(person);
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
    const person = await Person.findById(id);
    if (!person) return errorJson("Person not found.", 404);

    const companyId = person.companyId;
    await person.deleteOne();

    const companyRemoved = await deleteCompanyIfNoPeople(companyId);

    return json({
      message: companyRemoved
        ? "Person deleted. Company was also removed because no people were left."
        : "Person deleted.",
      companyRemoved,
    });
  } catch (error) {
    return handleError(error);
  }
}
