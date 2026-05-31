import { Router } from "express";
const router = Router();

import authorMiddleware from "../middleware/authorMiddleware.js";
import { getUser, getSearchUser } from "../controllers/UserController.js";

router.get("/", getUser);
router.get("/search", authorMiddleware, getSearchUser);

export default router;
