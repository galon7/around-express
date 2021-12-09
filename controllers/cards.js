const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link, owner } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Card not found' });
        return;
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
};
