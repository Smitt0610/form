const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /signup
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Signup failed", details: err.message });
  }
});

// POST /signin
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: "Signin failed", details: err.message });
  }
});

module.exports = router;
