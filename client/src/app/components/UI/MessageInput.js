"use client";
import { socket } from "@/socket";
import { useState } from "react";
import { IoSend } from "react-icons/io5";

export default function MessageInput({ setMessages, currentChat, myId }) {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim() === "") return;

    const roomId = [myId, currentChat._id].sort().join("-");

    const newMessage = {
      text: message,
      time: new Date().toLocaleTimeString(),
      senderId: myId,
      roomId,
    };
    socket.emit("send_message", newMessage);

    setMessages((prev) => [...prev, newMessage]);

    setMessage("");
  };

  return (
    <section className="flex flex-col justify-end gap-6">
      <div className="flex w-full items-center gap-3 rounded-2xl">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
