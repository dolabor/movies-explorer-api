const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const config = require('./utils/config');
const { rootRouter } = require('./routes/routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');
const { limiter } = require('./utils/rateLimiter');

const PORT = config.port;

mongoose.connect(config.databaseUrl);

const app = express();
app.use(helmet());
app.use(cors({
  origin: [
    'https://mesto-ec.students.nomoredomainsicu.ru',
    'http://localhost:3001',
  ],
  methods: 'GET, POST, PUT, DELETE, PATCH',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(cookieParser());
app.use(requestLogger);
app.use(rootRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
