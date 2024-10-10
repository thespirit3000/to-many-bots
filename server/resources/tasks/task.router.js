const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  try {
    const allTasks = await tasksService.getAll(req.params.boardID);
    res.json(allTasks.map(Task.toResponse));
  } catch (err) {
    console.log('you got error: ', err);
    res.sendStatus(404);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const task = await tasksService.getById(req.params.boardID, req.params.id);
    res.status(200).json(Task.toResponse(task));
  } catch (err) {
    console.log('task error', err);
    res.sendStatus(404).send('');
  }
});

router.route('/').post(async (req, res) => {
  const task = new Task(req.body);
  task.boardId = req.params.boardID;
  await tasksService.postNew(Task.toPush(task));
  res.status(200).send(Task.toPush(task));
});

router.route('/:id').put(async (req, res) => {
  const { body } = req;
  const { boardID, id } = req.params;
  await tasksService.update(body, boardID, id);
  res.status(200).send(Task.toResponse(body));
});

router.route('/:id').delete(async (req, res) => {
  await tasksService.remove(req.params.boardID, req.params.id);
  res.sendStatus(200);
});

module.exports = router;
