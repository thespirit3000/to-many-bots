import { Router } from "express";
import { getTaskById, getTasks, setTask } from "./task.controller";

const router = Router();

router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", setTask);

export default router;
