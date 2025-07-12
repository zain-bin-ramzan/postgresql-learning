const path = require('path');
const userRoutes = require('../routes/user.routes');
const postRoutes = require('../routes/post.routes');

const configureRoutes = app => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

  app.use('/users', userRoutes);
  app.use('/posts', postRoutes);
};

module.exports = configureRoutes;
