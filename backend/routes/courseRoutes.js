// courseRoutes.js

import express from "express";
import Course from "../models/course.js";
const router = express.Router();

// Add a new course route
router.post("/add", async (req, res) => {
  try {
    const { title, description, category, tutor, videos, resources, assignments } = req.body;

    // Create a new course document
    const newCourse = await Course.create({
      title,
      description, 
      category,
      tutor,
      videos,
      resources,
      assignments
    });

    res.status(201).json({ success: true, data: newCourse });
  } catch (error) {
    console.error("Error adding new course:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
