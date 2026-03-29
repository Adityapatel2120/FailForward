const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "failforward_secret";

// Auth middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

// Reminder Schema
const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: String,
  date: String,
  tag: {
    type: String,
    enum: ["Exam", "Internship", "Hackathon", "Project", "Interview", "Other"],
    default: "Other"
  },
  status: {
    type: String,
    enum: ["pending", "completed", "missed"],
    default: "pending",
  },
  reason: { type: String, default: "" }
});

const Reminder = mongoose.model("Reminder", reminderSchema);

// GET ALL REMINDERS (only for logged in user)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.userId });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reminders" });
  }
});

// ADD REMINDER
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, date, tag } = req.body;
    const reminder = new Reminder({ userId: req.userId, title, date, tag: tag || "Other" });
    const saved = await reminder.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to add reminder" });
  }
});

// UPDATE STATUS + REASON + TAG
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { status, reason, tag } = req.body;
    const updated = await Reminder.findByIdAndUpdate(
      req.params.id,
      { status, reason, ...(tag && { tag }) },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
});

// DELETE REMINDER
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Reminder.findByIdAndDelete(req.params.id);
    res.json({ message: "Reminder deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;