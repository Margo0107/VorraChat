import { Request, Response } from "express";
import UserMessage from "../models/UserMessage.js";

interface AuthorResponse extends Request {
  userId?: string;
}
export const getMessage = async (req: AuthorResponse, res: Response) => {
  try {
    const { roomId } = req.params;

    const messages = await UserMessage.find({ roomId }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
