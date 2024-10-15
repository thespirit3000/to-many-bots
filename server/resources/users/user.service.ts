import userModel from "./user.model";
import { User } from "./user.model";
import { isEmpty } from "../../../utils/utils";
import { HttpException } from "../../../exceptions/HttpException";
import mongoose from "mongoose";

const findAllUsers = async (): Promise<User[]> => {
  try {
    return await userModel.find();
  } catch (error) {
    throw error;
  }
};

const findUserById = async (userId: string): Promise<User | null> => {
  try {
    if (isEmpty(userId)) throw new HttpException(400, "User ID is empty");
    const user: User = await userModel.findOne({ _id: userId });
    if (!user) throw new HttpException(409, "User doesn't exist");
    return user;
  } catch (error) {
    throw error;
  }
};

const findUserByTelegramId = async (id: number): Promise<User | null> => {
  try {
    const user = await userModel.findOne({ telegramId: id });
    return user;
  } catch (error: any) {
    // LOGGER.error("[getUserByTelegramId][error]", {
    //   metadata: { error: error, stack: error.stack.toString() },
    // });
    return null;
  }
};

export const updateUserById = async (
  userId: string,
  update: Partial<User>
): Promise<User | null> => {
  try {
    const user = await findUserById(userId);
    if (user) {
      Object.assign(user, update);
      await user.save();
      return user;
    }
    return null;
  } catch (error: any) {
    // LOGGER.error("[updateUserById][error]", {
    //   metadata: { error: error, stack: error.stack.toString() },
    // });
    return null;
  }
};

export const updateUserByTelegramId = async (
  telegramId: number,
  update: Partial<User>
): Promise<User | null> => {
  try {
    const user = await findUserByTelegramId(telegramId);
    if (user) {
      Object.assign(user, update);
      await user.save();
      return user;
    }
    return null;
  } catch (error: any) {
    // LOGGER.error("[updateUserByTelegramId][error]", {
    //   metadata: { error: error, stack: error.stack.toString() },
    // });
    return null;
  }
};

export { findAllUsers, findUserById, findUserByTelegramId };
