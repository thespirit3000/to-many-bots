import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "./user.model";
import {
  findAllUsers,
  findUserById,
  findUserByTelegramId,
  updateUserById,
  updateUserByTelegramId,
} from "./user.service";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers: User[] = await findAllUsers();
    res.status(200).json({ data: allUsers, message: "findAllUsers" });
  } catch (error) {
    next();
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId: string = req.params.id;
    const userData: User = await findUserById(userId);
    res.status(200).json({ data: userData, message: "UserData by Id" });
  } catch (error) {
    next(error);
  }
};

const getUserByTelegramId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const telegramId: number = req.params.telegramId;
    const userData: User = await findUserByTelegramId(telegramId);
    res.status(201).json({ data: userData, message: "UserData by Id" });
  } catch (error) {
    next(error);
  }
};
