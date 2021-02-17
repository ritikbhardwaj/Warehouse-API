const express = require('express');
const path = require('path');
const app = express();
// const indexRouter = require('./routes/quiz'),
// 	loginRouter = require('./routes/login'),
// 	resultRouter = require('./routes/result');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

let num = 0;
let html = `
<html>
<title>Minor Project - 181262</title>
<head>
<style>
*{
    padding: 0;
    margin: 0;
}
h1{
    text-align: center;
    color: rgb(19,19,19);
    font-size: 110px;
    padding-bottom: 5px;
    margin-top: 30px;
}
h2{
    text-align: center;
    font-family: "helvetica";
    font-weight: 300;
    font-size: 30px;
    color: rgb(32,32,32);
}
h5{
    text-align: center;
    text-justify: inter-word;
    font-family: "helvetica";
    font-size: 40px;
    font-weight: 300;
    color: rgb(19,19,19);
    margin-top: 50px;

}
</style>
</head>
<body>
<h1>Minor Project</h1>
<h2>Ritik, Nitin, Utkarsh</h2>
<h5>This website has been hosted on a local server on my laptop. Its has been made accessible through the internet using <i>port forwarding</i> on my router</h5>
</body>
</html>

`;
app.get('/', (req, res) => {
	console.log(`${req.method} from ${req.ip.split(':')[3]} ${++num}`);
	res.send(html);
});
//route
//app.use('/', productRouter);
// app.use('/', loginRouter);
// app.use('/', resultRouter);

module.exports = app;
