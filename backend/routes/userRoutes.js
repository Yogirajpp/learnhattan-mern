// userRoutes.js

import express from "express";
import User from "../models/user.js";
import Course from "../models/course.js"; // Assuming you have a Course model
const router = express.Router();

// Enroll in a course route
router.post("/enroll/", async (req, res) => {
  try {
    const username = req.body.username;
    const courseId = req.body.courseId;

    // Find the user by their username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the user is already enrolled in the course
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: "User is already enrolled in this course" });
    }

    // Add the course to the user's enrolled courses
    user.enrolledCourses.push(courseId);
    await user.save();

    res.status(200).json({ message: "Successfully enrolled in the course", user });
  } catch (error) {
    console.error("Error enrolling in course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
