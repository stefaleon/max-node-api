const { validationResult } = require('express-validator/check');

const Post = require('../models/post');

const reachNextError = err => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
};

exports.getPosts = (req, res, next) => {
  Post.find()
  .then(posts => {    
    res.status(200).json({
      message: 'Posts fetched',
      posts
    });
  })
  .catch(err => reachNextError(err));  
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation error.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title,
    content,
    creator: { name: 'admin' }
  });
  post.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'New post created.',
        post: result
      });
    })
    .catch(err => reachNextError(err));
};
