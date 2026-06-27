type UserType = {
  _id: string;
  userName: string;
};

type CurrentChatType = {
  chatId: string;
  user: UserType;
};

type UserHeaderProps = {
  currentChat: CurrentChatType;
};

export default function UserHeader({ currentChat, isOnline }: UserHeaderProps & { isOnline: boolean }) {
  return (
    <header className="border-b border-slate-500 bg-gray-800 p-6 py-2">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 font-bold">
          {currentChat.user.userName[0].toUpperCase()}
        </div>

        <div className="flex flex-col">
          <p className="text-lg font-semibold">{currentChat.user.userName}</p>
          <div>
            <p className="text-sky-400">{isOnline ? "online" : "offline"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
