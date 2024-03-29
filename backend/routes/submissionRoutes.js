import express from "express";
const router = express.Router();
import { submitAssignment } from "../controllers/submission.js";

router.post('/submit/:userId/:courseId/:assignmentId', submitAssignment);

export default router;