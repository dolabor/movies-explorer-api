const express = require('express');
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login, logout } = require('../controllers/users');
const { NotFoundError } = require('../utils/errors/errors');
const auth = require('../middlewares/auth');

const rootRouter = express.Router();

rootRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

rootRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

rootRouter.delete('/signout', logout);

rootRouter.use('/users', auth, userRouter);
rootRouter.use('/movies', auth, movieRouter);

rootRouter.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = { rootRouter };
