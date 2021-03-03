require('dotenv').config();
const mongoose = require("mongoose");
const url = `mongodb+srv://ritik:${process.env.DB_PASSWORD}@cluster0.f3ffx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

//import models
const Product  = require('./models/product');
const siteData = require('./models/siteData');
const userData = require('./models/user');

//connect to the database
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
	.then(() => { 
		console.log('MongoDB Connected!');
	})
	.catch((err) => { 
		throw err;
	})
//export models for use in the routes
module.exports = {
	Product,siteData,userData
};
