// courseController
import Course from "../models/course.js";

// Create a new course document
const addCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      image,
      tutor,
      videos,
      resources,
      assignments,
    } = req.body;

    const newCourse = await Course.create({
      title,
      description,
      category,
      image,
      tutor,
      videos,
      resources,
      assignments,
    });

    res.status(201).json({ success: true, data: newCourse });
  } catch (error) {
    console.error("Error adding new course:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Find the course by courseId
const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ course });
  } catch (error) {
    console.error("Error fetching course details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addCourse, getCourseById };
