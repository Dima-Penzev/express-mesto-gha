module.exports.handleUnexistedPath = (req, res, next) => {
  res.status(404).send({ message: 'Нет страницы по указанному пути.' });
  next();
};
