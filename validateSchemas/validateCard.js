const { Joi } = require('celebrate');

const joiCardSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().pattern(/http(s|\b):\/\/.+\.\w+.+/),
  }),
};

module.exports = joiCardSchema;
