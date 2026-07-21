import authorWiddleware from "../middleware/authorMiddleware.js";
import { Router } from "express";
import { sendAiMessage } from "../controllers/aiController.js";

const router = Router();

router.post("/", authorWiddleware, sendAiMessage);

export default router;
