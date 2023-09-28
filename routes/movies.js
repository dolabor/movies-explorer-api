const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovieById } = require('../controllers/movies');
const { checkValidityURL } = require('../utils/validationURL');

const moviesRouter = express.Router();

moviesRouter.get('/', getMovies);

moviesRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(checkValidityURL),
    trailer: Joi.string().required().custom(checkValidityURL),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom(checkValidityURL),
    movieId: Joi.number().required(),
  }),
}), createMovie);

moviesRouter.delete('/_id', celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
}), deleteMovieById);

module.exports = moviesRouter;
