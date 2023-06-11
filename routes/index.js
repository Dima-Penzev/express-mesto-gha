const router = require('express').Router();
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const { handleUnexistedPath } = require('../utils/handleUnexistedPath');

router.use('/users', usersRoutes);

router.use('/cards', cardsRoutes);

router.use('/*', handleUnexistedPath);

module.exports = router;
