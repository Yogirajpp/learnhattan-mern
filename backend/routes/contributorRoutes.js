import express from "express";
const router = express.Router();
import { markContributorForCourse, markAssignmentComplete } from "../controllers/contributor.js";

// Route to mark a user as a contributor for a specific course
router.put("/:userId/mark-contributor/:courseId", markContributorForCourse);

// Marking assignment as complete route
router.put("/mark-complete/:userId/:assignmentId", markAssignmentComplete);

export default router;