const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerAuthor = async (req, res) => {
  try {
    const { username, userEmail, userPassword } = req.body;

    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const newUser = new User({
      username,
      userEmail,
      userPassword: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });
    res.status(201).json({
      message: "User created successfully",
      user: { _id: newUser._id, username: newUser.username },
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.loginAuthor = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
