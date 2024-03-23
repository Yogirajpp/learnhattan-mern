// assignmentRoutes.js
import express from "express";
import Assignment from "../models/assignment.js";

const router = express.Router();

router.post("/submit", async (req, res) => {
  try {
    const { title, description, userId, courseId } = req.body;

    // Create a new assignment document
    const newAssignment = await Assignment.create({
      title,
      description,
      user: userId,
      course: courseId,
    });

    res.status(201).json({ success: true, data: newAssignment });
  } catch (error) {
    console.error("Error submitting assignment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
