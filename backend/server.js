const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const reminderRoutes = require("./routes/reminders");

const app = express();

// Connect to MongoDB
connectDB();

// CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://failforward-frontend.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Parse JSON
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/reminders", reminderRoutes);

app.get("/", (req, res) => res.send("Backend is running 🚀"));
app.get("/test", (req, res) => res.json({ message: "Server working" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));