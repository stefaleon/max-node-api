const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator/check');

const User = require('../models/user');
const private = require('../private/private.js');

const APP_SERVER_URL = process.env.appServerUrl || private.appServerUrl;

const reachNextError = (err, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
};

exports.putSignUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;    
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        email,
        name,
        password: hashedPassword        
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: 'User created.', userId: result._id })
    })
    .catch(err => {
      reachNextError(err, next);      
    });
};

