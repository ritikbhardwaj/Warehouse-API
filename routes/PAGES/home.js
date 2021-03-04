const express = require('express'),
    router = express.Router();

//import the siteData model
const siteData = require('../../database').siteData;


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
            res.render('homepage', {ipAddress:req.ip.split(':')[3],count});
        }
    })
    
});
   
module.exports = router;