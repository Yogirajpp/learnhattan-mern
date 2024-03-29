// courseRoutes

import express from "express";
const router = express.Router();
import { addCourse,getCourseById } from "../controllers/course.js";

// Add a new course route
router.post("/add", addCourse);

// Get course details by courseId route
router.get("/:courseId", getCourseById);

export default router;
