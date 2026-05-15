const express = require("express");
const router = express.Router();

const authorMiddleware = require("../middleware/authorMiddleware");
const { getUser } = require("../controllers/UserController");

const { getSearchUser } = require("../controllers/UserController");

router.get("/", getUser);
router.get("/search", authorMiddleware, getSearchUser);

module.exports = router;
