const express = require('express');
const { userSignupValidation, userSigninValidation } = require('../utils/userValidation');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login, logout } = require('../controllers/users');
const { NotFoundError } = require('../utils/errors/errors');
const auth = require('../middlewares/auth');

const rootRouter = express.Router();

rootRouter.post('/signup', userSignupValidation, createUser);
rootRouter.post('/signin', userSigninValidation, login);
rootRouter.delete('/signout', logout);

rootRouter.use('/users', auth, userRouter);
rootRouter.use('/movies', auth, movieRouter);

rootRouter.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = { rootRouter };
