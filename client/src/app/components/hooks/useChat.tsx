"use client";

import React, { createContext, useContext } from "react";

type UserType = {
  _id: string;
  userName: string;
};

type ChatContextType = {
  currentChat: UserType | null;
  setCurrentChat: React.Dispatch<React.SetStateAction<UserType | null>>;
};

type ChatProviderProps = {
  value: ChatContextType;
  children: React.ReactNode;
};

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ value, children }: ChatProviderProps) {
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat must be used inside ChatProvider");
  }

  return context;
}
