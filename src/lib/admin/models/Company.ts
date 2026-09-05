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

companySchema.pre("save", function normalizeCompany() {
  if (this.linkedinUrl) {
    this.linkedinUrl = normalizeLinkedInUrl(this.linkedinUrl);
  }
  // Collapse internal whitespace so "Acme  Inc" and "Acme Inc" collide on the
  // case-insensitive unique index below.
  if (this.companyName) {
    this.companyName = this.companyName.trim().replace(/\s+/g, " ");
  }
});

companySchema.index({ linkedinUrl: 1 }, { unique: true });
// Case-insensitive uniqueness on the company name. The strength: 2 collation
// makes "Acme Inc" and "acme inc" collide. Whitespace normalization is done
// in the pre-save hook above so "Acme  Inc" (double space) collides too.
companySchema.index(
  { companyName: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } },
);

export const Company: Model<ICompany> =
  (mongoose.models.Company as Model<ICompany>) ||
  mongoose.model<ICompany>("Company", companySchema);
