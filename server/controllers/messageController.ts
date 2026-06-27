import { Request, Response } from "express";
import UserMessage from "../models/UserMessage.js";
import Chat from "../models/Chat.js";

interface AuthorResponse extends Request {
  userId?: string;
}

// export const createMessage = async (req: AuthorResponse, res: Response) => {
//   try {
//     const { text, receiver, roomId } = req.body;
//     const sender = req.userId;

//     if (!text || !receiver || !roomId) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const newMessage = await UserMessage.create({
//       text,
//       sender,
//       receiver,
//       roomId,
//     });

//     await Chat.findByIdAndUpdate(roomId, { lastMessage: newMessage._id });

//     res.status(201).json(newMessage);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const getMessage = async (req: AuthorResponse, res: Response) => {
  try {
    const { roomId } = req.params;

    const messages = await UserMessage.find({ roomId }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
