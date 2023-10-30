const express = require('express');
const { createMovieValidation, deleteMovieByIdValidation } = require('../utils/moviesValidation');
const { getMovies, createMovie, deleteMovieById } = require('../controllers/movies');

const moviesRouter = express.Router();

moviesRouter.get('/', getMovies);

moviesRouter.post('/', createMovieValidation, createMovie);

moviesRouter.delete('/_id', deleteMovieByIdValidation, deleteMovieById);

module.exports = moviesRouter;
