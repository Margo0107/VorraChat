import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authorRoutes from "./routes/authorRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/ChatRoutes.js";

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

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("join_room", (roomId: string) => {
    socket.join(roomId);
    console.log("joined room: ", roomId);
  });

  socket.on("send_message", (data: { roomId: string }) => {
    socket.to(data.roomId).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT;

server.listen(PORT || 5000, () => {
  console.log(`Server is running on port ${PORT || 5000}`);
});
