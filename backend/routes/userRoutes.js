// routes/UserRoutes.js
import express from "express";
const router = express.Router();
import User from "../mongodb/models/User";


// User registration route
router.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// User login route
router.post("/login", async (req, res) => {
  try {
    // Implement login logic
  } catch (error) {
    res.status(400).send(error);
  }
});

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
