const express = require('express');
const morgan = require('morgan');
const router = require('./routes');
const app = express();

app.use(morgan('dev'));

router(app);

module.exports = app;
