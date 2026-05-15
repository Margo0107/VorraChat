const express = require("express");
const router = express.Router();

const authorMiddleware = require("../middleware/authorMiddleware");

const {
  registerAuthor,
  loginAuthor,
} = require("../controllers/authorController");

const { getMe } = require("../controllers/UserController");

router.post("/register", registerAuthor);
router.post("/login", loginAuthor);
router.get("/me", authorMiddleware, getMe);

module.exports = router;
