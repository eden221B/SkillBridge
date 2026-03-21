const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const taskRoutes = require("./routes/taskRoutes");
const completionRoutes = require("./routes/completionRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/completions", completionRoutes);

// connect database
connectDB();

app.get("/", (req, res) => {
  res.send("SkillBridge API running");
});

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

const PORT = process.env.PORT || 5009;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});