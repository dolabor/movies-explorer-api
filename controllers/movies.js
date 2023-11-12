const Movies = require('../models/movie');
const { NotFoundError } = require('../utils/errors/errors');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movies.find({ owner })
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
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movies.findOne({ movieId })
    .then((movie) => {
      if (movie) {
        res.send('Фильм уже добавлен в избранное');
      } else {
        Movies.create({
          country,
          director,
          duration,
          year,
          description,
          image,
          trailerLink,
          nameRU,
          nameEN,
          thumbnail,
          movieId,
          owner,
        })
          .then(() => res.send(movie))
          .catch(next);
      }
    });
};

const deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;
  Movies.findOne({ movieId })
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Фильм не найден'));
      }

      return Movies.deleteOne(movie)
        .then(() => res.send({ message: 'Фильм успешно удален' }))
        .catch(next);
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getMovies, createMovie, deleteMovieById,
};
