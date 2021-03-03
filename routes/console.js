const express = require('express'),
    router = express.Router();

const Product = require('../database').Product;
const checkAuth = require('../utils/checkAuth');

router.get('/console',checkAuth,(req, res) => {
    Product.find({}).then((results) => {
        res.render('console', { results });
    }).catch((err) => { 
        res.status(404).send(`<h1 style='text-align: center'>${err}</h1>`);
    })
});

module.exports = router;