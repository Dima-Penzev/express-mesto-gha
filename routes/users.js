const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUsers,
  getUserById,
  updateUserDataById,
  updateUserAvatarById,
  getUserInfo,
} = require('../controllers/users');
const joiUserSchema = require('../validateSchemas/validateUser');

router.get('/', getUsers);

router.get('/me', getUserInfo);

router.get('/:userId', getUserById);

router.patch('/me', celebrate(joiUserSchema), updateUserDataById);

router.patch('/me/avatar', celebrate(joiUserSchema), updateUserAvatarById);

module.exports = router;
