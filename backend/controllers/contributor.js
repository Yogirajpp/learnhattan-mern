import User from "../models/user.js";
import Contributor from "../models/contributor.js";
import Assignment from "../models/assignment.js";
import mongoose from "mongoose";

// mark a user as a contributor for a specific course
const markContributorForCourse = async (req, res) => {
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

    res.status(200).json({ message: "User marked as contributor for the course", 
    contributor:user.contributor });
  } catch (error) {
    console.error("Error marking user as contributor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Marking assignment as complete
const markAssignmentComplete = async (req, res) => {
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
};

// const rejectAssignment = async (req, res) => {
//   try {
//     const { userId, assignmentId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
//       return res.status(400).json({ success: false, message: "Invalid assignment ID" });
//     }

//     // Update assignment's submission status to "rejected"
//     await Assignment.findByIdAndUpdate(assignmentId, { submissionStatus: "" });

//     res.status(200).json({ success: true, message: "Assignment rejected successfully" });
//   } catch (error) {
//     console.error("Error rejecting assignment:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };


export { markContributorForCourse, markAssignmentComplete };