const jwt = require('jsonwebtoken');

const private = require('../private/private.js');

const SECRET = process.env.secret || private.secret;

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }

  // By convention, in the front-end request, pass a header in the form
  // {
  //   headers: {
  //     Authorization: 'Bearer ' + tokenVariable
  //   }
  // }
  // So in order to retrieve the token, split the
  // get('Authorization) result in the whitespace and get the second value.
  
  console.log('authHeader is:', authHeader);
  const token = authHeader.split(' ')[1];  

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, SECRET); 
  } 
  catch (err) {
      err.statusCode = 500;
      throw err;
  }

  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }

  // store the userId from the token to the request object
  req.userId = decodedToken.userId;
  next();
};