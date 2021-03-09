require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express'),
	router = express.Router();

const Product = require('../../database').Product;
// const checkAuth = require('../../utils/checkAuth');

function customCheckAuth(req, res, next) {
	//get authcookie from request
	const authCookie = req.cookies.authCookie;
	//verify token which is in cookie value
	jwt.verify(authCookie, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
		if (err) {
			// let msg = 'You do not have permission to access this resource.'
			// res.status(403).render('error', {code: 403,codeErr:'Forbidden' ,message: msg});
			res.render('login');
		} else {
			next();
		}
	});
}

router.get('/console', customCheckAuth, (req, res) => {
	jwt.verify(
		req.cookies.authCookie,
		process.env.ACCESS_TOKEN_SECRET,
		function (err, decoded) {
			Product.find({ uid: decoded.uid })
				.then((results) => {
					res.render('console', { results });
				})
				.catch((err) => {
					res.status(404).send(
						`<h1 style='text-align: center'>${err}</h1>`
					);
				});
		}
	);
});

module.exports = router;
