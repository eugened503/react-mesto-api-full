/* eslint-disable */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // импортируем bcrypt
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,

  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (link) => /https?:\/\/(www\.)?(?:[-\w.]+\.[a-z]+)(?:\/[-\w@\/]*#?)?(?:.(?:jpg|jpeg|png))?/.test(link),
      message: (props) => `${props.value} не является ссылкой`,
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неверный адрес почты',
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
