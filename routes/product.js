const express = require('express'),
    router = express.Router();


const { Product } = require('../database');
 
//GET all the products
router.get('/products', (req, res) => {
    Product.find({}).then((results) => {
        res.status(200).send(results);
    }).catch((err) => { 
        res.status(404).send(`<h1 style='text-align: center'>${err}</h1>`);
    })
});


//GET a particular product
router.get('/products/:SKU', (req, res) => {
    const { SKU } = req.params;
    Product.find({ SKU }).then((result) => {  
        if (result.length == 0) {
            res.status(500).send(`<h1 style='text-align: center'>Product Not found!</h1>`)
        } else { 
            res.status(200).send(result);   
        }
    }).catch((err) => { 
        res.status(404).send(`<h1 style='text-align: center'>${err}</h1>`)
    })
});

//INSERT a new object (not checking if the product already exists)
router.post('/products', (req, res) => {
    //object is empty
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        res.status(400).send("<h1 style='text-align: center'>Bad request!</h1>");
    } else { 
        let product = {
            SKU: Date.now(),
            title: req.body.title,
            description: req.body.description,
            quantity: req.body.quantity,
            price: req.body.price
        };
        let newProduct = new Product(product);
        newProduct.save((err, result) => {
            if (err) {
                res.status(501).send(`<h1 style='text-align: center'>${err._message}</h1>`);
                console.log(err);
            } else { 
                res.status(200).send(result);
            }
         })
    }
});

//UPDATE a product
router.put('/products', (req, res) => { 
    const { SKU, updateObj } = req.body;
    //make sure the update object is not empty
    let newObj = {};
    Object.keys(updateObj).forEach((key) => {
        if (updateObj[key] != '') { 
            newObj[key] = updateObj[key];
        }
     })
    //if the newObject is empty then no need to do anything, infact it's a bad request!
    if (Object.keys(newObj).length === 0 && newObj.constructor === Object) {
        res.status(400).send("<h1 style='text-align: center'>Bad request!</h1>");
    } else { 
        
        Product.updateOne({ SKU }, updateObj)
            .then((result) => {
                if (!result.nModified) {
                    res.status(501).send("<h1 style='text-align: center'>No Product updated!</h1>");
                } else { 
                    res.status(200).send(result);
                }   
            })
            .catch((err) => { 
                res.send(500).send(err);
            })
    }
});

//DELETE a product
router.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    Product.deleteOne({ SKU: id })
        .then((result) => {
            if (!result.deletedCount) {
                res.status(501).send("<h1 style='text-align: center'>No Product deleted!</h1>");
            } else { 
                res.status(200).send(result);
            }
    }).catch((err) => { 
        res.status(501).send(err);
    })
});
   

module.exports = router;
