require('dotenv').config()
const config = require('./config/config.json'),
	sql_promise = require('./utils/sql_wrapper');

let configObj = {
	host: config.host,
	user: config.username,
	database: config.database,
	password: process.env.DB_PASSWORD,
};
// create the connection to database
const sql = new sql_promise(configObj);
//Expose the connection
module.exports = sql;
