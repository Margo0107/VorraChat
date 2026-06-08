"use client";

import { useEffect, useState } from "react";
import { ChatProvider } from "../hooks/useChat";
import UserHeader from "./UserHeader";
import UserSidebar from "./UserSidebar";
import { socket } from "@/socket";
import { useGetUsers } from "../hooks/useGetUsers";

type ChatShellProps = {
  children: React.ReactNode;
};
type UserType = {
  _id: string;
  username: string;
  email: string;
};

type ChatType = {
  _id: string;
  userName: string;
};

export default function ChatShell({ children }: ChatShellProps) {
  const [currentChat, setCurrentChat] = useState<ChatType | null>(null);

  const [me, setMe] = useState<UserType | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const { getUser } = useGetUsers();
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

  const isCurrentChatOnline = currentChat
    ? onlineUsers.includes(currentChat._id)
    : false;

  return (
    <ChatProvider value={{ currentChat, setCurrentChat }}>
      <div className="flex h-dvh bg-[url(/vorra-bg.png)] bg-cover bg-fixed bg-center">
        <UserSidebar
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
          isOnline={isCurrentChatOnline}
        />
        <div className="flex min-h-0 flex-1 flex-col">
          {currentChat && (
            <UserHeader
              currentChat={currentChat}
              isOnline={isCurrentChatOnline}
            />
          )}

          <main className="flex min-h-0 flex-1 justify-center pt-5 pb-5">
            <div className="min-h-0 w-2/4">{children}</div>
          </main>
        </div>
      </div>
    </ChatProvider>
  );
}
