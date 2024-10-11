import { Router } from "express";
import { getTaskById, getTasks, setTask, setNewPost } from "./task.controller";

const router = Router();

router.get("/", getTasks);
router.get("/:id", getTaskById);
router.route("/").post(setTask);

export default router;
