import Chat from "../models/Chat.js";

import { Request, Response } from "express";

interface AuthBody extends Request {
  userId?: string;
}

export const createChat = async (req: AuthBody, res: Response) => {
  try {
    const myId = req.userId;
    const { partnerId } = req.body;

    if (!partnerId) {
      return res.status(400).json({ message: "Parent ID is required" });
    }

    if (partnerId === myId) {
      return res
        .status(400)
        .json({ message: "Cannot create chat with yourself" });
    }

    const existingChat = await Chat.findOne({
      members: { $all: [myId, partnerId] },
    }).populate("members", "userName");
    if (existingChat) {
      return res.status(200).json(existingChat);
    }
    const newChat = await Chat.create({ members: [myId, partnerId] });

    const populatedChat = await newChat.populate("members", "userName");

    res.status(201).json(populatedChat);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyChats = async (req: AuthBody, res: Response) => {
  try {
    const myId = req.userId;
    const chats = await Chat.find({
      members: myId,
    })
      .populate("members", "userName")
      .populate("lastMessage", "text createdAt sender")
      .sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
