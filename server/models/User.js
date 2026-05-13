const mongose = require("mongoose");

const userSchema = new mongose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
});
module.exports = mongose.model("User", userSchema);
