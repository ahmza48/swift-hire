import mongoose, { Schema, type Model } from "mongoose";
import { normalizeLinkedInUrl } from "../utils/normalizeLinkedInUrl";

export interface ICompany {
  _id: mongoose.Types.ObjectId;
  companyName: string;
  website?: string;
  linkedinUrl: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const companySchema = new Schema<ICompany>(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    website: { type: String, trim: true },
    linkedinUrl: {
      type: String,
      required: [true, "Company LinkedIn URL is required"],
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

companySchema.pre("save", function normalizeUrl() {
  if (this.linkedinUrl) {
    this.linkedinUrl = normalizeLinkedInUrl(this.linkedinUrl);
  }
});

companySchema.index({ linkedinUrl: 1 }, { unique: true });
companySchema.index({ companyName: 1 });

export const Company: Model<ICompany> =
  (mongoose.models.Company as Model<ICompany>) ||
  mongoose.model<ICompany>("Company", companySchema);
