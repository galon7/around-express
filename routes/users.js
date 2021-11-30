const router = require('express').Router();
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const usersPath = path.join('data', 'users.json');

router.get('/users', (req, res) => {
  fs.readFile(usersPath, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.status(200).send(data);
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
    });
});

module.exports = router;
