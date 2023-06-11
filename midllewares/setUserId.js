module.exports.setUserId = (req, res, next) => {
  req.user = {
    _id: '6484935b5d302fa15effc3c9',
  };

  next();
};
