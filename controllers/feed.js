const { validationResult } = require('express-validator/check');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: '1',
        title: 'Test Post Number 1',
        content: 'This is a post for the Node API initial testing.',
        createdAt: new Date()
      }
    ]
  });
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
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};