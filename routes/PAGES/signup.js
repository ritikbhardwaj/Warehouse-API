const express = require('express'),
	router = express.Router();

router.get('/auth/signup', (req, res) => {
	res.render('signup');
});

module.exports = router;
