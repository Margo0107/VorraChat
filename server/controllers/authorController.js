const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerAuthor = async (req, res) => {
  try {
    const { userName, userEmail, userPassword } = req.body;

    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const newUser = new User({
      userName,
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
      user: { _id: newUser._id, userName: newUser.userName },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.loginAuthor = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    const user = await User.findOne({ userEmail });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const checkPass = await bcrypt.compare(userPassword, user.userPassword);

    if (!checkPass) {
      return res.status(400).json({ message: "wrong password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });
    res.status(200).json({
      message: "login successful",
      user: { id: user._id, userName: user.userName },
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
