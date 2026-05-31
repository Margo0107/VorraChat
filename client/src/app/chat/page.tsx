"use client";
import { useEffect, useState } from "react";
import { socket } from "../../socket";
import { useChat } from "../components/hooks/useChat";
import MessageInput from "../components/UI/MessageInput";
import UserMessage from "../components/UI/UserMessage";
import { useGetUsers } from "../components/hooks/useGetUsers";

type MessageType = {
  text: string;
  time: string;
  senderId: string;
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
    console.log("join room: ", roomId);
  }, [currentChat, me]);

  useEffect(() => {
    socket.on("receive_message", (data: MessageType) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

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
                  time={mess.time}
                  senderId={mess.senderId}
                  myId={me?._id}
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
