require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb+srv://ritik:${process.env.DB_PASSWORD}@cluster0.f3ffx.mongodb.net/${process.env.minorapi}?retryWrites=true&w=majority`;

MongoClient.connect(url).then((err, db) => { 
	if (err) {
		console.log(err);
	}
	console.log('connected');
}); 
