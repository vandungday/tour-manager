const express = require('express');
const morgan = require('morgan');
const router = require('./routes/v1');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: true, limit: '10kb' }));

router(app);

module.exports = app;
