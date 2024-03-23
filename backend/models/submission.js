import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  submittedAt: { type: Date, default: Date.now },
  // Add more fields as needed for your submission model
});

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;