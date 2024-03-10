// models/Course.js
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  teacher: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  videos: [{ title: String, url: String }],
  // Add other course fields as needed
});

module.exports = mongoose.model("Course", courseSchema);
