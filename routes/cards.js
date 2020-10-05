/* eslint-disable */

const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createCard, getAllCards, deleteCard, putLike, deleteLike } = require('../controllers/cards');
const validateUrl = require('../constants/urlRegex');

cardRouter.get('/', getAllCards);
cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(validateUrl)
  })
}), createCard);
cardRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), deleteCard);
cardRouter.put('/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }), putLike);
cardRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), deleteLike);

module.exports = cardRouter;
