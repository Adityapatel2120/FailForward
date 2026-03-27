const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  title: String,
  date: Date,
  tag: {
    type: String,
    enum: ["Exam", "Internship", "Hackathon", "Project", "Interview", "Other"],
    default: "Other"
  },
  reason: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ["pending", "completed", "missed"],
    default: "pending"
  }
});

module.exports = mongoose.model("Reminder", reminderSchema);