const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  skillsRequired: {
    type: [String],
    required: true
  },

  estimatedTime: {
    type: String
  },

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  status: {
    type: String,
    enum: ["open", "completed"],
    default: "open"
  }

}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);