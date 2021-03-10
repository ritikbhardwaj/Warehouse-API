require('dotenv').config();
const express = require('express'),
	router = express.Router();

let cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//data model
const userData = require('../../database').userData;

router.post('/auth/login', (req, res) => {
	//Authenticate
	userData.findOne({ email: req.body.email }, (err, result) => {
		if (err) {
			res.json({
				error: true,
				message: err,
			});
		} else {
			if (result == null) {
				res.json({
					error: true,
					message: 'Not registered',
				});
			} else {
				bcrypt
					.compare(req.body.password, result.password)
					.then((isAuthenticated) => {
						if (isAuthenticated) {
							//User is authenticated
							const accessToken = jwt.sign(
								{
									uid: result.uid,
									email: result.email,
								},
								process.env.ACCESS_TOKEN_SECRET
							);
							res.cookie('authCookie', accessToken, {
								maxAge: 1 * 60 * 1000, // 1 minute
								httpOnly: true,
							});
							res.json({
								error: false,
								message: 'Authenticated successfully',
							});
						} else {
							res.json({
								error: true,
								message: 'Wrong password',
							});
						}
					});
			}
		}
	});
});

module.exports = router;
