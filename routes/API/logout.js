require('dotenv').config();
const express = require('express'),
	router = express.Router();

// let cookieParser = require('cookie-parser');

router.get('/auth/logout', (req, res) => {
	res.clearCookie('authCookie');
	res.send({
		err: false,
		errCode: 200,
		message: 'Successfully logged out',
	});
});

module.exports = router;
