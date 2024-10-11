import { model, Schema, Document } from "mongoose";
import { Task } from "./task.interface";

const tasksSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  boardId: { type: String, required: true },
  reward: { type: Number, required: true },
});
const taskModel = model<Task & Document>("Task", tasksSchema);

export default taskModel;
