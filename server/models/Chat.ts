import { Schema, model } from "mongoose";

interface Chat {
  members: string[];
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
  },
  { timestamps: true },
);
export default model("Chat", ChatSсhema);
