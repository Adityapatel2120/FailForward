const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Reminder Schema
const reminderSchema = new mongoose.Schema({
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
  reason: {
    type: String,
    default: ""
  }
});

const Reminder = mongoose.model("Reminder", reminderSchema);

// GET ALL REMINDERS
router.get("/", async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reminders" });
  }
});

// ADD REMINDER
router.post("/", async (req, res) => {
  try {
    const { title, date, tag } = req.body;
    const reminder = new Reminder({ title, date, tag: tag || "Other" });
    const saved = await reminder.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to add reminder" });
  }
});

// UPDATE STATUS + REASON + TAG
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
  try {
    await Reminder.findByIdAndDelete(req.params.id);
    res.json({ message: "Reminder deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;