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
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'ValidationError') res.status(ERROR_CODE).send({ message: 'Error, please check your data' });
      else res.status(500).send({ message: 'An error has occurred on the server' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const error = new Error('No card found with that id');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      res.status(err.statusCode).send({ message: err.message });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    res.status(200).send({ data: card });
  }).catch((err) => {
    res.status(err.statusCode).send({ message: err.message });
  });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    res.status(200).send({ data: card });
  }).catch((err) => {
    res.status(err.statusCode).send({ message: err.message });
  });
};
