const { Joi } = require('celebrate');

const joiCardIdSchema = {
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
};

module.exports = joiCardIdSchema;
