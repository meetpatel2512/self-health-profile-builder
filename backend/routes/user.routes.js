const express = require('express');
const route = express.Router();
const registercontroller = require('../controllers/user/register.controller');
const Logincontroller = require('../controllers/user/login.controller');
const { body } = require('express-validator');

// register user routes
route.post(
  '/register',
  [
    body('name', 'Enter a Valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 character').isLength({
      min: 5,
    }),
    body('cpassword', 'You must type a confirmation password')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('The passwords do not match'),
  ],
  registercontroller
);

// login user routes
route.post(
  '/login',
  [body('email', 'Enter a valid email').isEmail()],
  Logincontroller
);

module.exports = route;
