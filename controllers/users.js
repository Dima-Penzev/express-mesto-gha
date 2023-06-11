const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send({ data: users }))
  .catch((err) => res.status(500).send({ message: err.message }));

const createUser = (req, res) => User.create(req.body)
  .then((newUser) => res.status(200).send(newUser))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
    }
    return res.status(500).send({ message: err.message });
  });

const getUserById = (req, res) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: `Пользователь по указанному id: ${userId} не найден.` });
      }

      return res.status(500).send({ message: err.message });
    });
};

const updateUserDataById = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  return User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: `Пользователь по указанному id: ${userId} не найден.` });
      }

      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      }

      return res.status(500).send({ message: err.message });
    });
};

const updateUserAvatarById = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  return User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: `Пользователь по указанному id: ${userId} не найден.` });
      }

      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      }

      return res.status(500).send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUserDataById,
  updateUserAvatarById,
};
