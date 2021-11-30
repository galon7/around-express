const router = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const usersPath = path.join('data', 'users.json');

router.get('/users', (req, res) => {
  fsPromises.readFile(usersPath)
    .then((data) => {
      res.status(200).send(data);
    }).catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
});

router.get('/users/:id', (req, res) => {
  fsPromises.readFile(usersPath)
    .then((data) => {
      const searchUser = JSON.parse(data).filter((user) => user._id === req.params.id);
      if (!searchUser.length) {
        res.status(404).send({ message: 'User ID not found' });
        return;
      }
      res.send(searchUser);
    }).catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
});

module.exports = router;
