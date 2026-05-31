import { Router } from "express";
import authorMiddleware from "../middleware/authorMiddleware.js";
import {
  registerAuthor,
  loginAuthor,
} from "../controllers/authorController.js";

import { getMe } from "../controllers/UserController.js";

const router = Router();

router.post("/register", registerAuthor);
router.post("/login", loginAuthor);
router.get("/me", authorMiddleware, getMe);

export default router;
