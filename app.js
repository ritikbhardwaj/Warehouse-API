const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();

const models = require('./database');

//import routes
const productRouter = require('./routes/product');

//use routes
app.use('/', productRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// express middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
