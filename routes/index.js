const router = require('express').Router();
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const { handleUnexistedPath } = require('../utils/handleUnexistedPath');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', createUser);

router.post('/signin', login);

router.use('/users', auth, usersRoutes);

router.use('/cards', auth, cardsRoutes);

router.use('/*', handleUnexistedPath);

module.exports = router;
