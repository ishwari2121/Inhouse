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

router.get("/all", async (req, res) => {
  try {
    const companies = await Company.find();
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

export default router;
