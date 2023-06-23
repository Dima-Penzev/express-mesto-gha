const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const { handleUnexistedPath } = require('../utils/handleUnexistedPath');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const joiUserSchema = require('../validateSchemas/validateUser');

router.post('/signup', celebrate(joiUserSchema), createUser);

router.post('/signin', celebrate(joiUserSchema), login);

router.use('/users', auth, usersRoutes);

router.use('/cards', auth, cardsRoutes);

router.use('/*', handleUnexistedPath);

module.exports = router;
