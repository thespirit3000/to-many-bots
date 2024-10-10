import mongoose, { Schema } from "mongoose";

const tasksSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  boardId: { type: String, required: true },
  reward: { type: Number, required: true },
});
const Task = mongoose.model("Task", tasksSchema);

export default Task;
