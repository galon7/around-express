const router = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const usersPath = path.join('data', 'users.json');

fsPromises.readFile(usersPath)
  .then((data) => {
    router.get('/users', (req, res) => {
      res.status(200).send(data);
    });

    router.get('/users/:id', (req, res) => {
      const searchUser = JSON.parse(data).filter((user) => user._id === req.params.id);
      if (!searchUser.length) {
        res.status(404).send({ message: 'User ID not found' });
        return;
      }
      res.send(searchUser);
    });
  }).catch((err) => { console.log(err); });

module.exports = router;
