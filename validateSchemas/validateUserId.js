const { Joi } = require('celebrate');

const joiUserIdSchema = {
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
};

module.exports = joiUserIdSchema;