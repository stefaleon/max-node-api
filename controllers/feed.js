const {
  validationResult
} = require('express-validator/check');

const Post = require('../models/post');



// refactoring reusable code to functions

const checkIfPostExists = post => {
  if (!post) {
    const error = new Error('Post not found.');
    error.statusCode = 404;
    throw error;
  }
};

const reachNextError = (err, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
};


// exports

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
    creator: {
      name: 'admin'
    }
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


exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      checkIfPostExists(post);
      res.status(200).json({
        message: 'Post fetched',
        post
      });
    })
    .catch(err => {
      reachNextError(err, next);
    });
};


exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation error.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  Post.findById(postId)
    .then(post => {
      checkIfPostExists(post);
      post.title = title;
      post.content = content;
      return post.save();
    })
    .then(result => {
      res.status(200).json({
        message: 'Post updated.',
        post: result
      });
    })
    .catch(err => {
      reachNextError(err, next);
    });
};



exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      checkIfPostExists(post);
      //TODO: check if current user is the creator    
      return Post.findById(postId);
    })
    .then(post => {
      return post.remove()
    })
    .then(result => {
      res.status(200).json({
        message: 'Post deleted.',
        post: result
      });
    })
    .catch(err => {
      reachNextError(err, next);
    });
};


