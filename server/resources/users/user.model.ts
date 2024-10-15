import { model, Schema, Document } from "mongoose";

export interface User extends Document {
  telegramUserName: string;
  telegramId: number;
  firstName: string;
  lastName?: string;
  balance: number;
  referer?: string;
}

const userSchema = new Schema(
  {
    telegramUserName: { type: String, required: false },
    telegramId: { type: Number, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },

    balance: { type: Number, required: true, default: 0 },
    rewardMultiplayer: { type: Number, default: 1 },
    tasks: [{ taskId: String, status: String }],
  },
  {
    timestamps: true,
  }
);

const userModel = model<User & Document>("User", userSchema);

export default userModel;
