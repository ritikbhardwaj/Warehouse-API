const express = require('express'),
    router = express.Router();

//import the siteData model
const siteData = require('../database').siteData;


router.get('/', (req, res) => {
    let newData = new siteData({
        ipAddress: req.ip.split(':')[3]
    })
    //save the data to the collection
    newData.save((err, result) => { 
        if (err) { 
            res.status(400).send(err);
        }
    })
    //query to find the no. of documents
    siteData.estimatedDocumentCount((err, count) => { 
        if (err) {
            res.status(400).send(err);
        } else { 
            res.status(200).send(`
    <head>
    <style>
        .center {
            margin: auto;
            width: 300px;
            padding: 10px;
            margin-top: 20px;
        }
        .center p{
            font-family: courier;
            font-size: 20px;
            background-color: white;
            padding: 10px;
        }
        .footer {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-intems: center;
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: black;
            color: white;
            text-align: center;
            font-family: helvetica;
        }
        .footer .views{
            flex-grow: 1;
            font-family: helvetica;
        } 
        .footer .link{
            flex-grow: 20;
        } 
        .footer .ip{
            flex-grow: 1;
        }
    </style>
    </head>
    <body style="background-color: rgb(245,245,245);">
    <h1 style="text-align: center;margin:0px;font-size:70px">Minor Project </h1>
    <hr style="width:30%;text-align:center;">
    <h3 style="text-align: center; font-family: Helvetica;margin:0px;font-weight:700">181262 181275</h3>
    <h3 style="text-align: center; font-family: Courier;margin:0px;font-weight:200; margin-top:30px;">
    This is the home page of the warehouse API(Application Programming Interface).
    </h3>
    
    <div class="center">
    <p>
    GET     - /products/:id<br>
    POST    - /products<br>
    PUT     - /products<br>
    DELETE  - /products
    </p>
    </div>
    <div class="footer">
    <p class="views">VIEWS - <span style="color: yellow">${count}</span></p>
    <p class = "link">check out <a href="https://github.com/ritikbhardwaj/Warehouse-API">Github</a> for the source code</p>
    <p class="ip">Your IP - <span style="color: yellow">${req.ip.split(':')[3]}</span></p>
    </div>
    </body>
    `)
        }
    })
    
});
   
module.exports = router;