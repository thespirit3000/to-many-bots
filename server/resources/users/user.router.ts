import { Router } from "express";
import { getUsers } from "./user.controller";

const usersRouter = Router();
usersRouter.route("/").get(getUsers);

export default usersRouter;
