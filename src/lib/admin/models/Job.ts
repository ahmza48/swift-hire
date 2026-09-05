import mongoose, { Schema, type Model } from "mongoose";

export interface IJob {
  _id: mongoose.Types.ObjectId;
  companyId: mongoose.Types.ObjectId;
  jobTitle: string;
  jobUrl?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company is required"],
    },
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    jobUrl: { type: String, trim: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

jobSchema.index({ companyId: 1 });
jobSchema.index({ jobTitle: 1 });

export const Job: Model<IJob> =
  (mongoose.models.Job as Model<IJob>) ||
  mongoose.model<IJob>("Job", jobSchema);
