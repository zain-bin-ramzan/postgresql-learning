const express = require('express');
const pool = require('../src/config/db.config.js');
const configureServer = require('../src/config/server.config.js');
const configureApp = require('../src/config/app.config.js');
const configureRoutes = require('../src/config/routes.config.js');
const getApp = require('../src/app.js');
/**
 * First tests the database connection before starting the server
 */

pool
  .connect({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'todo_hub',
    password: process.env.DB_PASSWORD || 'test1234',
    port: process.env.DB_PORT || 5432,
  })
  .then(() => {
    console.log('Database connected successfully');
    const app = getApp();
    const server = configureServer(app);
    process.on('SIGINT', () => {
      console.log('Shutting down server gracefully...');
      server.close(() => {
        console.log('Server closed');
        pool.end();
      });
    });
  })
  .catch(err => {
    process.exit(1);
  });
