const tasksRepo = require('./task.memory.repository');

const getAll = boardID => tasksRepo.getAll(boardID);

const getById = async (boardId, taskId) => {
  const all = await tasksRepo.getAll(boardId);
  const result = all.filter(task => task.id === taskId)[0];

  if (!result) {
    throw new Error('Nothing to find');
  } else {
    return result;
  }
};

const deleteByUser = async userId => {
  await tasksRepo.deleteByUser(userId);
};

const deleteByBoard = async boardId => {
  await tasksRepo.deleteByBoard(boardId);
};

const postNew = task => tasksRepo.postNew(task);

const remove = async (boardID, taskID) =>
  await tasksRepo.remove(boardID, taskID);

const update = async (task, boardId, taskId) => {
  console.log(task);
  await tasksRepo.update(task, boardId, taskId);
};

module.exports = {
  getAll,
  getById,
  postNew,
  remove,
  update,
  deleteByUser,
  deleteByBoard
};
