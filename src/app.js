const express = require('express');
const configureApp = require('./config/app.config.js');
const configureRoutes = require('./config/routes.config.js');

module.exports = () => {
  const app = express();
  configureApp(app);
  configureRoutes(app);
  return app;
};
