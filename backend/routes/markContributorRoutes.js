import express from "express";
import { markContributorForCourse, markAssignmentComplete } from "../controllers/markContributor.js";

const router = express.Router();

// Route to mark a user as a contributor for a specific course
router.put("/:userId/mark-contributor/:courseId", markContributorForCourse);

// Marking assignment as complete route
router.put("/mark-complete/:userId/:assignmentId", markAssignmentComplete);

export default router;