// Import necessary modules
import express from "express";
import User from "../models/user.js"; // Assuming the model file is named user.js
import Contributor from "../models/contributor.js";
import Course from "../models/course.js";
// import Submission from "../models/submission.js";
import Assignment from "../models/assignment.js";

import mongoose from "mongoose";

// Create a router instance
const router = express.Router();

// Route to mark a user as a contributor for a specific course
router.put("/:userId/mark-contributor/:courseId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const courseId = req.params.courseId;
  
      // Find the user by their ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update the user's contributor status
      user.contributor = true; // Set the contributor field to true
      await user.save();
  
      // Add the user to the Contributor model for the specific course
      if (user.contributor) {
        await Contributor.create({ userId: user._id, courseId });
      }
  
      res.status(200).json({ message: "User marked as contributor for the course", user });
    } catch (error) {
      console.error("Error marking user as contributor:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Marking assignment as complete route
  router.put("/mark-complete/:userId/:assignmentId", async (req, res) => {
    try {
      const { userId, assignmentId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
        return res.status(400).json({ success: false, message: "Invalid assignment ID" });
      }
  
      // Update assignment's submission status
      await Assignment.findByIdAndUpdate(assignmentId, { submissionStatus: "completed" });
  
      // Update user's completedAssignments and remove assignment from submittedAssignments
      await User.findByIdAndUpdate(userId, {
        $addToSet: { completedAssignments: assignmentId },
        $pull: { submittedAssignments: assignmentId }
      });
  
      res.status(200).json({ success: true, message: "Assignment marked as complete" });
    } catch (error) {
      console.error("Error marking assignment as complete:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
});


  

// Export the router
export default router;
