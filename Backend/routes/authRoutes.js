import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {authMiddleware} from '../middleware/auth.js'


const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Auth route is working!");
});

router.get("/admin-data", authMiddleware, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied" });
  }
  res.json({ message: "Welcome Admin!" });
});

router.get("/student-data", authMiddleware, async(req, res) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ message: "Access Denied" });
  }
  res.json({ message: "Welcome Student!" });
});

  
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { username: user.username, email: user.email, role: user.role } 
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});







router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: "student"
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: newUser });

  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});



export default router;
