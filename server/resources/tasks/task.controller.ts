import { NextFunction, Request, RequestHandler, Response } from "express";

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

const setNewPost = async (req, res, next) => {
  res.send(req.body);
};

const setTask: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  try {
    const taskData = req.body;
    const createTaskData: Task = await createTask(taskData);
    res.status(201).json({ data: createTaskData, message: "created" });
  } catch (error) {
    next(error);
  }
};

export { getTasks, getTaskById, setTask, setNewPost };
