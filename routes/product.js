const express = require('express'),
    router = express.Router();

router.get('/products/:id', (req, res) => {
    if (!isNaN(req.params.id)) {
        res.status(200).send(`<h1 style="font-family: Helvetica; text-align: center"}>PRODUCT - ${req.params.id}</h1>`);
    } else { 
        res.status(400).send(`<h1 style="font-family: Helvetica; text-align: center"}>Bad request!</h1>`);
    }
    
});
   
module.exports = router;
