/* eslint-disable */

const Card = require('../models/cards');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const Unauthorized = require('../errors/unauthorized-err');
const Forbidden = require('../errors/forbidden-err');

module.exports.createCard = (req, res, next) => { //создаем карточку
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(err.message));
        return;
      }
      else {
        next(err);
      }
    });
};

module.exports.getAllCards = (req, res, next) => { //получаем все карточки
  Card.find({})
    .then(card => res.status(200).send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  //удаляем карточку по id
  Card.findById(req.params.cardId)
    .orFail(new Error('NotValidId'))
    .then((card) => {
      if (String(card.owner) !== String(req.user._id)) {
        next(new Forbidden('Вы не можете удалять чужие карточки'));
        return;
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then(() => res.status(200).send(card))
        .catch(next);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Пользователя нет в базе'));
        return;
      }
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные в метод удаления карточки'))
        return;

      } else {
        next(err);
      }
    });
};

module.exports.putLike = (req, res, next) => { //ставим лайк карточке по id
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Пользователя нет в базе'));
        return;
      }
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные в метод добавления лайка'))
        return;
      } else {
        next(err);
      }
    });
};

module.exports.deleteLike = (req, res, next) => { //удаляем лайк с карточки по id
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Пользователя нет в базе'));
        return;
      }
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные в метод удаления лайка'))
        return;
      } else {
        next(err);
      }
    });
};

