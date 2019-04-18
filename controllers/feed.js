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
  const title = req.body.title;
  const content = req.body.content;
  // TODO: Create post in db
  res.status(201).json({
    message: 'New post created.',
    post: {
      id: new Date().toISOString(), 
      title,
      content,
      createdAt: new Date().toISOString()}
  });
};