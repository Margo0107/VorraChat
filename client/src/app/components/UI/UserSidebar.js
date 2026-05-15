"use client";

import { RxHamburgerMenu } from "react-icons/rx";

import UserInfo from "./UserInfo";
import { useEffect, useState } from "react";
import { useGetUsers } from "../hooks/useGetUsers";
import UserList from "./UserList";

export default function UserSidebar({ currentChat, setCurrentChat }) {
  const [isOpen, setIsOpen] = useState(false);

  const [avatarColor, setAvatarColor] = useState("#6bd4a3");

  const [searchUsers, setSearchUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState([]);

  const showProfile = () => {
    setIsOpen(!isOpen);
  };

  const { getSearchUser } = useGetUsers();

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

  const openChat = (user) => {
    setCurrentChat(user);
    setSearch("");
    setSearchUsers([]);

    setChats((prevChats) => {
      const isAlreadyAdded = prevChats.some((chat) => chat._id === user._id);

      if (isAlreadyAdded) {
        return prevChats;
      }

      return [...prevChats, user];
    });
  };

  const visibleUsers = search.trim() ? searchUsers : chats;

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

        {visibleUsers.map((u) => (
          <UserList
            key={u._id}
            users={u}
            onClick={() => openChat(u)}
          />
        ))}

        {isOpen && (
          <UserInfo
            setIsOpen={false}
            avatarColor={avatarColor}
            setAvatarColor={setAvatarColor}
            currentChat={currentChat}
          />
        )}
      </section>
    </aside>
  );
}
