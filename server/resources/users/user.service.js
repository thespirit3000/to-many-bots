const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();
const get = async id => {
  const allUsers = await usersRepo.getAll();
  return allUsers.find(user => user.id === id);
};
const deleteUser = async id => {
  await usersRepo.deleteUser(id);
  tasksService.deleteByUser(id);
};
const postNew = user => usersRepo.postNew(user);
const update = (user, id) => usersRepo.update(user, id);
module.exports = { getAll, postNew, get, deleteUser, update };
