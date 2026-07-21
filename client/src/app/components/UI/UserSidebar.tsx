"use client";

import { RxHamburgerMenu } from "react-icons/rx";

import UserInfo from "./UserInfo";
import React, { useEffect, useState } from "react";
import { useGetUsers } from "../hooks/useGetUsers";
import useChatsApi from "../hooks/useChatsApi";
import UserList from "./UserList";
import { CurrentChatType } from "../hooks/useChat";

type UserType = {
  _id: string;
  userName: string;
};
type ChatType = {
  _id: string;
  members: UserType[];
  createdAt: string;
  updatedAt: string;
  lastMessage?: {
    _id?: string;
    text: string;
    createdAt?: string;
    sender: string;
    receiver: string;
    roomId: string;
    status?: "delivered" | "read";
  };
};

type UserSidebarProps = {
  currentChat: CurrentChatType | null;
  setCurrentChat: React.Dispatch<React.SetStateAction<CurrentChatType | null>>;
  chats: ChatType[];
  setChats: React.Dispatch<React.SetStateAction<ChatType[]>>;
  me: UserType | null;
  onlineUsers: string[];
};

export default function UserSidebar({
  currentChat,
  setCurrentChat,
  chats,
  setChats,
  me,
  onlineUsers,
}: UserSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarColor, setAvatarColor] = useState("#6bd4a3");

  const [searchUsers, setSearchUsers] = useState<UserType[]>([]);
  const [search, setSearch] = useState("");
  const [userName, setUserName] = useState<UserType | null>(null);

  const showProfile = () => {
    setIsOpen(!isOpen);
  };
  const { getUser } = useGetUsers()
  const { getSearchUser } = useGetUsers();
  const { createChat } = useChatsApi();
  const chatGptUser: UserType = {
    _id: "chatgpt",
    userName: "ChatGPT",
  };
  const chatGptMessage = {
    text: "Ask me anything",
    createdAt: new Date().toISOString(),
    sender: "chatgpt",
    receiver: me?._id || "",
    roomId: "chatgpt",
    status: "read" as const,
  };

  useEffect(() => {
    const loadUsers = async () => {
      if (!search.trim()) {
        setSearchUsers([]);
        return;
      }
      const data = await getSearchUser(search);
      setSearchUsers(data || []);
    };
    loadUsers();
  }, [search]);

  const openChat = async (user: UserType) => {
    const chat = await createChat(user);

    if (!chat) {
      return;
    }
    setCurrentChat({ chatId: chat._id, user });
    setSearch("");
    setSearchUsers([]);

    setChats((prevChats) => {
      const isAlreadyAdded = prevChats.some((c) => c._id === chat._id);

      if (isAlreadyAdded) {
        return prevChats;
      }

      return [...prevChats, chat];
    });
  };

  useEffect(() => {
    const loadMe = async () => {
      const data = await getUser()
      setUserName(data)
    }
    loadMe()
  }, [])

  return (
    <aside className="flex w-sm flex-col border-r border-gray-500 bg-gray-800 p-3 py-4">
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          {" "}
          <RxHamburgerMenu
            size={24}
            className="cursor-pointer"
            onClick={showProfile}
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search"
            className="w-full rounded-full bg-gray-700 p-3 py-2 text-lg placeholder:text-slate-300 hover:from-sky-700 focus:outline-none"
          />
        </div>

        {search.trim()
          ? searchUsers.map((user) => (
            <UserList
              key={user._id}
              users={user}
              isOnline={onlineUsers.includes(user._id)}
              onClick={() => openChat(user)}
            />
          ))
          : <>
            <UserList
              key="chatgpt"
              users={chatGptUser}
              avatarText="AI"
              avatarClassName="bg-emerald-500 text-white"
              isOnline={false}
              isActive={currentChat?.chatId === "chatgpt"}
              lastMessage={chatGptMessage}
              onClick={() =>
                setCurrentChat({ chatId: "chatgpt", user: chatGptUser })
              }
            />

            {chats.map((chat) => {
              if (!me) {
                return null;
              }

              const user = chat.members.find((member) => member._id !== me._id);

              if (!user) {
                return null;
              }
              return (
                <UserList
                  key={chat._id}
                  users={user}
                  lastMessage={chat.lastMessage}
                  isOnline={onlineUsers.includes(user._id)}
                  isActive={currentChat?.chatId === chat._id}
                  onClick={() => setCurrentChat({ chatId: chat._id, user })}
                />
              );
            })}
          </>}

        {isOpen && (
          <UserInfo
            userName={userName}
            avatarColor={avatarColor}
            setAvatarColor={setAvatarColor}
          />
        )}

      </section>
    </aside>
  );
}
