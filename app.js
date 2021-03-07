const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const models = require('./database');

//import routes

//API
const productRouterApi = require('./routes/API/product');
const loginRouterApi = require('./routes/API/login');
const signupRouterApi = require('./routes/API/signup');


//PAGES
const homeRouter = require('./routes/PAGES/home');
const consoleRouter = require('./routes/PAGES/console');
const loginRouter = require('./routes/PAGES/login');
const registerRouter = require('./routes/PAGES/signup');

// express middlewares
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));

//use routes

//API ROUTES
app.use('/api', productRouterApi);
app.use('/api', loginRouterApi);
app.use('/api', signupRouterApi);


//PAGES ROUTES
app.use('/', homeRouter);
app.use('/', consoleRouter);
app.use('/', loginRouter);
app.use('/', registerRouter);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


module.exports = app;
