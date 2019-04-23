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

const checkIfUserExists = user => {
  if (!user) {
    const error = new Error('User not found.');
    error.statusCode = 404;
    throw error;
  }
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


exports.postLogIn = (req, res, next) => {
  const email = req.body.email;  
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      checkIfUserExists(user);      
      loadedUser = user;
      return bcrypt.compare(password, user.password)
    })
    .then(matching => {
      if (!matching) {
        const error = new Error('Wrong Password.');
        error.statusCode = 401; // Not authenticated
        throw error;
      }
      //TODO: generate JSON Web Token
      // temporarily respond with a message and the loaded user
      console.log(loadedUser);
      res.status(200).json({
        message: 'User found',
        loadedUser
      });

    })
    .catch(err => {
      reachNextError(err, next);      
    });
};