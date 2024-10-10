let boards = [];
const getAll = async () => {
  return boards;
};

const postNew = async board => {
  boards.push(board);
};

const deleteBoard = async id => {
  boards = boards.filter(board => board.id !== id);
};

const update = async (board, id) => {
  boards = boards.filter(boardElem => boardElem.id !== id);
  board.id = id;
  boards.push(board);
};

module.exports = { getAll, postNew, deleteBoard, update };
