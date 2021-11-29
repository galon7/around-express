const router = require('express').Router();
const users = require('../data/users.json');

router.get('/users', (req, res) => {
  res.status(200).send(users);
});

router.get('/users/:id', (req, res) => {
  const searchUser = users.filter((user) => user._id === req.params.id);

  if (!searchUser.length) {
    res.status(404).send({ message: 'User ID not found' });
    return;
  }

  res.send(searchUser);
});

module.exports = router;
