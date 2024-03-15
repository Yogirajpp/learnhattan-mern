import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  description: { type: String },
  interests: [{ type: String }],
  photo: { type: String },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  completedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Achievement" }],
  points: { type: Number, default: 0 },
  videoProgress: [
    {
      courseId: mongoose.Schema.Types.ObjectId,
      videoId: mongoose.Schema.Types.ObjectId,
      completed: { type: Boolean, default: false },
    },
  ],
  assignmentProgress: [
    {
      courseId: mongoose.Schema.Types.ObjectId,
      assignmentId: mongoose.Schema.Types.ObjectId,
      completed: { type: Boolean, default: false },
    },
  ]
});

const User = mongoose.model("User", userSchema);

export default User;
