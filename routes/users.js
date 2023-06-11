const router = require('express').Router();
const {
  getUsers,
  createUser,
  getUserById,
  updateUserDataById,
  updateUserAvatarById,
} = require('../controllers/users');

router.get('/', getUsers);

router.post('/', createUser);

router.get('/:userId', getUserById);

router.patch('/me', updateUserDataById);

router.patch('/me/avatar', updateUserAvatarById);

module.exports = router;
