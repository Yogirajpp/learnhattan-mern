// userRoutes.js
import express from "express";
const router = express.Router();
import User from "../models/user.js";

// User profile route
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send("User not found");
  }
});


export default router;
