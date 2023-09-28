const { celebrate, Joi } = require('celebrate');
const { checkValidityURL } = require('./validationURL');

const createMovieValidation = celebrate({
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
});

const deleteMovieByIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
});

module.exports = { createMovieValidation, deleteMovieByIdValidation };
