import express from "express";
import QueAndModel from "../models/QueAns.js";  
const router = express.Router();
router.post("/save/:id", async (req, res) => {
    try {
        const { company_id, question, answer, created_by } = req.body;
        console.log("received post request");
        if (!company_id || !question || !answer || !created_by) 
        {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const newQuestion = new QueAndModel({
            company_id,
            question,
            answer,
            created_by
        });
        await newQuestion.save();
        res.status(201).json({ message: "Question saved successfully", data: newQuestion });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get("/view/:company_id", async (req, res) => {
    try {
        const { company_id } = req.params;
        const questions = await QueAndModel.find({ company_id });
        if (!questions.length) {
            return res.status(404).json({ error: "No questions found for this company" });
        }

        res.status(200).json({ success: true, data: questions });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
export default router;
