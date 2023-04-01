const jwt = require('jsonwebtoken');
const Authorization = require('../errors/authorization');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  let payload;
  const { authorization } = req.headers;
  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return next(new Authorization('Необходима авторизация'));
    }
    const token = authorization.replace('Bearer ', '');
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    next(new Authorization('Необходима авторизация'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
