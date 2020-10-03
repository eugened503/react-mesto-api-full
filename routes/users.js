/* eslint-disable */
const userRouter = require('express').Router(); // создадим express router
const { getIdUser, getAllUser, updateUserInfo, updateUserAvatar} = require('../controllers/users');

userRouter.get('/', getAllUser);
userRouter.get('/:id', getIdUser);
userRouter.patch('/me', updateUserInfo);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;