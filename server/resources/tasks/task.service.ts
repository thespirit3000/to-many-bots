import taskModel from "./task.model";
import { Task } from "./task.interface";
import { isEmpty } from "../../../utils/utils";
import { HttpException } from "../../../exceptions/HttpException";

//  const getAll = async (boardId) => {
//   return tasks.filter((task) => task.boardId === boardId);
// };

const findAllTasks = async (): Promise<Task[]> => {
  try {
    return await taskModel.find();
  } catch (error) {
    throw error;
  }
};

const findTaskById = async (taskID: string): Promise<Task> => {
  try {
    console.log("test");
    if (isEmpty(taskID)) throw new HttpException(400, "Task Id is empty");
    const task: Task = await taskModel.findOne({ _id: taskID });
    if (!task) throw new HttpException(409, "Task doesn't exist");
    return task;
  } catch (error) {
    throw error;
  }
};

const createTask = async (taskData: Task): Promise<Task> => {
  if (isEmpty(taskData)) throw new HttpException(400, "task data is empty");
  const createTaskData: Task = await taskModel.create({ ...taskData });
  return createTaskData;
};

// public createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const userData: CreateUserDto = req.body;
//     const createUserData: User = await this.userService.createUser(userData);

//     res.status(201).json({ data: createUserData, message: 'created' });
//   } catch (error) {
//     next(error);
//   }
// };

// public updateUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const userId: string = req.params.id;
//     const userData: CreateUserDto = req.body;
//     const updateUserData: User = await this.userService.updateUser(userId, userData);

//     res.status(200).json({ data: updateUserData, message: 'updated' });
//   } catch (error) {
//     next(error);
//   }
// };
// const getById = async (boardId, taskId) => {
//   const all = await getAll(boardId);
//   const result = all.filter((task) => task.id === taskId)[0];

//   if (!result) {
//     throw new Error("Nothing to find");
//   } else {
//     return result;
//   }
// };

// const deleteByUser = async (userId) => {
//   await deleteByUser(userId);
// };

// const deleteByBoard = async (boardId) => {
//   await deleteByBoard(boardId);
// };

// const postNew = (task) => postNew(task);

// const remove = async (boardID, taskID) => await remove(boardID, taskID);

// const update = async (task, boardId, taskId) => {
//   console.log(task);
//   await update(task, boardId, taskId);
// };

export {
  findAllTasks,
  findTaskById,
  createTask,
  // getAll,
  // getById,
  // getTasks,
  // postNew,
  // remove,
  // update,
  // deleteByUser,
  // deleteByBoard,
};
