const getAll = async (boardId) => {
  return tasks.filter((task) => task.boardId === boardId);
};

const getTasks = () => {
  return tasks;
};

const getById = async (boardId, taskId) => {
  const all = await getAll(boardId);
  const result = all.filter((task) => task.id === taskId)[0];

  if (!result) {
    throw new Error("Nothing to find");
  } else {
    return result;
  }
};

const deleteByUser = async (userId) => {
  await deleteByUser(userId);
};

const deleteByBoard = async (boardId) => {
  await deleteByBoard(boardId);
};

const postNew = (task) => postNew(task);

const remove = async (boardID, taskID) => await remove(boardID, taskID);

const update = async (task, boardId, taskId) => {
  console.log(task);
  await update(task, boardId, taskId);
};

export default {
  getAll,
  getById,
  getTasks,
  postNew,
  remove,
  update,
  deleteByUser,
  deleteByBoard,
};
