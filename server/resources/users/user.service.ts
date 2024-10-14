import userModel from "./user.model";
import { User } from "./user.model";
import { isEmpty } from "../../../utils/utils";
import { HttpException } from "../../../exceptions/HttpException";

const findAllUsers = async (): Promise<User[]> => {
  try {
    return await userModel.find();
  } catch (error) {
    throw error;
  }
};

const findUserById = async (userId: string): Promise<User> => {
  try {
    if (isEmpty(userId)) throw new HttpException(400, "User ID is empty");
    const user: User = await userModel.findOne({ _id: userId });
    if (!user) throw new HttpException(409, "User doesn't exist");
    return user;
  } catch (error) {
    throw error;
  }
};

export { findAllUsers };
