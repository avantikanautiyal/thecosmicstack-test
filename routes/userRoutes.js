const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Admin login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = user.generateToken();

  res.json({
    token,
    user: {
      id: user._id,
      username: user.username,
      role: user.role,
    },
  });
});

module.exports = router;
