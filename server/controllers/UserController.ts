import { Request, Response } from "express";
import User from "../models/User.js";

interface AuthorResponce extends Request {
  userId?: string;
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("userName userEmail");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

export const getMe = async (req: AuthorResponce, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("userName userEmail");

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

export const getSearchUser = async (req: AuthorResponce, res: Response) => {
  try {
    const query = req.query.q;
    if (!query || typeof query !== "string") {
      return res.json([]);
    }
    const queryUser = await User.find({
      _id: { $ne: req.userId },
      userName: { $regex: query, $options: "i" },
    }).select("userName userEmail");

    res.status(200).json(queryUser);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};
