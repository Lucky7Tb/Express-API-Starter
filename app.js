const express = require('express');
const path = require('path');
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const app = express();

const middlewares = require('./app/middlewares');

const api = require('./app/routes/api');

app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
