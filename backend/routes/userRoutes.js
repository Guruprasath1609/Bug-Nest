const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// @route POST/api/users/register
// desc Register a new user
// @access Public

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(404).json({ message: "User already exists" });
    user = new User({ name, email, password });
    await user.save();
    const payload = { user: { id: user._id, role: user.role } };

    jwt.sign(
      payload,
      process.env.JWT_TOKEN,
      { expiresIn: "100d" },
      (err, token) => {
        if (err) return err;
        res.status(200).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @router POST/api/users/login
// @desc  Login as a user
// @access Public

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(404).json({ usermessage: "User not registered" });
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(404).json({ passwordmessage: "Password is not matched" });
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_TOKEN,
      { expiresIn: "100d" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          message:"User logged in successfully",
          token
        })
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: " Server Error.Please try later" });
  }
});

module.exports = router;
