import mongoose, { Schema, type Model } from "mongoose";
import { normalizeLinkedInUrl } from "../utils/normalizeLinkedInUrl";

export interface IPerson {
  _id: mongoose.Types.ObjectId;
  companyId: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId | null;
  name: string;
  email1: string;
  email2?: string;
  email3?: string;
  linkedinUrl: string | null;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const personSchema = new Schema<IPerson>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company is required"],
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      default: null,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email1: {
      type: String,
      required: [true, "Primary email is required"],
      trim: true,
      lowercase: true,
    },
    email2: { type: String, trim: true, lowercase: true },
    email3: { type: String, trim: true, lowercase: true },
    linkedinUrl: { type: String, trim: true, default: null },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

personSchema.pre("save", function normalizeUrl() {
  if (this.linkedinUrl && this.linkedinUrl.trim()) {
    this.linkedinUrl = normalizeLinkedInUrl(this.linkedinUrl);
  } else {
    this.linkedinUrl = null;
  }
});

personSchema.index({ linkedinUrl: 1 }, { unique: true, sparse: true });
personSchema.index({ companyId: 1 });
personSchema.index({ name: 1 });
personSchema.index({ email1: 1 });

export const Person: Model<IPerson> =
  (mongoose.models.Person as Model<IPerson>) ||
  mongoose.model<IPerson>("Person", personSchema);
