const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUserDataById,
  updateUserAvatarById,
  getUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getUserInfo);

router.get('/:userId', getUserById);

router.patch('/me', updateUserDataById);

router.patch('/me/avatar', updateUserAvatarById);

module.exports = router;
