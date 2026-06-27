"use client";

import { useEffect, useState } from "react";
import { ChatProvider } from "../hooks/useChat";
import UserHeader from "./UserHeader";
import UserSidebar from "./UserSidebar";
import { socket } from "@/socket";
import { useGetUsers } from "../hooks/useGetUsers";
import useChatsApi from "../hooks/useChatsApi";
import { CurrentChatType } from "../hooks/useChat";

type ChatShellProps = {
  children: React.ReactNode;
};
type UserType = {
  _id: string;
  userName: string;
  email?: string;
};

type MessageType = {
  _id?: string;
  text: string;
  createdAt?: string;
  sender: string;
  receiver: string;
  roomId: string;
  status?: "delivered" | "read";
};

type ChatType = {
  _id: string;
  members: UserType[];
  createdAt: string;
  updatedAt: string;
  lastMessage?: MessageType;
};

export default function ChatShell({ children }: ChatShellProps) {
  const [currentChat, setCurrentChat] = useState<CurrentChatType | null>(null);

  const [me, setMe] = useState<UserType | null>(null);
  const [chats, setChats] = useState<ChatType[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const { getUser } = useGetUsers();
  const { getChats } = useChatsApi();

  useEffect(() => {
    const loadMe = async () => {
      const data = await getUser();
      setMe(data || null);
    };
    loadMe();
  }, []);

  useEffect(() => {
    if (!me?._id) return;
    socket.emit("user_online", me._id);
  }, [me]);

  useEffect(() => {
    socket.on("online_users", (users: string[]) => {
      setOnlineUsers(users);
    });
    return () => {
      socket.off("online_users");
    };
  }, []);

  useEffect(() => {
    const loadChats = async () => {
      const data = await getChats();

      if (!data) {
        return;
      }

      setChats(data);
    };

    loadChats();
  }, []);

  useEffect(() => {
    chats.forEach((chat) => {
      socket.emit("join_room", chat._id);
    });
  }, [chats]);

  useEffect(() => {
    const handleChatUpdated = ({
      chatId,
      lastMessage,
    }: {
      chatId: string;
      lastMessage: MessageType;
    }) => {
      setChats((prevChats) =>
        prevChats
          .map((chat) =>
            chat._id === chatId
              ? {
                ...chat,
                lastMessage,
                updatedAt: lastMessage.createdAt || chat.updatedAt,
              }
              : chat,
          )
          .sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
          ),
      );
    };

    socket.on("chat_updated", handleChatUpdated);

    return () => {
      socket.off("chat_updated", handleChatUpdated);
    };
  }, []);

  const isCurrentChatOnline = currentChat
    ? onlineUsers.includes(currentChat.user._id)
    : false;

  return (
    <ChatProvider value={{ currentChat, setCurrentChat }}>
      <div className="flex h-dvh bg-[url(/vorra-bg.png)] bg-cover bg-fixed bg-center">
        <UserSidebar
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
          chats={chats}
          setChats={setChats}
          me={me}
          onlineUsers={onlineUsers}
        />
        <div className="flex min-h-0 flex-1 flex-col">
          {currentChat && (
            <UserHeader
              currentChat={currentChat}
              isOnline={isCurrentChatOnline}
            />
          )}

          <main className="flex min-h-0 flex-1 justify-center pb-5">
            <div className="min-h-0 w-2/4">{children}</div>
          </main>
        </div>
      </div>
    </ChatProvider>
  );
}
