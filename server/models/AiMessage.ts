import { Schema, model, Types } from "mongoose";

interface AiMessage {
  user: Types.ObjectId;
  text: string;
  sender: "user" | "assistant";
  createdAt: Date;
}

const aiMessageSchema = new Schema<AiMessage>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  text: {
    type: String,
    required: true,
  },

  sender: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<AiMessage>("AiMessage", aiMessageSchema);
