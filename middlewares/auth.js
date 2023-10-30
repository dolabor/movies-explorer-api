const jwt = require('jsonwebtoken');
const { UnauthorisedError } = require('../utils/errors/errors');

const config = require('../utils/config');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    next(new UnauthorisedError('Необходима авторизация'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(req.cookies.jwt, config.jwtSecret);
  } catch (err) {
    next(new UnauthorisedError('Необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
};
