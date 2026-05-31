"use client";

import { useState } from "react";
import { ChatProvider } from "../hooks/useChat";
import UserHeader from "./UserHeader";
import UserSidebar from "./UserSidebar";

type ChatShellProps = {
  children: React.ReactNode;
};

type ChatType = {
  _id: string,
  userName: string
}

export default function ChatShell({ children }: ChatShellProps) {
  const [currentChat, setCurrentChat] = useState<ChatType | null >(null);


  return (
    <ChatProvider value={{ currentChat, setCurrentChat }}>
      <div className="flex h-dvh bg-[url(/vorra-bg.png)] bg-cover bg-fixed bg-center">
        <UserSidebar
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
        />
        <div className="flex min-h-0 flex-1 flex-col">
          {currentChat && <UserHeader currentChat={currentChat} />}

          <main className="flex min-h-0 flex-1 justify-center pt-5 pb-5">
            <div className="min-h-0 w-2/4">{children}</div>
          </main>
        </div>
      </div>
    </ChatProvider>
  );
}
