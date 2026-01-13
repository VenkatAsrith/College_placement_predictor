const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  cgpa: Number,
  attendance: Number,
  internal: Number,
  external: Number,
  study: Number,
  sleep: Number,
  social: Number,
  stress: Number,
  certifications: Number,
  prediction: String,
  confidence: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Student", StudentSchema);
