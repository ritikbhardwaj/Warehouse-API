const express = require('express'),
    router = express.Router();


router.get('/auth/register', (req, res) => {
    res.render('register');
});

module.exports = router;