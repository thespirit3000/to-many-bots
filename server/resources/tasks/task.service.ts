import taskModel from "./task.model";
import { Task } from "./task.interface";
import { isEmpty } from "../../../utils/utils";
import { HttpException } from "../../../exceptions/HttpException";

const findAllTasks = async (): Promise<Task[]> => {
  try {
    return await taskModel.find();
  } catch (error) {
    throw error;
  }
};

const findTaskById = async (taskID: string): Promise<Task> => {
  try {
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
};
