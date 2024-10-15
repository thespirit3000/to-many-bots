import { Router } from "express";
import { getTaskById, getTasks, setTask } from "./task.controller";

const taskRouter = Router();

taskRouter.get("/", getTasks);
taskRouter.get("/:id", getTaskById);
taskRouter.route("/").post(setTask);

export default taskRouter;
