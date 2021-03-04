const express = require('express'),
    router = express.Router();


router.get('/auth/login', (req, res) => {
    res.render('login');
});

module.exports = router;