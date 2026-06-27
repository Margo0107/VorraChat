import { Router } from "express";
const router = Router();

import authorWiddleware from "../middleware/authorMiddleware.js";

import { getMessage } from "../controllers/messageController.js";

router.get("/:roomId", authorWiddleware, getMessage);
// router.post("/", authorWiddleware, createMessage);

export default router;
