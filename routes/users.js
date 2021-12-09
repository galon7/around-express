const router = require('express').Router();
const User = require('../models/user');

router.get('/users', (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
});

router.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User ID not found' });
        return;
      }
      res.send({ data: user });
    }).catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
});

router.post('/users', (req, res) => {
  console.log(req.body);
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
});

module.exports = router;
