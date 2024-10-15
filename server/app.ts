// src/index.js
import cors from "cors";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import tasksRouter from "./resources/tasks/task.router";
import usersRouter from "./resources/users/user.router";
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));

app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);

const runServer = () => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

export default runServer;
