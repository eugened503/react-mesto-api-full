/* eslint-disable */

const cardRouter = require('express').Router();
const { createCard, getAllCards, deleteCard, putLike, deleteLike } = require('../controllers/cards');

cardRouter.post('/', createCard);
cardRouter.get('/', getAllCards);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', putLike);
cardRouter.delete('/:cardId/likes', deleteLike);

module.exports = cardRouter;
