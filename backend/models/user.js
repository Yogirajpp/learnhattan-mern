// userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add other user fields as needed (e.g., achievements, progress)
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
