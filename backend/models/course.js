
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  // Add more fields as needed for your course model
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
