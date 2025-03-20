const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");

const router = express.Router();

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const image = req.file;
    console.log(image);
    const newUser = await User.create({
      username,
      email,
      password,
      imageCover: `img/${req.file.filename}`, // Save the image path
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    console.log(image);

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

// Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img"); // Save files in the "public/img" folder
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1]; // Get the file extension
    cb(null, `user-${Date.now()}.${ext}`); // Rename the file
  },
});

const upload = multer({ storage });

// Routes
router.route("/signup").post(upload.single("imageCover"), signup);
router.route("/dashboard").get(authMiddleware, dashboard);

module.exports = router;
