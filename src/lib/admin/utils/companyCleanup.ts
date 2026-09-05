import mongoose from "mongoose";
import { Company } from "../models/Company";
import { Job } from "../models/Job";
import { Person } from "../models/Person";

export function toObjectId(
  id: string | mongoose.Types.ObjectId | null | undefined,
): mongoose.Types.ObjectId | null {
  if (!id) return null;
  if (id instanceof mongoose.Types.ObjectId) return id;
  if (mongoose.Types.ObjectId.isValid(String(id))) {
    return new mongoose.Types.ObjectId(String(id));
  }
  return null;
}

export async function deleteCompanyCascade(
  companyId: string | mongoose.Types.ObjectId,
): Promise<boolean> {
  const objectId = toObjectId(companyId);
  if (!objectId) return false;

  await Person.deleteMany({ companyId: objectId });
  await Job.deleteMany({ companyId: objectId });
  const result = await Company.deleteOne({ _id: objectId });
  return result.deletedCount > 0;
}

export async function deleteCompanyIfNoPeople(
  companyId: string | mongoose.Types.ObjectId,
): Promise<boolean> {
  const objectId = toObjectId(companyId);
  if (!objectId) return false;

  const remainingPeople = await Person.countDocuments({ companyId: objectId });
  if (remainingPeople > 0) return false;

  await Job.deleteMany({ companyId: objectId });
  const result = await Company.deleteOne({ _id: objectId });
  return result.deletedCount > 0;
}

export async function cleanupOrphanCompanies(): Promise<number> {
  const companies = await Company.find({}).select("_id");
  let removed = 0;

  for (const company of companies) {
    const peopleCount = await Person.countDocuments({
      companyId: company._id,
    });
    if (peopleCount === 0) {
      await Job.deleteMany({ companyId: company._id });
      await Company.deleteOne({ _id: company._id });
      removed += 1;
    }
  }

  return removed;
}
