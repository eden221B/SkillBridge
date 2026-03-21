const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  skills: {
    type: [String],
    default: []
  },

  role: {
    type: String,
    enum: ["volunteer", "organization"],
    default: "volunteer"
  },

  points: {
    type: Number,
    default: 0
  },

  badges: {
    type: [String],
    default: []
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);