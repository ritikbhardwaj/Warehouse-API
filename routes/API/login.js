require('dotenv').config();
const express = require('express'),
    router = express.Router();

let cookieParser = require('cookie-parser')    
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//data model
const userData = require('../../database').userData;

router.post('/auth/login',(req, res) => {
    //Authenticate
    userData.findOne({ email: req.body.email }, (err, result) => {
        if (err) {
            res.send(err);
        } else { 
            if (result == null) {
                res.json({
                    authenticated: false,
                });
            } else { 
                bcrypt.compare(req.body.password, result.password)
                .then((isAuthenticated) => {
                    if (isAuthenticated) {
                        //User is authenticated
                        const accessToken = jwt.sign(result.email, process.env.ACCESS_TOKEN_SECRET);
                        res.cookie('authCookie', accessToken, { maxAge: 30 * 1000, httpOnly: true });
                        res.json({
                            authenticated: true
                        })
                    } else { 
                        res.json({
                            authenticated: false,
                        });
                    }
                });
            }
        }
        
    });
    
});

module.exports = router;