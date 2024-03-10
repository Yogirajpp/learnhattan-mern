// models/Achievement.js
const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  // Add other achievement fields as needed
});

module.exports = mongoose.model("Achievement", achievementSchema);
