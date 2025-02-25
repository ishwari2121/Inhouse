import express from "express";
import Company from "../models/Company.js";
import { authMiddleware } from "../middleware/auth.js"; // Middleware for auth

const router = express.Router();

router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { name, description, location, CGPAReq, website } = req.body;

    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const newCompany = new Company({
      name,
      description,
      location,
      CGPAReq,
      website,
      createdBy: req.user.id,
    });

    await newCompany.save();
    res.status(201).json({ message: "Company created successfully", company: newCompany });
  } catch (error) {
    res.status(500).json({ message: "Error creating company", error });
  }
});

router.get("/view", async (req, res) => {
  try {
    const companies = await Company.find().populate("createdBy", "username email"); // Fetch with admin details
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies", error });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    await Company.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Company deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting company", error });
  }
});


router.get("/search", async (req, res) => {
  const { q } = req.query; // Get search query

  if (!q) return res.json([]); // Return empty array if no query provided

  try {
    const companies = await Company.find({
      $or: [
        { name: { $regex: q, $options: "i" } }, // Search by name
        { description: { $regex: q, $options: "i" } }, // Search by description
        { location: { $regex: q, $options: "i" } }, // Search by location
      ],
    }).limit(10); // Limit results to improve performance

    res.json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});



export default router;
