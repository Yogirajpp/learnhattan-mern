import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Make sure it's unique
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  description: { type: String },
  interests: [{ type: String }],
  photo: { type: String },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Reference to courses user is enrolled in
  completedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Array to store completed course IDs
  achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Achievement" }] // Add this field for achievements
});

const User = mongoose.model("User", userSchema);

export default User;
