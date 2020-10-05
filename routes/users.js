/* eslint-disable */
const userRouter = require('express').Router(); // создадим express router
const { celebrate, Joi } = require('celebrate');
const { getIdUser, getAllUser, updateUserInfo, updateUserAvatar } = require('../controllers/users');
const validateUrl = require('../constants/urlRegex');

userRouter.get('/', getAllUser);
userRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), getIdUser);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);
userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(validateUrl),
  }),
}), updateUserAvatar);

module.exports = userRouter;

