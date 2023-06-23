const { Joi } = require('celebrate');

const joiUserAvatarSchema = {
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/http(s|\b):\/\/.+\.\w+.+/),
  }),
};

module.exports = joiUserAvatarSchema;
