const express = require('express');
const {
  body
} = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();


router.put('/sign-up',
  [
    body('email')
    .isEmail()
    .withMessage('Enter a valid email address.')
    .custom((value, { req }) => {
      return User.findOne({ email: value })
        .then(user => {
          if (user) {
            return Promise.reject('This email address is already in use.');
          }
        });
    })
    .normalizeEmail(),
    body(
      'password',
      'The password must be at least 3 characters long.'
    )
    .trim()
    .isLength({ min: 3 }),    
    body('name')
    .trim()
    .not().isEmpty()
  ],
  authController.putSignUp);

  
  router.post('/log-in', authController.postLogIn);


module.exports = router;