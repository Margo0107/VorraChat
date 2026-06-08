import { IoCheckmarkDone } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { IoIosHeart } from "react-icons/io";

type UserMessageProps = {
  text: string;
  time: string;
  sender: string;
  myId: string | undefined;
};

export default function UserMessage({
  text,
  time,
  sender,
  myId,
}: UserMessageProps) {
  return (
    <div className="flex flex-col gap-5">
      <div
        className={`group flex ${sender === myId ? "justify-end" : "justify-start"}`}
      >
        <button className="opacity-0 transition group-hover:opacity-100">
          <IoIosHeart
            size={23}
            className="transform text-pink-600 transition hover:scale-138"
          />
        </button>

        <div
          className={`flex items-center justify-between gap-3 p-3 py-1 ${sender === myId ? "rounded-tl-2xl rounded-br-2xl rounded-bl-2xl bg-sky-600" : "rounded-tr-2xl rounded-br-2xl rounded-bl-2xl bg-gray-700"}`}
        >
          <p>{text}</p>
          <div className="flex items-center gap-1">
            <span
              className={`text-sm ${sender === myId ? "text-sky-200" : "text-slate-400"}`}
            >
              {time}
            </span>
            {sender === myId && <IoCheckmark />}
          </div>
        </div>
      </div>
    </div>
  );
}
