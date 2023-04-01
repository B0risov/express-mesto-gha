const express = require('express');
const { celebrate, Joi } = require('celebrate');

const cardRoutes = express.Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { BAD_REQUEST_MESSAGE } = require('../constants');

cardRoutes.get('/cards', getCards);
cardRoutes.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(BAD_REQUEST_MESSAGE),
    }),
  }),
  createCard,
);
cardRoutes.delete(
  '/cards/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteCard,
);
cardRoutes.put(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  likeCard,
);
cardRoutes.delete(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  dislikeCard,
);

module.exports = cardRoutes;
