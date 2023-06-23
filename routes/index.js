const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const { handleUnexistedPath } = require('../utils/handleUnexistedPath');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), login);

router.use('/users', auth, usersRoutes);

router.use('/cards', auth, cardsRoutes);

router.use('/*', handleUnexistedPath);

module.exports = router;
