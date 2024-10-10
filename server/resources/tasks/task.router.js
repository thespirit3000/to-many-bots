import { Router } from "express";

import Task from "./task.model";
import getTasks from "./task.service.js";

const router = Router();

router.route("/").get(async (req, res) => {
  try {
    const allTasks = await Task.find();
    res.json(allTasks);
    res.send(allTasks);
  } catch (err) {
    console.log("you got error: ", err);
    res.sendStatus(404);
  }
});

export default router;
