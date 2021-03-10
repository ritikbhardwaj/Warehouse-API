const express = require('express'),
	router = express.Router(),
	jwt = require('jsonwebtoken');

router.get(
	'/auth/login',
	(req, res, next) => {
		const authCookie = req.cookies.authCookie;
		//verify token which is in cookie value
		jwt.verify(authCookie, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
			if (err) {
				next();
			} else {
				res.redirect('/console');
			}
		});
	},
	(req, res) => {
		res.render('login');
	}
);

module.exports = router;
