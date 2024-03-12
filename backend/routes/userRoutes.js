// userRoutes.js

import express from "express";
import User from "../models/user.js";
import Course from "../models/course.js"; // Assuming you have a Course model

const router = express.Router();

// Enroll in a course route
router.post("/enroll", async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    // Find the user by their ID
    const user = await User.findById(userId);
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


// Get enrolled courses by user ID route
router.get("/enrolled-courses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by their ID and populate enrolledCourses
    const user = await User.findById(userId).populate("enrolledCourses");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ enrolledCourses: user.enrolledCourses });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Mark a course as completed for a user route
router.post("/:userId/complete-course/:courseId", async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the user is enrolled in the course
    if (!user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: "User is not enrolled in this course" });
    }

    // Check if the course is already marked as completed for the user
    if (user.completedCourses.includes(courseId)) {
      return res.status(400).json({ message: "Course is already completed for this user" });
    }

    // Add the course to the user's completed courses array
    user.completedCourses.push(courseId);
    await user.save();

    res.status(200).json({ message: "Course marked as completed for the user", user });
  } catch (error) {
    console.error("Error marking course as completed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all courses route
router.get("/allcourses", async (req, res) => {
  try {
    // Fetch all courses from the database
    const courses = await Course.find();
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all users route
router.get("/allusers", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
