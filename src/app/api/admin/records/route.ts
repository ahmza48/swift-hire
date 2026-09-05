import type { PipelineStage } from "mongoose";
import { authenticate } from "@/lib/admin/auth";
import { Person } from "@/lib/admin/models/Person";
import { errorJson, handleError, json } from "@/lib/admin/response";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const auth = await authenticate(request);
    if (!auth.ok) return errorJson(auth.message, auth.status);

    const url = new URL(request.url);
    const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
    const limit = Math.min(
      50,
      Math.max(1, parseInt(url.searchParams.get("limit") || "20", 10)),
    );
    const search = (url.searchParams.get("search") || "").trim();
    const skip = (page - 1) * limit;

    // Base pipeline: hydrate company, job (optional), and creator for every
    // person, then optionally filter by a case-insensitive substring search
    // across every field the UI exposes.
    const pipeline: PipelineStage[] = [
      {
        $lookup: {
          from: "companies",
          localField: "companyId",
          foreignField: "_id",
          as: "company",
        },
      },
      { $unwind: "$company" },
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "_id",
          as: "job",
        },
      },
      {
        $unwind: {
          path: "$job",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "creator",
        },
      },
      { $unwind: "$creator" },
    ];

    if (search) {
      const regex = { $regex: search, $options: "i" };
      pipeline.push({
        $match: {
          $or: [
            { "company.companyName": regex },
            { "company.website": regex },
            { "company.linkedinUrl": regex },
            { "job.jobTitle": regex },
            { "job.jobUrl": regex },
            { name: regex },
            { email1: regex },
            { email2: regex },
            { email3: regex },
            { linkedinUrl: regex },
            { "creator.name": regex },
          ],
        },
      });
    }

    pipeline.push({ $sort: { createdAt: -1 } });

    const countPipeline: PipelineStage[] = [
      ...pipeline,
      { $count: "total" },
    ];
    const dataPipeline: PipelineStage[] = [
      ...pipeline,
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          personId: { $toString: "$_id" },
          companyId: { $toString: "$company._id" },
          jobId: {
            $cond: [
              { $ifNull: ["$job._id", false] },
              { $toString: "$job._id" },
              "",
            ],
          },
          companyName: "$company.companyName",
          companyWebsite: "$company.website",
          companyLinkedIn: "$company.linkedinUrl",
          jobTitle: { $ifNull: ["$job.jobTitle", ""] },
          jobUrl: { $ifNull: ["$job.jobUrl", ""] },
          personName: "$name",
          email: "$email1",
          email1: 1,
          email2: 1,
          email3: 1,
          personLinkedIn: { $ifNull: ["$linkedinUrl", ""] },
          addedBy: "$creator.name",
          dateAdded: "$createdAt",
        },
      },
    ];

    const [countResult, records] = await Promise.all([
      Person.aggregate(countPipeline),
      Person.aggregate(dataPipeline),
    ]);

    const total = countResult[0]?.total || 0;

    return json({
      records,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
