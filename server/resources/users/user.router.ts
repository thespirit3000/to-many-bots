const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  res.status(200).json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const user = new User(req.body);
  await usersService.postNew(user);
  res.status(200).send(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  await usersService.deleteUser(req.params.id);
  res.sendStatus(200);
});

router.route('/:id').put(async (req, res) => {
  const user = req.body;
  await usersService.update(user, req.params.id);
  res.status(200).send(User.toResponse(user));
});
module.exports = router;
