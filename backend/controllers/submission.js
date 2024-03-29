import Submission from "../models/submission.js";
import Contributor from "../models/contributor.js";

export const submitAssignment = async (req, res) => {
  try {
    const { userId, courseId, assignmentId } = req.params;
    const { code } = req.body;

    // Find the contributor for the course
    const contributor = await Contributor.findOne({ courseId });

    if (!contributor) {
      return res
        .status(404)
        .json({ message: "No contributor found for the course" });
    }

    // Create a new submission
    const submission = new Submission({
      userId,
      courseId,
      assignmentId,
      code,
      contributorId: contributor.userId, // Assign the submission to the contributor
    });

    // Save the submission
    await submission.save();

    res
      .status(200)
      .json({
        message: "Assignment submitted successfully to the contributor",
      });
  } catch (error) {
    console.error("Error submitting assignment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
