import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    CGPAReq: { type: Number, default: 0 },
    website: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to Admin
  },
  { timestamps: true }
);

export default mongoose.model("Company", CompanySchema);
