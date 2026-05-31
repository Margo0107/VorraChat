import { Types, Schema, model } from "mongoose";

interface UserMessage {
  text: string;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  createdAt: Date;
}

const userMessageSchema = new Schema<UserMessage>({
  text: {
    type: String,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default model<UserMessage>("UserMessage", userMessageSchema);
