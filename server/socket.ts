import { Server } from "socket.io";

import UserMessage from "./models/UserMessage.js";
import Chat from "./models/Chat.js";

type MessageData = {
  text: string;
  sender: string;
  receiver: string;
  roomId: string;
  status?: "delivered" | "read";
};

const onlineUsers = new Map<string, string>();

export const setupSocket = (io: Server) => {
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
    socket.on("send_message", async (data: MessageData) => {
      try {
        const newMessage = await UserMessage.create({
          text: data.text,
          sender: data.sender,
          receiver: data.receiver,
          roomId: data.roomId,
          status: data.status,
        });

        await Chat.findByIdAndUpdate(data.roomId, {
          lastMessage: newMessage._id,
        });

        io.to(data.roomId).emit("chat_updated", {
          chatId: data.roomId,
          lastMessage: newMessage,
        });
        socket.to(data.roomId).emit("receive_message", newMessage);
      } catch (err) {
        console.error("Error saving message: ", err);
      }
    });

    socket.on(
      "message_read",
      async (data: { roomId: string; readerId: string }) => {
        try {
          await UserMessage.updateMany(
            {
              roomId: data.roomId,
              receiver: data.readerId,
              status: { $ne: "read" },
            },
            { status: "read" },
          );

          io.to(data.roomId).emit("message_read", {
            roomId: data.roomId,
            readerId: data.readerId,
          });
        } catch (err) {
          console.error("Error updating message status: ", err);
        }
      },
    );

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
};
