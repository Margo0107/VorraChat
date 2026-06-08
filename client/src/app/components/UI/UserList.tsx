import { IoCheckmarkDone } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";

type UserType = {
  _id: string;
  userName: string;
};
type UserListProps = {
  users: UserType;
  onClick: () => void;
  isOnline: boolean;
};

export default function UserList({ users, onClick, isOnline }: UserListProps) {
  return (
    <>
      <div
        onClick={onClick}
        className="flex cursor-pointer flex-col justify-between rounded-lg border-b border-slate-700 bg-gray-800 px-4 py-3 hover:bg-gray-700"
      >
        <div className="flex gap-3">
          <div className="relative">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-500 font-bold">
              {users?.userName?.[0].toUpperCase()}
            </div>
            {isOnline ? (
              <div className="h-3 w-3 rounded-full bg-emerald-300 absolute bottom-1 right-0"></div>
            ) : null}
          </div>
          <div className="flex flex-1 flex-col justify-center">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">{users?.userName}</p>

              <div className="flex gap-1">
                <IoCheckmark />
                <span className="text-sm text-sky-200">15:00</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              {" "}
              <p>hi, how are you?</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
