/* eslint-disable */
const mongoose = require('mongoose');

const cardsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /https?:\/\/(www\.)?(?:[-\w.]+\.[a-z]+)(?:\/[-\w@\/]*#?)?(?:.(?:jpg|jpeg|png))?/.test(v);
      },
      message: props => `Ссылка${props.value} введена ошибочно`
    },

  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model('card', cardsSchema);