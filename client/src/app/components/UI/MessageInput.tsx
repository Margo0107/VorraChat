"use client";
import { socket } from "@/socket";
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";

type UserType = {
  _id: string;
  userName: string;
};

type MessageType = {
  _id?: string;
  text: string;
  createdAt?: string;
  sender: string;
  receiver: string;
  roomId: string;
};

type MessageInputProps = {
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  currentChat: UserType;
  myId: string | undefined;
};

export default function MessageInput({
  setMessages,
  currentChat,
  myId,
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim() === "" || !myId) return;

    const roomId = [myId, currentChat._id].sort().join("-");

    const newMessage = {
      text: message,
      createdAt: new Date().toISOString(),
      sender: myId,
      receiver: currentChat._id,
      roomId,
    };

    socket.emit("send_message", newMessage);

    setMessages((prev) => [...prev, newMessage]);

    setMessage("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <section className="flex flex-col justify-end gap-6">
      <div className="flex w-full items-center gap-3 rounded-2xl">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="message"
          autoFocus
          className="hide-scrollbar h-13 w-full resize-none rounded-xl bg-slate-800 p-8 px-4 py-2 py-3 text-lg placeholder:text-slate-500 focus:outline-none"
        />

        <button
          type="button"
          onClick={sendMessage}
          className="flex h-10 w-11 items-center justify-center rounded-full bg-sky-600 transition hover:bg-sky-500"
        >
          <IoSend size={23} className="ml-1" />
        </button>
      </div>
    </section>
  );
}
