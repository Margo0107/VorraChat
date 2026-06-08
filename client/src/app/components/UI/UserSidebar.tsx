"use client";

import { RxHamburgerMenu } from "react-icons/rx";

import UserInfo from "./UserInfo";
import React, { useEffect, useState } from "react";
import { useGetUsers } from "../hooks/useGetUsers";
import useChatsApi from "../hooks/useChatsApi";
import UserList from "./UserList";

type UserType = {
  _id: string;
  userName: string;
};
type ChatType = {
  _id: string;
  members: UserType[];
  createdAt: string;
  updatedAt: string;
};

type UserSidebarProps = {
  currentChat: UserType | null;
  setCurrentChat: React.Dispatch<React.SetStateAction<UserType | null>>;
  isOnline: boolean;
};

export default function UserSidebar({
  currentChat,
  setCurrentChat,
  isOnline
}: UserSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarColor, setAvatarColor] = useState("#6bd4a3");

  const [searchUsers, setSearchUsers] = useState<UserType[]>([]);
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState<ChatType[]>([]);
  const [me, setMe] = useState<UserType | null>(null);

  const showProfile = () => {
    setIsOpen(!isOpen);
  };

  const { getSearchUser, getUser } = useGetUsers();
  const { createChat, getChats } = useChatsApi();

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

  useEffect(() => {
    const loadChats = async () => {
      const chats = await getChats();

      if (!chats) {
        return;
      }
      setChats(chats);

      console.log(chats);
    };
    loadChats();
  }, []);
  useEffect(() => {
    const loadMe = async () => {
      const data = await getUser();

      if (!data) {
        return;
      }
      setMe(data);
    };
    loadMe();
  }, []);

  const openChat = async (user: UserType) => {
    const chat = await createChat(user);

    if (!chat) {
      return;
    }
    console.log("created chat:", chat);
    setCurrentChat(user);
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
                onClick={() => openChat(user)}
              />
            ))
          : chats.map((chat) => {
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
                  isOnline={isOnline}
                  onClick={() => setCurrentChat(user)}
                />
              );
            })}

        {isOpen && (
          <UserInfo
            avatarColor={avatarColor}
            setAvatarColor={setAvatarColor}
            currentChat={currentChat}
          />
        )}
      </section>
    </aside>
  );
}
