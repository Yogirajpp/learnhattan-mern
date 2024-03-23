// Import necessary modules
import express from "express";
import User from "../models/user.js"; // Assuming the model file is named user.js
import Contributor from "../models/contributor.js";

// Create a router instance
const router = express.Router();

// Route to mark a user as a contributor
router.put("/:userId/mark-contributor", async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Find the user by their ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update the user's contributor status
      user.contributor = true; // Set the contributor field to true
      await user.save();
  
      // Add the user to the Contributor model if they are a contributor
      if (user.contributor) {
        await Contributor.create({ userId: user._id });
      }
  
      res.status(200).json({ message: "User marked as contributor", user });
    } catch (error) {
      console.error("Error marking user as contributor:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

// Export the router
export default router;
