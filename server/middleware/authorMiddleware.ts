import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthorRequest extends Request {
  userId?: string;
}

interface JwtPayload {
  userId: string;
}

const authorWiddleware = (req: AuthorRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "no token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
export default authorWiddleware;
