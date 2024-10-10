let tasks = [];

const getAll = async boardId => {
  return tasks.filter(task => task.boardId === boardId);
};

const getTasks = () => {
  return tasks;
};

const postNew = async task => {
  tasks.push(task);
};

const remove = async (boardID, taskID) => {
  const array = tasks.filter(element => element.boardId === boardID);
  tasks = array.filter(el => el.id !== taskID);
};

const update = async (task, boardId, taskId) => {
  await remove(boardId, taskId);
  task.id = taskId;
  await postNew(task);
};

const deleteByUser = async userId => {
  const userTasks = tasks.filter(task => task.userId === userId);
  userTasks.map(task => (task.userId = null));
  tasks = tasks.filter(task => task.userId !== userId);
  tasks.push(userTasks);
};

const deleteByBoard = async boardId => {
  tasks = tasks.filter(task => task.boardId !== boardId);
};

module.exports = {
  getAll,
  postNew,
  remove,
  getTasks,
  update,
  deleteByUser,
  deleteByBoard
};
