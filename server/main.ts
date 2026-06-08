import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authorRoutes from "./routes/authorRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/ChatRoutes.js";
import messageRoutes from "./routes/MessageRoutes.js";

import UserMessage from "./models/UserMessage.js";

import http from "http";

import { Server } from "socket.io";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

connectDB();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/author", authorRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

const onlineUsers = new Map<string, string>();

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("user_online", (userId: string) => {
    onlineUsers.set(userId, socket.id);

    io.emit("online_users", Array.from(onlineUsers.keys()));
  });

  socket.on("join_room", (roomId: string) => {
    socket.join(roomId);
    console.log("joined room: ", roomId);
  });

  type MessageData = {
    text: string;
    sender: string;
    receiver: string;
    roomId: string;
  };

  socket.on("send_message", async (data: MessageData) => {
    try {
      const newMessage = await UserMessage.create({
        text: data.text,
        sender: data.sender,
        receiver: data.receiver,
        roomId: data.roomId,
      });

      socket.to(data.roomId).emit("receive_message", newMessage);
    } catch (err) {
      console.error("Error saving message: ", err);
    }
  });

  socket.on("disconnect", () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    io.emit("online_users", Array.from(onlineUsers.keys()));
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT;

server.listen(PORT || 5000, () => {
  console.log(`Server is running on port ${PORT || 5000}`);
});
