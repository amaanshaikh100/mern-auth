const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.status(201).json({
      status: "success",
      message: "User created",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: "Err",
    });
  }
};

const dashboard = async (req, res) => {
  const id = req.userId;
  const user = await User.findById(id);

  try {
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: "Err",
    });
  }
};

router.route("/signup").post(signup);
router.route("/dashboard").get(authMiddleware, dashboard);

module.exports = router;
