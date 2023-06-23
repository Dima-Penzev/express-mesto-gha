const { Joi } = require('celebrate');

const joiUserSchema = {
  body: Joi.object().keys({
    email: Joi.string(),
    password: Joi.string().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/http(s|\b):\/\/.+\.\w+.+/),
  }),
};

module.exports = joiUserSchema;