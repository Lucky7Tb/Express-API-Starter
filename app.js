const express = require('express');
const path = require('path');
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const app = express();

const api = require('./app/routes/api');

app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

module.exports = app;
