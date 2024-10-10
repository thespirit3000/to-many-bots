const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const getById = async id => {
  const all = await boardsRepo.getAll();
  if (all.find(board => board.id === id) === undefined) {
    throw console.log('dont find');
  } else {
    return all.find(board => board.id === id);
  }
};

const update = async (board, id) => boardsRepo.update(board, id);

const postNew = async board => boardsRepo.postNew(board);

const deleteBoard = async id => {
  await tasksService.deleteByBoard(id);
  await boardsRepo.deleteBoard(id);
};

module.exports = { getAll, getById, postNew, deleteBoard, update };
