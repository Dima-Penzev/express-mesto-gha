const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getCards, createCard, deleteCardById, LikeCard, dislikeCard,
} = require('../controllers/cards');
const joiCardSchema = require('../validateSchemas/validateCard');

router.get('/', getCards);

router.post('/', celebrate(joiCardSchema), createCard);

router.delete('/:cardId', deleteCardById);

router.put('/:cardId/likes', LikeCard);

router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
