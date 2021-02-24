let views = 0;
let ips = [];

const express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
    views++;
    console.log(req.ip);
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
    <p class="views">VIEWS - ${views}</p>
    <p class = "link">check out <a href="https://github.com/ritikbhardwaj/Warehouse-API">Github</a> for the source code</p>
    </div>
    </body>
    `)
});
   
module.exports = router;