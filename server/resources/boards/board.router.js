const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.getById(req.params.id);
    res.status(200).json(Board.toResponse(board));
  } catch (err) {
    console.log('catched', err);
    res.sendStatus(404);
  }
});

router.route('/').post(async (req, res) => {
  const board = new Board(req.body);
  await boardsService.postNew(board);
  res.status(200).send(Board.toResponse(board));
});

router.route('/:id').delete(async (req, res) => {
  await boardsService.deleteBoard(req.params.id);
  res.sendStatus(200);
});

router.route('/:id').put(async (req, res) => {
  const board = req.body;
  await boardsService.update(board, req.params.id);
  res.status(200).send(Board.toResponse(board));
});

module.exports = router;
