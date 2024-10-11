import { NextFunction, Request, Response } from "express";

import { Task } from "./task.interface";
import { findAllTasks, findTaskById, createTask } from "./task.service";

const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getAllTasks: Task[] = await findAllTasks();
    res.status(200).json({ data: getAllTasks, message: "findAllTasks" });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId: string = req.params.id;
    const taskData: Task = await findTaskById(taskId);

    res.status(200).json({ data: taskData, message: "find one by id" });
  } catch (error) {
    next(error);
  }
};

const setTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskData: Task = req.body;
    const createTaskData: Task = await createTask(taskData);
    res.status(201).json({ data: createTaskData, message: "created" });
  } catch (error) {
    next(error);
  }
};

export { getTasks, getTaskById, setTask };
// class UsersController {
//   public userService = new userService();

//   public getUsers = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const findAllUsersData: User[] = await this.userService.findAllUser();

//       res.status(200).json({ data: findAllUsersData, message: "findAll" });
//     } catch (error) {
//       next(error);
//     }
//   };

//   public getUserById = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     try {
//       const userId: string = req.params.id;
//       const findOneUserData: User = await this.userService.findUserById(userId);

//       res.status(200).json({ data: findOneUserData, message: "findOne" });
//     } catch (error) {
//       next(error);
//     }
//   };

//   public createUser = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     try {
//       const userData: CreateUserDto = req.body;
//       const createUserData: User = await this.userService.createUser(userData);

//       res.status(201).json({ data: createUserData, message: "created" });
//     } catch (error) {
//       next(error);
//     }
//   };

//   public updateUser = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     try {
//       const userId: string = req.params.id;
//       const userData: CreateUserDto = req.body;
//       const updateUserData: User = await this.userService.updateUser(
//         userId,
//         userData
//       );

//       res.status(200).json({ data: updateUserData, message: "updated" });
//     } catch (error) {
//       next(error);
//     }
//   };

//   public deleteUser = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     try {
//       const userId: string = req.params.id;
//       const deleteUserData: User = await this.userService.deleteUser(userId);

//       res.status(200).json({ data: deleteUserData, message: "deleted" });
//     } catch (error) {
//       next(error);
//     }
//   };
// }

// export default UsersController;
