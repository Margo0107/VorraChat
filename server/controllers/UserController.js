const User = require("../models/User");

exports.getUser = async (req, res) => {
  try {
    const users = await User.find().select("userName userEmail");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("userName userEmail");

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

exports.getSearchUser = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query || typeof query !== "string") {
      return res.json([]);
    }
    const queryUser = await User.find({
      _id: { $ne: req.userId },
      userName: { $regex: query, $options: "i" },
    }).select("userName userEmail");

    res.status(200).json(queryUser);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};
