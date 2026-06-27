import { Types, Schema, model } from "mongoose";

interface UserMessage {
  text: string;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  createdAt: Date;
  roomId: string;
  status: "delivered" | "read";
}

const userMessageSchema = new Schema<UserMessage>({
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  roomId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["delivered", "read"],
    default: "delivered",
  },
});
export default model<UserMessage>("UserMessage", userMessageSchema);
