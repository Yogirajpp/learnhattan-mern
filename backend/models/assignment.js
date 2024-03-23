import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  submissionStatus: { type: String, enum: ["pending", "submitted", "completed"], default: "pending" }, // Added field
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
