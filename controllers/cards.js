const Card = require('../models/card');

const getCards = (req, res) => Card.find({})
  .populate(['owner', 'likes'])
  .then((cards) => res.status(200).send({ data: cards }))
  .catch((err) => res.status(500).send({ message: err.message }));

const createCard = (req, res) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user._id })
    .then((newCard) => res.status(200).send({ data: newCard }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
      }
      return res.status(500).send({ message: err.message });
    });
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;

  return Card.findByIdAndRemove(cardId)
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: `Карточка по указанному id: ${cardId} не найдена.` });
      }
      return res.status(500).send({ message: err.message });
    });
};

const LikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => res.status(200).send({ data: card }))
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(404).send({ message: `Передан несуществующий id: ${req.user._id} карточки.` });
    }

    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка.' });
    }

    return res.status(500).send({ message: err.message });
  });

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => res.status(200).send({ data: card }))
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(404).send({ message: `Передан несуществующий id: ${req.user._id} карточки.` });
    }

    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка.' });
    }

    return res.status(500).send({ message: err.message });
  });

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  LikeCard,
  dislikeCard,
};
