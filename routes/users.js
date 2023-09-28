const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { updateUserProfile, getCurrentUserProfile } = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/me', getCurrentUserProfile);
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserProfile);

module.exports = usersRouter;
