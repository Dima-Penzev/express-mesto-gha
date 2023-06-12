const {
  HTTP_STATUS_OK, HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_NOT_FOUND, HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = require('node:http2').constants;
const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(HTTP_STATUS_OK).send({ data: users }))
  .catch((err) => res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: err.message }));

const createUser = (req, res) => User.create(req.body)
  .then((newUser) => res.status(HTTP_STATUS_OK).send(newUser))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя.' });
    }
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: err.message });
  });

const getUserById = (req, res) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь по указанному id не найден.' });
      }
      return res.status(HTTP_STATUS_OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Передан некоректный id пользователя.' });
      }

      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const updateUserDataById = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  return User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь по указанному id не найден.' });
      }
      return res.status(HTTP_STATUS_OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      }

      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const updateUserAvatarById = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  return User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь по указанному id не найден.' });
      }
      return res.status(HTTP_STATUS_OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      }

      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUserDataById,
  updateUserAvatarById,
};
