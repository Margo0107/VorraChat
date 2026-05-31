import { Schema, model } from "mongoose";

interface User {
  userName: string;
  userEmail: string;
  userPassword: string;
}

const userSchema = new Schema<User>({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
});
export default model<User>("User", userSchema);
