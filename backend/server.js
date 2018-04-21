
const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
const path = require('path');
const config = require('../config');

const app = express();

mongoose.connect(config.db);

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

if(config.buildMode === 'production') {
  app.use('/', express.static(path.join(__dirname, '/../frontend/dist')));
} else if(config.buildMode === 'development') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig)));
}

module.exports = app;