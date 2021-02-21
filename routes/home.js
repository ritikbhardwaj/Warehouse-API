const express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send(`
    <h1 style="text-align: center;margin: 0px; font-size: 70px">Minor Project </h1>
    <h3 style="text-align: center; font-family: Helvetica;margin:0px;font-weight:700">181262 181275</h3>
    <h3 style="text-align: center; font-family: Helvetica;margin:0px;font-weight:200; margin-top: 30px;">
    This is the home page of the warehouse API(Application Programming Interface).<br>Some of the routes are.
    </h3>
    <h3 style="text-align: center; font-family: Helvetica;margin:0px;font-weight:400; margin-top: 20px"><i>
    GET     - minorapi.ddns.net/products/:id<br>
    POST    - minoapi.ddns.net/products<br>
    PUT     - minoapi.ddns.net/products<br>
    DELETE  - minoapi.ddns.net/products
    </i></h3>
    `)
});
   
module.exports = router;