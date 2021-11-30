const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const cardsPath = path.join('data', 'cards.json');

router.get('/cards', (req, res) => {
  fs.readFile(cardsPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.status(200).send(data);
  });
});

module.exports = router;
