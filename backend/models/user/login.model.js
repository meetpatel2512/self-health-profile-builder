const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    time: {
      type: Date,
      default: Date.now,
    }
  },
  { timestamps: true }
);

const login = mongoose.model('login', LoginSchema);
module.exports = login;
