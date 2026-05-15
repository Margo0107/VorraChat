const mongoose = require("mongoose");

const userMessageSchema = new mongoose.Schema({
  text: String,

  sender: {
    type: mongoose.Schema.Types > ObjectId,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types > ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("UserMessage", userMessageSchema);
