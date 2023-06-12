const { HTTP_STATUS_NOT_FOUND } = require('node:http2').constants;

module.exports.handleUnexistedPath = (req, res, next) => {
  res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Нет страницы по указанному пути.' });
  next();
};
