// routes/courseRoutes.js
const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// Course retrieval route
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).send(courses);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Course creation route
router.post("/", async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).send(newCourse);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
