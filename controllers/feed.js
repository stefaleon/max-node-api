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

