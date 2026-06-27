"use client";
import { useEffect, useState } from "react";
import { socket } from "../../socket";
import { useChat } from "../components/hooks/useChat";
import MessageInput from "../components/UI/MessageInput";
import UserMessage from "../components/UI/UserMessage";
import { useGetUsers } from "../components/hooks/useGetUsers";
import { useMessage } from "../components/hooks/useMessage";

type MessageType = {
  _id?: string;
  text: string;
  createdAt?: string;
  sender: string;
  receiver: string;
  roomId: string;
  status?: "delivered" | "read";
};

type UserType = {
  _id: string;
  userName: string;
};

export default function ChatHome() {
  const { currentChat } = useChat();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [me, setMe] = useState<UserType | null>(null);

  const { getUser } = useGetUsers();
  const { getMessages } = useMessage();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && currentChat && me?._id) {
        const roomId = [me._id, currentChat._id].sort().join("-");
        socket.emit("message_read", {
          roomId,
          readerId: me._id,
        });
      }
    };
    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [currentChat, me?._id]);

  useEffect(() => {
    const loadMe = async () => {
      const data = await getUser();
      setMe(data);
    };
    loadMe();
  }, []);

  useEffect(() => {
    if (!currentChat || !me?._id) return;

    const roomId = [me._id, currentChat._id].sort().join("-");

    socket.emit("join_room", roomId);
    const loadMessages = async () => {
      const data = await getMessages(roomId);
      setMessages(data || []);

      socket.emit("message_read", {
        roomId,
        readerId: me._id,
      });
    };
    loadMessages();
  }, [currentChat, me]);

  useEffect(() => {
    const handleMessageRead = (data: { roomId: string; readerId: string }) => {
      setMessages((prev) =>
        prev.map((message) => {
          if (
            message.roomId === data.roomId &&
            message.receiver === data.readerId
          ) {
            return { ...message, status: "read" };
          }
          return message;
        }),
      );
    };

    socket.on("message_read", handleMessageRead);

    return () => {
      socket.off("message_read", handleMessageRead);
    };
  }, []);

  useEffect(() => {
    const handleReceiveMessage = (data: MessageType) => {
      setMessages((prev) => [...prev, data]);
      if (
        me?._id &&
        currentChat?._id === data.sender &&
        data.receiver === me._id &&
        document.visibilityState === "visible"
      ) {
        socket.emit("message_read", {
          roomId: data.roomId,
          readerId: me._id,
        });
      }
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [currentChat?._id, me?._id]);

  return (
    <div className="flex h-full flex-col">
      {currentChat ? (
        <>
          {" "}
          <div className="hide-scrollbar flex-1 overflow-y-auto p-2 py-5">
            <div className="flex flex-col gap-3">
              {messages.map((mess, ind) => (
                <UserMessage
                  key={ind}
                  text={mess.text}
                  time={
                    mess.createdAt
                      ? new Date(mess.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""
                  }
                  sender={mess.sender}
                  myId={me?._id}
                  status={mess.status}
                />
              ))}
            </div>
          </div>
          <div className="shrink-0">
            <MessageInput
              setMessages={setMessages}
              currentChat={currentChat}
              myId={me?._id}
            />
          </div>
        </>
      ) : (
        <div className="flex self-center rounded-lg bg-gray-800 p-2 py-1">
          <p>выберите чат</p>
        </div>
      )}
    </div>
  );
}
