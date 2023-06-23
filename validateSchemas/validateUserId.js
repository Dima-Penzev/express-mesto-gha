const { Joi } = require('celebrate');

const joiUserIdSchema = {
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }).unknown(true),
};

module.exports = joiUserIdSchema;
