const router = require('express').Router();
const {
  getCards, createCard, deleteCardById, LikeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', createCard);

router.delete('/:cardId', deleteCardById);

router.put('/:cardId/likes', LikeCard);

router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
