const express = require('express');
const morgan = require('morgan');
const router = require('./routes/v1');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// 1) GLOBAL MIDDLEWARES
// Serving static files
// app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

router(app);

module.exports = app;
