const { Joi } = require('celebrate');

const joiUserDataSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
};

module.exports = joiUserDataSchema;
