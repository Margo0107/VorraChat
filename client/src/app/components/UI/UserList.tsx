import { IoCheckmarkDone } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";

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
  status?: "delivered" | "read";
};

type UserListProps = {
  users: UserType;
  onClick: () => void;
  isOnline?: boolean;
  isActive?: boolean;
  lastMessage?: MessageType;
  avatarText?: string;
  avatarClassName?: string;
};

export default function UserList({
  users,
  onClick,
  isOnline,
  isActive,
  lastMessage,
  avatarText,
  avatarClassName = "bg-pink-500",
}: UserListProps) {

  const preview = lastMessage?.text
    ? lastMessage.text.length > 30
      ? `${lastMessage.text.slice(0, 30)}...`
      : lastMessage.text
    : "No messages yet";

  const time = lastMessage?.createdAt
    ? new Date(lastMessage.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
    : "";

  return (
    <>
      <div
        onClick={onClick}
        className={`flex cursor-pointer flex-col justify-between rounded-lg border-b border-slate-700 px-4 py-3 hover:bg-gray-700 ${isActive ? "bg-gray-700" : "bg-gray-800"
          }`}
      >
        <div className="flex gap-3">
          <div className="relative">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold ${avatarClassName}`}
            >
              {avatarText || users?.userName?.[0].toUpperCase()}
            </div>
            {isOnline ? (
              <div className="absolute right-0 bottom-1 h-3 w-3 rounded-full border-2 border-gray-800 bg-emerald-300"></div>
            ) : null}
          </div>
          <div className="flex flex-1 flex-col justify-center">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">{users?.userName}</p>

              <div className="flex gap-1">

                {lastMessage?.status === "read" ? (
                  <IoCheckmarkDone className="text-sky-400 w-5 h-5" />
                ) : (
                  <IoCheckmark className="text-sky-400 w-5 h-5" />
                )
                }

                <span className="text-sm text-gray-400">{time}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              {" "}
              <p className="truncate text-slate-300">{preview}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
