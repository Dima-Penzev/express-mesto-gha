const {
  HTTP_STATUS_OK, HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_NOT_FOUND, HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = require('node:http2').constants;
const Card = require('../models/card');

const getCards = (req, res) => Card.find({})
  .populate(['owner', 'likes'])
  .then((cards) => res.status(HTTP_STATUS_OK).send({ data: cards }))
  .catch((err) => res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: err.message }));

const createCard = (req, res) => {
  const { name, link } = req.body;

  return Card.create({
    name, link, owner: req.user._id, createdAt: Date.now(),
  })
    .then((newCard) => res.status(HTTP_STATUS_OK).send({ data: newCard }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки.' });
      }
      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;

  return Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка по указанному id не найдена.' });
      }
      return res.status(HTTP_STATUS_OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные при удалении карточки.' });
      }
      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const LikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка по указанному id не найдена.' });
    }
    return res.status(HTTP_STATUS_OK).send({ data: card });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки лайка.' });
    }

    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: err.message });
  });

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка по указанному id не найдена.' });
    }
    return res.status(HTTP_STATUS_OK).send({ data: card });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные для снятия лайка.' });
    }

    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: err.message });
  });

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  LikeCard,
  dislikeCard,
};
