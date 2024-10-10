let users = [];

const getAll = async () => {
  return users;
};

const postNew = async user => {
  users.push(user);
};

const deleteUser = async id => {
  users = users.filter(user => user.id !== id);
};

const update = async (user, id) => {
  users = users.filter(userElement => userElement.id !== id);
  user.id = id;
  users.push(user);
};

module.exports = { getAll, postNew, deleteUser, update };
