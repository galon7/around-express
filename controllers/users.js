const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
};

module.exports.getUser = (req, res) => {
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
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
};
