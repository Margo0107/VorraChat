import { Schema, model } from "mongoose";

interface Chat {
  members: string[];
  lastMessage?: string;
}

const ChatSсhema = new Schema<Chat>(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "UserMessage",
    },
  },
  { timestamps: true },
);
export default model("Chat", ChatSсhema);
