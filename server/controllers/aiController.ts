import { Request, Response } from "express";
import AiMessage from "../models/AiMessage.js";

interface AuthRequest extends Request {
  userId?: string;
}

type AiMessageBody = {
  text?: string;
};

export const sendAiMessage = async (
  req: AuthRequest & { body: AiMessageBody },
  res: Response,
) => {
  try {
    const userId = req.userId;
    const { text } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!text?.trim()) {
      return res.status(400).json({ message: "Text is required" });
    }

    const userMessage = await AiMessage.create({
      user: userId,
      text,
      sender: "user",
    });

    const aiText = `Я учебный ChatGPT. Ты написала: ${text}`;

    const aiMessage = await AiMessage.create({
      user: userId,
      text: aiText,
      sender: "assistant",
    });

    res.status(201).json({
      userMessage,
      aiMessage,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
