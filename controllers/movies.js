const Movies = require('../models/movie');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../utils/errors/errors');

const getMovies = (req, res, next) => {
  Movies.find()
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => {
      Movies.findById(movie._id)
        .then((createdMovie) => res.send(createdMovie))
        .catch(() => next(new BadRequestError('Ошибка при создании фильма')));
    })
    .catch(next);
};

const deleteMovieById = (req, res, next) => {
  Movies.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Фильм не найден'));
      }
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Вы не можете удалить данный фильм'));
      }
      return Movies.deleteOne(movie)
        .then(() => res.send({ message: 'Фильм успешно удален' }))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getMovies, createMovie, deleteMovieById,
};
