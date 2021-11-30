const router = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const cardsPath = path.join('data', 'cards.json');

router.get('/cards', (req, res) => {
  fsPromises.readFile(cardsPath)
    .then((data) => {
      res.status(200).send(data);
    }).catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
});

module.exports = router;
