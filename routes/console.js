const express = require('express'),
    router = express.Router();

const Product = require('../database').Product;

router.get('/console', (req, res) => {
    Product.find({}).then((results) => {
        res.render('console', { results });
    }).catch((err) => { 
        res.status(404).send(`<h1 style='text-align: center'>${err}</h1>`);
    })
});

module.exports = router;