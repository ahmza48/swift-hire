import mongoose from "mongoose";
import { authenticate } from "@/lib/admin/auth";
import { Person } from "@/lib/admin/models/Person";
import { Company } from "@/lib/admin/models/Company";
import { Job } from "@/lib/admin/models/Job";
import { normalizeLinkedInUrl } from "@/lib/admin/utils/normalizeLinkedInUrl";
import { toObjectId } from "@/lib/admin/utils/companyCleanup";
import { errorJson, handleError, json } from "@/lib/admin/response";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type PersonInput = {
  name?: string;
  email1?: string;
  email2?: string;
  email3?: string;
  linkedinUrl?: string;
};

function preparePersonData(
  person: PersonInput,
  companyId: string,
  jobId: string | undefined,
  userId: mongoose.Types.ObjectId,
) {
  const linkedinUrl = person.linkedinUrl?.trim();
  const companyObjectId = toObjectId(companyId);
  const jobObjectId = jobId ? toObjectId(jobId) : null;

  return {
    companyId: companyObjectId,
    jobId: jobObjectId,
    name: person.name?.trim(),
    email1: person.email1?.trim().toLowerCase(),
    email2: person.email2?.trim().toLowerCase() || "",
    email3: person.email3?.trim().toLowerCase() || "",
    linkedinUrl: linkedinUrl ? normalizeLinkedInUrl(linkedinUrl) : null,
    createdBy: userId,
  };
}

export async function POST(request: Request) {
  try {
    const auth = await authenticate(request);
    if (!auth.ok) return errorJson(auth.message, auth.status);

    const { companyId, jobId, people } = (await request.json()) as {
      companyId?: string;
      jobId?: string;
      people?: PersonInput[];
    };

    if (!companyId) return errorJson("Company is required.", 400);
    if (!Array.isArray(people) || people.length === 0) {
      return errorJson("At least one person is required.", 400);
    }

    const company = await Company.findById(companyId);
    if (!company) return errorJson("Company not found.", 404);

    if (jobId) {
      const job = await Job.findById(jobId);
      if (!job) return errorJson("Job not found.", 404);
    }

    for (const person of people) {
      if (!person.name?.trim()) {
        return errorJson("Person name is required.", 400);
      }
      if (!person.email1?.trim()) {
        return errorJson("Email is required for every person.", 400);
      }
    }

    const docs = people.map((person) =>
      preparePersonData(person, companyId, jobId, auth.user._id),
    );

    const created = await Person.insertMany(docs);
    return json(
      { message: "Information saved successfully.", people: created },
      201,
    );
  } catch (error) {
    return handleError(error);
  }
}
