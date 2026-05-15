"use client";

import { createContext, useContext } from "react";

const ChatContext = createContext(null);

export function ChatProvider({ value, children }) {
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat must be used inside ChatProvider");
  }

  return context;
}
