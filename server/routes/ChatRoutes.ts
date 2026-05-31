import { Router } from "express";
const router = Router();

import authorWiddleware from "../middleware/authorMiddleware.js";

import { createChat, getMyChats } from "../controllers/chatController.js";

router.post("/", authorWiddleware, createChat);
router.get("/", authorWiddleware, getMyChats);

export default router;
