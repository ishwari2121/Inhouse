import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    eligibleBranches: { type: [String], required: true },
    role: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    companyCriteria: { type: String, required: true },
    cgpa: { type: String, required: true },
    website: { type: String },
    stipend: { type: String },
    studentsPlaced: { type: Number },
    companyType: { type: String, enum: ["Internship", "Placement"], required: true }, // ✅ Added this field
    linkedinProfiles: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
      }
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ✅ Reference to User model
  },
  { timestamps: true }
);

export default mongoose.model("Company", CompanySchema);
