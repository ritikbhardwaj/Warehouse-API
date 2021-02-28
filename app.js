const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

const models = require('./database');

//import routes
const productRouter = require('./routes/product');
const homeRouter = require('./routes/home');
const consoleRouter = require('./routes/console');

// express middlewares
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//use routes
app.use('/', productRouter);
app.use('/', homeRouter);
app.use('/', consoleRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


module.exports = app;
