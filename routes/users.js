const express = require('express');
const { userUpdateVaidation } = require('../utils/userValidation');
const { updateUserProfile, getCurrentUserProfile } = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/me', getCurrentUserProfile);
usersRouter.patch('/me', userUpdateVaidation, updateUserProfile);

module.exports = usersRouter;
